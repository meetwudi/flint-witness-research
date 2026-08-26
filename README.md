# Flint Witness Research

## Analytics

The site uses Google Analytics 4 through Next.js's Google Analytics component
in `app/layout.tsx`.

- Property: `Flint Witness Research`
- Analytics account ID: `209047395`
- Property ID: `551666709`
- Web stream: `Flint Witness Research`
- Website: `https://flint-witness-research.vercel.app`
- Measurement ID: `G-N01KGDT1FY`
- Stream ID: `15501779451`

Vercel Analytics is not loaded by the site.

## Packet lead capture

Every matter packet renders a mobile-friendly sticky call-to-action with two
paths: open the native request form or book a 15-minute conversation. Successful
form submissions call `POST /api/interest`, which sends the lead to
`flint@flintnotes.ai` through Resend. The root page remains blank.

Production configuration:

- `RESEND_API_KEY`: Vercel secret; Resend sending-only key restricted to the
  verified `meetwudi.com` domain
- Default sender: `Flint Witness Research <research@meetwudi.com>`
- Default recipient: `flint@flintnotes.ai`

The CTA records `lead_form_open`, `lead_submit`, and `schedule_click` events in
Google Analytics with the packet slug and `sticky_packet_cta` placement. The
form includes explicit email consent, an origin check, server-side validation,
and a honeypot field. Do not commit the Resend credential.

Public, matter-specific expert research for technically complex litigation.

This repository contains the client-facing research packet for:

- **Matter:** *Incuvate, LLC v. Penumbra, Inc.*
- **Docket:** No. 4:26-cv-08658 (N.D. Cal.)
- **Personalized page:** `https://flint-witness-research.vercel.app/incuvate-v-penumbra`
- **Positioning:** post-filing research, before counsel completes formal expert identification and retention
- **Service conversation:** `https://tidycal.com/meetwudi/15-minute-meeting`

The page includes a verified matter summary, linked asserted patents, a technical
issue map, ten ranked potential experts, source evidence, limitations, and editable
email drafts. No expert was contacted, and no availability or conflict determination
is represented.

> Independent preliminary research based on public information.

## Local development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
```

The application is a statically rendered Next.js site deployed through Vercel from
the `main` branch of this repository.
