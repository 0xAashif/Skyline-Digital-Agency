# SkyLine Digital Agency — UI Restoration & Visual Upgrade Plan

## 1. Visual & Functional Scope
We will restore the complete **11-Upgrade "Dark Platinum & Brushed Silver" UI** while integrating your exact design decisions and full-stack capabilities:

- **Minimalist Geometric Wireframe Prism & Circuit Logo (`<SkyLineLogo />`)**:
  - Replace the current `<SkyLineLogo />` in `src/components/BrandIcons.tsx` with a custom, razor-sharp vector SVG featuring an isometric geometric wireframe prism interconnected with precision circuit nodes and clean architectural `SKYLINE` typography that adapts seamlessly between Light Mode (`#F4F4F6` / `#18181B`) and Dark Mode (`#09090B` / `#E4E4E7`).
- **Full-Bleed Edge-to-Edge Split Hero Section (Zero Left/Right Margin)**:
  - Update `src/components/HeroSection.tsx` so the Hero container spans `100vw` edge-to-edge with zero left/right outer margin (`w-full px-4 sm:px-8 lg:px-12`).
  - Left column: High-impact engineering headline, 2-line punchy subheadline, floating interactive orb cluster (`AI`, `ADS`, `SAAS`, `WEB`, `SEO`, `CRM`, `LOCAL`), and primary CTAs.
  - Right column: Full-height interactive 6-slide visual pitch-deck carousel with auto-play, slide progress indicators, live telemetry metrics, and instant slide switching.
- **Strictly Icon-Only Instagram Integration**:
  - Remove all visible `@sky_line_digital` and `Instagram` text labels across the Hero top bar, Floating Pill Navbar, Curtain Menu, Hero bottom metadata bar, Floating Social Button, Contact section, and Footer.
  - Render only the authentic Instagram vector SVG icon linking to `https://www.instagram.com/sky_line_digital`.
- **Top Navbar Admin CRM Access**:
  - Keep the **Admin CRM** button cleanly accessible in the top navbar (`HeroSection.tsx` top bar and `Navbar.tsx` floating pill dock) alongside the Light/Dark theme toggle, icon-only Instagram button, and WhatsApp Green (`#25D366`) CTA.
- **BroCode Tech Multi-Color Semantic Accents on Dark Platinum & Brushed Silver**:
  - Maintain the signature Dark Platinum & Brushed Silver foundation (`#F4F4F6` / `#FFFFFF` / `#D4D4D8` in Light Mode; `#09090B` / `#141417` / `#27272A` in Dark Mode) while infusing 4+ high-contrast semantic accent colors (`#6366F1` Electric Indigo, `#10B981` Emerald Green, `#F59E0B` Amber Gold, `#F43F5E` Rose Coral, and `#0EA5E9` Sky Cyan) across minor UI elements: category pills, live status dots, metric badges, micro-borders, and icon containers.
- **Hyperrealistic Indian Context Imagery**:
  - Curate high-resolution, hyperrealistic Indian business, founder, clinic/hospitality, retail showroom, real estate, and SaaS engineering imagery across all 6 Hero pitch-deck slides, 6 Bento service cards, and 4 Case Study project showcases in `src/data/agencyData.ts`.
- **Continuous 360° Interactive 3D Geodesic Sphere & Local Businesses Vertical**:
  - Ensure the "Our Core Expertise" 3D wireframe sphere rotates continuously 360° with interactive cursor tilt and semantic node highlights, and keep **Local Businesses** integrated across all sections (Hero orb, Bento card, Core Expertise tab, 60s Simulator, Work showcase, and Contact form).
- **Footer Paper-Plane / Rocket Infinity (`♾️`) Trajectory Trail**:
  - Enhance the SVG trajectory animation in `src/components/ContactDispatchFooter.tsx` so the glowing paper-plane/rocket flies smoothly along a continuous figure-8 infinity loop (`♾️`) and multi-curve path while progressively drawing its glowing dotted trail behind its tail.

## 2. Files to Modify
1. `src/components/BrandIcons.tsx` — New minimalist geometric wireframe prism & circuit vector logo (`<SkyLineLogo />`).
2. `src/data/agencyData.ts` — Hyperrealistic Indian business/tech imagery and semantic multi-color accent metadata across all Hero slides, Bento cards, and Case Studies.
3. `src/components/HeroSection.tsx` — Edge-to-edge full-bleed split grid (`w-full`, zero horizontal margin), left typography + 7-orb cluster, right 6-slide visual pitch-deck carousel, top bar with Admin CRM button and strictly icon-only Instagram link.
4. `src/components/Navbar.tsx` — Floating pill dock and full-screen curtain menu with the new wireframe prism logo, Admin CRM button, and strictly icon-only Instagram link.
5. `src/components/CapabilitiesMatrix.tsx` — Multi-color semantic badges/borders on Bento cards and continuous 360° rotating 3D geodesic wireframe mesh with cursor tilt.
6. `src/components/SystemArchitectSimulator.tsx` & `src/components/ClientProofAndReferral.tsx` — Multi-color semantic telemetry accents, zero numbering, and official WhatsApp Green (`#25D366`) vector CTAs.
7. `src/components/ContactDispatchFooter.tsx` — True figure-8 infinity (`♾️`) glowing dotted flight trajectory with animated plane tangent rotation, strictly icon-only Instagram links, and official metadata (`Madhya Pradesh, India`, `skylinedigital@gmail.com`).

## 3. Verification Plan
- Run unit and full-stack API tests (`node --import tsx --test`).
- Run TypeScript & ESLint verification (`lint_applet`) and production bundle build (`compile_applet`).
- Verify the rendered UI in a real headless browser across both Light Mode and Dark Mode to confirm all visual requirements.
