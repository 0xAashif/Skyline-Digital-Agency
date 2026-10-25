# SkyLine Digital Agency — Full-Stack 3D Architecture, AI & Growth Platform

Official web platform and full-stack CRM for **SkyLine Digital Agency** (`Indore, Bhopal, Madhya Pradesh, India` • Serving Globally).

---

## Key Architectural Features

1. **Interactive 360° 3D Geodesic Architecture Core (`Three.js` + WebGL)**
   - Real-time 3D Icosahedron geodesic lattice, brushed titanium core sphere, 3 inclined gyroscopic orbital rings, and 360-degree spherical vertex nodes.
   - 7 interactive 3D-projected capability satellites (`AI`, `ADS`, `SAAS`, `WEB`, `SEO`, `CRM`, `LOCAL`) with pointer drag/hover rotation and hardware/software WebGL frame-pacing.

2. **Multi-Page SPA Tab Architecture**
   - **`Home`**: 3D Geodesic Orbital Hero, 16-Brand Dual-Direction Tech Marquee, 6 Core Services Bento Summary, and Featured Case Studies Preview.
   - **`Services`**: 7-Track Service Architecture Matrix, 3-Tier Isometric System Pulse, Specialized Local Business Package, and Interactive 60-Second Project & Timeline Estimator.
   - **`Our Work`**: Verified Case Studies Showcase (`FinVantage`, `AuraCare`, `Velora`, `NexaProp`), Client Impact Metrics, and Verified Reviews.
   - **`Who We Are`**: The SkyLine Doctrine, Founding Architects Profiles (**Aashif Khan** & **Sachin Sahu**), and 3-Phase Execution Roadmap.
   - **`Offer & Referral`**: Interactive 15% Partner Commission Calculator, CRM Referral Registration, and Common Questions FAQ.
   - **`Contact`**: Direct Proposal & Strategy Meeting Dispatch Desk + CRM Persistence.

3. **SkyLine AI Assistant (`@google/genai`)**
   - Custom `<SkyLineAiChatIcon />` vector emblem matching SkyLine's interlocking **`S` & `A`** monogram geometry.
   - Multi-turn conversational AI (`POST /api/ai/chat`) with **Pro (`gemini-3.8-flash`)** and **Fast (`gemini-3.1-flash-lite`)** modes.
   - Microphone voice input transcription (`POST /api/ai/transcribe` via `gemini-3.5-transcribe`).
   - Real-time **Gemini 3.8 Live Voice** WebSocket session (`/ws/ai-live` via `gemini-3.8-live`) with instant WhatsApp & Direct Call human fallback actions.

4. **Official Contact & Smart Routing**
   - **Official Email**: `skylinedigital@gmail.com`
   - **Primary WhatsApp Desk (Sachin Sahu — Co-Founder & Lead Architect)**: `+91 89591 44686` (`https://wa.me/918959144686`)
   - **Direct Voice Call & Co-Founder WhatsApp (Aashif Khan — Co-Founder & Lead Architect)**: `+91 86430 02478` (`tel:+918643002478` & `https://wa.me/918643002478`)
   - **Location**: `Indore, Bhopal, Madhya Pradesh, India`

---

## Development & Verification

```bash
# Start full-stack Express + Vite + WebSocket server on port 3000
npm run dev

# Run unit & full-stack integration test suites
npx tsx --test src/utils/*.test.ts server/fullstack.test.ts

# Production build
npm run build
```
