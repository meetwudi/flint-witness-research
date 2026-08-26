import { NextResponse } from "next/server";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clean(value: unknown, limit: number) {
  return typeof value === "string" ? value.trim().slice(0, limit) : "";
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  })[character] ?? character);
}

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin) {
    const hostname = new URL(origin).hostname;
    if (hostname !== "flint-witness-research.vercel.app" && hostname !== "localhost") {
      return NextResponse.json({ ok: false }, { status: 403 });
    }
  }

  const data = await request.json().catch(() => null) as Record<string, unknown> | null;
  if (!data) return NextResponse.json({ ok: false }, { status: 400 });

  // Quietly accept bot submissions so the honeypot does not reveal itself.
  if (clean(data.website, 100)) return NextResponse.json({ ok: true });

  const email = clean(data.email, 254);
  const name = clean(data.name, 120);
  const firm = clean(data.firm, 160);
  const matterInterest = clean(data.matterInterest, 1200);
  const packetTitle = clean(data.packetTitle, 240);
  const packetPath = clean(data.packetPath, 300);
  const consent = data.consent === true;

  if (!EMAIL_PATTERN.test(email) || !consent || !packetTitle || !packetPath) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return NextResponse.json({ ok: false }, { status: 503 });

  const fields = [
    ["Work email", email],
    ["Name", name || "Not provided"],
    ["Firm", firm || "Not provided"],
    ["Matter interest", matterInterest || "Not provided"],
    ["Packet", packetTitle],
    ["Packet path", packetPath],
  ];

  const resend = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.RESEND_FROM_EMAIL || "Flint Witness Research <research@meetwudi.com>",
      to: [process.env.LEAD_NOTIFICATION_EMAIL || "flint@flintnotes.ai"],
      reply_to: email,
      subject: `New packet request — ${packetTitle}`,
      text: fields.map(([label, value]) => `${label}: ${value}`).join("\n"),
      html: `<h2>New Flint Witness Research packet request</h2><table>${fields.map(([label, value]) => `<tr><td style="padding:6px 18px 6px 0;font-weight:700;vertical-align:top">${escapeHtml(label)}</td><td style="padding:6px 0">${escapeHtml(value)}</td></tr>`).join("")}</table>`,
    }),
  });

  if (!resend.ok) return NextResponse.json({ ok: false }, { status: 502 });
  return NextResponse.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });
}
