# Morphogenetic UI · Bio System Console

A responsive bio-inspired React dashboard with **five working sections**, local interactive demo data, and Cloudflare-native hosting. This is a visual operations **demo**, not a medical device or a source of live biological measurements.

## Features

- **Morphology:** overview, visualized energy cycles, status indicators, and environmental zones.
- **Sequencer:** search, integrity filtering, select sequence to inspect, and working resequence control.
- **Mycelium:** animated, illustrative process-flow visualization.
- **Synapses:** dashboard analytics with charts (sample values).
- **Homeostasis:** motion and interface preferences saved locally in your browser; export and reset.
- Responsive navigation and keyboard focus, reduced-motion support, no mandatory paid services.

> All displayed biological data is **sample/simulated data**. No API is contacted or data uploaded. This repo deliberately has no API key or secrets in the frontend bundle.

## Run locally

Prerequisite: Node.js 22 or newer.

```bash
npm install
npm run dev
```

Open http://localhost:3000. For production verification:

```bash
npm run check
npm run preview
```

## Architecture

| Layer | Technology |
| --- | --- |
| UI | React 19, TypeScript, Tailwind CSS 3, Lucide, Framer Motion, Recharts |
| Build | Vite |
| Hosting | Cloudflare Workers **Static Assets** (no runtime Worker or paid services) |
| CI/CD | GitHub Actions on PR, production deploy on push to `main` |
| State | In-memory demo data and browser localStorage preferences |

Static assets are served from `dist/`. There is no Workers runtime invocation and no requirement for D1, KV, R2, Workers AI, or external APIs. Deployment can run on Cloudflare's Free plan under its prevailing terms.

## One-time Cloudflare setup

1. Create/use a **free** Cloudflare account and find its account ID.
2. Create a scoped Cloudflare API token with **Edit Cloudflare Workers** permissions for your account.
3. In GitHub repo **Settings → Secrets and variables → Actions**, add `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` as **repository secrets**. Never commit token values.
4. Push to `main` (or manually run the workflow under **Actions → Verify and deploy to Cloudflare**).

The workflow builds, verifies, and deploys `wrangler.jsonc` to the Worker named `ui-template-3`. The default URL is `https://ui-template-3.<your-account-subdomain>.workers.dev` after Cloudflare provisions it. You may need to enable your free `workers.dev` subdomain in the Cloudflare dashboard.

For manual deploy after authenticating with `npx wrangler login`: `npm run deploy`.

## Safety, cost, and limitations

- **No paid dependencies:** public GitHub Actions minutes and Cloudflare static asset hosting are free within applicable platform policies. A custom domain is optional, not required.
- **No actual biosensors:** the charts and measurements are illustrative. Demo data is not live.
- **Privacy:** the application does not send user input to a server; browser preferences remain in localStorage.
- **No production secrets** are bundled in the frontend. The prior unused Gemini build-time injection and external import maps were removed.
- Production deployment requires Cloudflare account credentials stored as GitHub Actions secrets; an app cannot autonomously provision your Cloudflare account from the repo alone.
