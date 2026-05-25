# DigiCraft Studio — Worklog

## 2025-05-25 — Complete Redesign v2.0

### Summary
Complete redesign of the DigiCraft Studio website, reducing the page.tsx from ~1768 lines to ~580 lines while adding more portfolio items and a completely new visual design.

### What was REMOVED
- **Noise texture SVG overlay** (~20 lines of JSX + ~15 lines of CSS)
- **Massive ERP demo section** (~500 lines) — the entire Centro Logístico Frimaral V2 inline dashboard with:
  - Demo sidebar with tabs (dashboard, inventory, orders, temperature, activity)
  - KPI cards with live container/order/temperature data
  - Full inventory table with 8 containers
  - Orders table with filter pills
  - Temperature monitoring with sensor cards
  - Activity feed with timeline items
  - Demo browser topbar (dots + URL bar)
- **Video Demo subsection** that was separate from the portfolio grid
- **All demo-related state**: `demoTab`, `orderFilter` state variables
- **All demo data arrays**: `demoContainers`, `demoOrders`, `demoTemperatures`, `demoActivities`
- **Demo-related CSS classes**: `.erp-card`, `.demo-topbar`, `.demo-dot`, `.demo-url`
- Dark-first theme (now light-first)

### What was ADDED
- **Light-first design system** — Clean white/cream backgrounds as default
- **Dark mode** — Deep navy/charcoal (NOT pure black)
- **Cuidar Contigo** portfolio card with local screenshot and "Ver App" button
- **Centro Logístico Frimaral V2** portfolio card with "Ver Repo" GitHub link
- **TikTok Invitación Virtual** — Embedded directly in the portfolio grid as a card
- **TikTok embed script** (`https://www.tiktok.com/embed.js`) loaded in the portfolio section
- **10 portfolio items** total (up from 8), properly organized
- **Portfolio card component** with image, overlay on hover, body with category/title, and action buttons
- **4-step process** (up from 3): Descubrimos → Diseñamos → Desarrollamos → Lanzamos
- **Pricing updates**: Starter $49, Pro $99, Premium $199 (matching user spec)
- **New CSS classes**: `.portfolio-card`, `.portfolio-card-img`, `.portfolio-card-overlay`, `.portfolio-card-body`, `.portfolio-card-actions`, `.dc-input`, `.btn-sm`, responsive grid classes
- **2 new slugs** in `generateStaticParams`: `frimaral-logistica`, `invitacion-virtual`
- **2 new project entries** in `PortfolioClient.tsx` for the new slugs
- **Contact form phone field** removed (simplified), service select kept
- **CSS custom properties** reorganized with `--bg-cream`, `--transition-fast`, `--transition-slow`, `--radius-pill`

### How the Portfolio Section Works
- **3-column grid** on desktop (≤1280px), **2-column** on tablet, **1-column** on mobile
- Each card has: image area with hover overlay (category + title), body section with category label, title, and action buttons
- Cards with `liveUrl` get a "Ver App" / "Ver Repo" / "Ver en Vivo" button
- TikTok embed is a special card type that renders the TikTok `<blockquote>` inline in the grid
- All cards link to `/digicraft/portfolio/{slug}` for the detail page

### How Apps are Showcased
- **Cuidar Contigo**: Uses the local `/digicraft/cuidar-contigo-preview.png` screenshot. Has a "Ver App" button that opens the live Vercel app.
- **Frimaral Logistics**: Uses a picsum placeholder image with a "Ver Repo" button linking to the GitHub repository.
- **TikTok Invitación**: Renders the TikTok embed directly inside a portfolio grid card with the TikTok icon header.

### Mobile Behavior
- Portfolio grid collapses to single column
- All sections stack vertically
- Visit counter hides labels, shows icons + numbers only
- Mobile hamburger menu with full-screen overlay
- Services, pricing, testimonials, contact form all go single column
- Footer goes single column

### File Changes
| File | Lines Before | Lines After | Change |
|------|-------------|-------------|--------|
| `src/app/page.tsx` | ~1768 | ~580 | -67% |
| `src/app/globals.css` | ~885 | ~530 | -40% |
| `src/app/portfolio/[slug]/page.tsx` | 21 | 29 | +8 |
| `src/app/portfolio/[slug]/PortfolioClient.tsx` | 229 | 188 | -18% |
| `src/app/layout.tsx` | 71 | 71 | unchanged |

### Preserved Functionality
- localStorage visit counter
- Theme toggle with localStorage persistence
- Search overlay (Ctrl+K) with keyboard navigation
- Scroll reveal with IntersectionObserver
- Stats count-up animation
- Form submission toast
- Navbar scroll effect (glassmorphism)
- Mobile menu overlay
- WhatsApp floating button
- Smooth scrolling for anchor links
