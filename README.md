# Flint Witness Research

## Analytics

The site uses Google Analytics 4 through Next.js's Google Analytics component
in `app/layout.tsx`.

- Property: `Flint Witness Research`
- Web stream: `Flint Witness Research`
- Website: `https://flint-witness-research.vercel.app`
- Measurement ID: `G-N01KGDT1FY`
- Stream ID: `15501779451`

Vercel Analytics is not loaded by the site.

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
