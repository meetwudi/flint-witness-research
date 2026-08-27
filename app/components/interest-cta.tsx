"use client";

import { FormEvent, useEffect, useState } from "react";
import { usePathname } from "next/navigation";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

const MEETING_URL = "https://tidycal.com/meetwudi/15-minute-meeting";
const ATTRIBUTION_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;

type Attribution = Record<(typeof ATTRIBUTION_KEYS)[number], string>;

function attributionFromLocation(): Attribution {
  if (typeof window === "undefined") {
    return Object.fromEntries(ATTRIBUTION_KEYS.map((key) => [key, ""])) as Attribution;
  }
  const query = new URLSearchParams(window.location.search);
  return Object.fromEntries(ATTRIBUTION_KEYS.map((key) => [key, (query.get(key) || "").slice(0, 160)])) as Attribution;
}

function meetingUrlWithAttribution(): string {
  const url = new URL(MEETING_URL);
  for (const [key, value] of Object.entries(attributionFromLocation())) {
    if (value) url.searchParams.set(key, value);
  }
  return url.toString();
}

function track(name: string, parameters: Record<string, string>) {
  window.gtag?.("event", name, parameters);
}

export function InterestCta({ packetTitle }: { packetTitle: string }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [open]);

  function openForm() {
    setOpen(true);
    setStatus("idle");
    track("lead_form_open", { packet_slug: pathname, placement: "sticky_packet_cta", ...attributionFromLocation() });
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    const form = new FormData(event.currentTarget);
    const attribution = attributionFromLocation();
    const response = await fetch("/api/interest", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.get("name"),
        email: form.get("email"),
        firm: form.get("firm"),
        matterInterest: form.get("matterInterest"),
        website: form.get("website"),
        consent: form.get("consent") === "on",
        packetTitle,
        packetPath: pathname,
        attribution,
      }),
    });

    if (!response.ok) {
      setStatus("error");
      return;
    }

    setStatus("success");
    track("lead_submit", { packet_slug: pathname, placement: "sticky_packet_cta", ...attribution });
  }

  return <>
    <aside className="sticky-interest" aria-label="Receive future expert-research packets">
      <div className="sticky-interest__inner">
        <p><b>Want research like this as new matters develop?</b><span>Receive matter-specific expert-research packets during the pilot.</span></p>
        <div className="sticky-interest__actions">
          <button type="button" onClick={openForm}>Send me future packets</button>
          <a href={meetingUrlWithAttribution()} target="_blank" rel="noreferrer" onClick={() => track("schedule_click", { packet_slug: pathname, placement: "sticky_packet_cta", ...attributionFromLocation() })}>Book 15 minutes ↗</a>
        </div>
      </div>
    </aside>

    {open && <div className="interest-modal" role="presentation" onMouseDown={(event) => {
      if (event.target === event.currentTarget) setOpen(false);
    }}>
      <section className="interest-dialog" role="dialog" aria-modal="true" aria-labelledby="interest-title">
        <button className="interest-dialog__close" type="button" aria-label="Close" onClick={() => setOpen(false)}>×</button>
        {status === "success" ? <div className="interest-success">
          <p className="kicker">Request received</p>
          <h2 id="interest-title">Thanks—we will follow up personally.</h2>
          <p>We’ll use your information only to follow up about Flint Witness Research.</p>
          <button type="button" onClick={() => setOpen(false)}>Return to the packet</button>
        </div> : <>
          <p className="kicker">Flint Witness Research</p>
          <h2 id="interest-title">Receive matter-specific expert research as new cases develop.</h2>
          <p className="interest-dialog__intro">Tell us where to send future packets. You can also name a technical area or matter you would like us to watch.</p>
          <form onSubmit={submit}>
            <div className="interest-fields">
              <label><span>Work email <b>Required</b></span><input name="email" type="email" autoComplete="email" required /></label>
              <label><span>Name</span><input name="name" type="text" autoComplete="name" /></label>
              <label><span>Firm</span><input name="firm" type="text" autoComplete="organization" /></label>
              <label className="interest-fields__wide"><span>What matters should we watch?</span><textarea name="matterInterest" rows={3} placeholder="Technical area, company, docket, patent, or case type" /></label>
              <label className="interest-honeypot" aria-hidden="true"><span>Website</span><input name="website" type="text" tabIndex={-1} autoComplete="off" /></label>
            </div>
            <label className="interest-consent"><input name="consent" type="checkbox" required /><span>I’d like Flint to email me matter-specific expert-research packets and related service updates.</span></label>
            {status === "error" && <p className="interest-error" role="alert">We couldn’t send your request. Please try again or email <a href="mailto:flint@flintknows.ai">flint@flintknows.ai</a>.</p>}
            <button className="interest-submit" type="submit" disabled={status === "submitting"}>{status === "submitting" ? "Sending…" : "Send me future packets"}</button>
          </form>
        </>}
      </section>
    </div>}
  </>;
}
