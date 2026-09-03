# AGENTS.md — HM Hydraulics Website

## Project Overview
B2B corporate website for HM Hydraulics (Qingdao Hydraulic Machinery Co., Ltd.), a technical sourcing partner for hydraulic rotary actuators and core hydraulic components.

## Tech Stack
- **Framework**: Next.js 16 (App Router)
- **Core**: React 19
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **UI Components**: shadcn/ui (pre-installed in `src/components/ui/`)

## Directory Structure
```
src/
├── app/
│   ├── layout.tsx              # Root layout with metadata, Header, Footer
│   ├── page.tsx                # Home page
│   ├── globals.css             # Design tokens, fonts, global styles
│   ├── products/
│   │   ├── page.tsx            # Products overview
│   │   ├── tilt-actuators/     # DTA/DTD cross-reference tables
│   │   ├── rotary-actuators/   # 9 series, 72 specs
│   │   └── slew-drives/        # Coming soon placeholder
│   ├── quality/page.tsx        # Quality & Validation (fatigue test, certifications)
│   ├── support/page.tsx        # After-sales support, service kits
│   ├── about/page.tsx          # Company story, capabilities
│   └── contact/page.tsx        # Inquiry form + contact info
├── components/
│   ├── layout/
│   │   ├── header.tsx          # Sticky header with nav + mobile menu
│   │   └── footer.tsx          # Footer with links + brand
│   └── ui/                     # shadcn/ui components
└── lib/
    └── utils.ts                # cn() utility
```

## Design System
- **Primary**: #2C4A73 (navy blue)
- **Background**: #FAFAF7 (warm white)
- **Text**: #1B1E20 / #4A4E54 / #62666C
- **Fonts**: Space Grotesk (headings), Inter (body), IBM Plex Mono (labels)
- **Style**: Clean, minimal, industrial B2B — substance over style

## Key Conventions
- Use `font-heading`, `font-body`, `font-label` CSS classes for typography
- Use `eyebrow` class for mono uppercase labels
- Use `section-container` for max-width content containers
- Use `border-subtle` for low-opacity navy borders
- All pages follow consistent section structure with border separators
- Responsive: mobile-first with md: breakpoints

## Commands
- `pnpm dev` — Start dev server
- `pnpm build` — Production build
- `pnpm ts-check` — TypeScript check
- `pnpm lint` — ESLint check
