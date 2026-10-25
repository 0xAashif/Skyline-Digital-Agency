# Skyline Digital Agency

SkyLine Digital Agency is a high-conversion marketing and consulting landing experience for a performance-focused digital agency. Built as a modern React + TypeScript app, it presents service capabilities, execution roadmaps, proofs, FAQs, and a system architect simulator designed to help prospective clients scope work quickly.

## Overview

This project brings together:

- A polished single-page marketing site
- Agency capability positioning
- Interactive blueprint / system architecture simulation
- Conversion-focused contact flow
- Responsive, modern UI with React and Vite

The site is designed around the idea that agency value comes from engineering quality and clear distribution, with a strong emphasis on measurable outcomes and operational clarity.

## Tech stack

- React 19
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- Lucide React
- Express (for server-side support)
- Google GenAI SDK

## Project structure

```text
.
├── index.html
├── metadata.json
├── package.json
├── render.yaml
├── tsconfig.json
├── vercel.json
├── vite.config.ts
├── public/
├── src/
│   ├── App.tsx
│   ├── main.tsx
│   ├── components/
│   ├── data/
│   ├── hooks/
│   ├── utils/
│   └── index.css
└── .npmrc
```

## Features

- Light/dark theme toggle
- Agency capability showcase
- Strategy and execution roadmap sections
- Client proof / referral section
- FAQ and conversion-focused CTA blocks
- Interactive system architect simulator
- Pre-filled client proposal scope via blueprint mapping

## Getting started

### Prerequisites

- Node.js 18+
- npm

### Install dependencies

```bash
npm install
```

### Run locally

```bash
npm run dev
```

This starts the app on port 3000.

### Production build

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

## Available scripts

```bash
npm run dev      # development server
npm run build    # production build
npm run preview  # local preview of built app
npm run lint     # TypeScript type check
npm run clean    # remove dist and server.js
```

## Deployment

This repository includes deployment configuration for platforms such as Render and Vercel:

- `render.yaml`
- `vercel.json`

## Notes

This project is structured as a branded front-end experience for a digital agency offering systems architecture, conversion strategy, and implementation services. It combines marketing flow with an interactive consultancy-oriented simulation to help qualify deal fit and communicate value clearly.

## License

This project does not currently include a license file. If you plan to share or distribute it publicly, consider adding one.
