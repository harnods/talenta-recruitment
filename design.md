# Design Reference — Talenta Recruitment

> Figma source: [Recruitment — Patterns, node 259:3555](https://www.figma.com/design/T9ViWwKVmPJqPMPT66ay06/Recruitment----Patterns?node-id=259-3555)
> Token mode: **Pixel 3 Design Token 2.1**
> Plugin: `PixelPlugin` from `@mekari/pixel3` — registers Pixel directives and globally registers `Mp*` components in `plugins/pixel3.ts`
> CSS entry: `assets/css/pixel3.css` with `@layer pixel_reset … pixel_utilities` — processed by `@mekari/pixel3-postcss` (Panda CSS). Generates the 1041 DT2.1 CSS variables.
> Styling approach: the `css()` function from `@mekari/pixel3` (per the [CSS Function](https://docs.mekari.design/docs/guides/css-function.html), [CSS Props](https://docs.mekari.design/docs/guides/css-props.html), and [Dynamic Styles](https://docs.mekari.design/docs/guides/dynamic-styles.html) guides) applied via `:class`, with design-token dot-path values (`'white'`, `'blue.400'`). No scoped `<style>` blocks, no raw `var(--mp-*)` in `.vue` files. See `tokens.md` for the full approach.
> Last updated: 2026-05-27

---

## Layout Structure

```
AppShell (100vh)
├── AppHeader            height: 56px  | sticky, z-index: 2
└── Body                 height: calc(100vh - 56px)
    ├── AppSidebar       width: 216px  | full height, no scroll on desktop
    └── MainContent      flex: 1
        ├── PageTitle    height: 72px  | flexShrink: 0
        └── Stage        flex: 1       | bg: surface, border top-left, overflow: auto
```

---

## AppHeader

**Node:** `I259:3556` — Header Bar

| Zone | Contents | Pixel component |
|------|----------|-----------------|
| Left | Logo (130×34) + 1px divider + module switcher button | `LogoTalenta`, `Pixel.div`, `MpButton` |
| Right | Notification bell + badge, shortcuts button, user snapshot | `MpButton`, `MpIcon`, `MpAvatar`, `MpText` |

### Dimensions
- Height: `56px` → CSS prop `height="14"` (14 × 4px)
- Horizontal padding: `24px` → `paddingX="6"`
- Gap (left group): `24px` → `gap="6"`
- Gap (right group): `8px` → `gap="2"`
- Border: 1px solid `border.default` (bottom only)

### Notification badge
- Positioned absolutely: `top: 4px, left: 18px` over the bell button container
- Background: `feedback.danger.default` (#EF4444)
- Border: 2px solid `background.surface` (white outline)
- Border-radius: `full` (999px)
- Padding: `paddingX="1" paddingY="0.5"` (4px / 2px)
- Text: `overline`, `semiBold`, `text.inverse`

### Module switcher
- Variant: `ghost`, size: `sm`
- Padding: `16px 12px` (`paddingLeft="4" paddingRight="3"`)
- Text color: `text.secondary`
- Icon: `caret-down` (trailing)

### User snapshot
- Avatar: `MpAvatar size="sm"` (36px)
- Name: `label`, `semiBold`, `text.primary`
- Company: `label-small`, `regular`, `text.secondary`
- Hidden below `md` breakpoint (only avatar shows on mobile)

---

## AppSidebar

**Node:** `I259:3558` — Recruitment (expand state)

| Property | Value | Token |
|----------|-------|-------|
| Width | 216px | CSS prop `width="54"` |
| Background | #F1F5F9 | `background.neutral` |
| Horizontal padding (wrapper) | 8px | `paddingX="2"` |

### Nav item anatomy
```
<Pixel.button>            ← full-width, 200px effective, borderRadius="md"
  <MpIcon />              ← 24×24px, color changes on active
  <MpText size="body" />  ← truncates with ellipsis
</Pixel.button>
```

**Item states:**

| State | Background | Text | Icon | Weight |
|-------|-----------|------|------|--------|
| Default | `transparent` | `text.primary` | `icon.default` | `regular` |
| Active | `blue.100` | `blue.400` | `blue.400` | `semiBold` |
| Hover | `background.neutral.bold` | `text.primary` | `icon.default` | `regular` |

> Note: `blue.100` = #D5DEFF, `blue.400` = #4B61DD (palette tokens, DT2.1). Verify exact semantic token names with `get-docs("design tokens 2.1 interactive selected")`.

### Nav item padding
- Padding: `6px 8px` → `paddingY="1.5" paddingX="2"`
- Gap between items: `2px` → `gap="0.5"`

### Menu groups
- **Primary group** (9 items): Getting started → Reports
- **Secondary group** (2 items): Settings, Give feedback
- Groups separated by `borderBottomWidth="1px" borderColor="border.default"`
- Group vertical padding: `16px` → `paddingY="4"`

### Getting started — icon variant
- Active: uses `flag-fill` (filled icon variant)
- Default: uses `flag` (outline variant)
- All other nav items use the same icon name for both states

### Sidebar footer (Company ID)
- Height: `68px` → `height="17"`
- Padding: `12px` → `paddingX="3"`
- Border: 1px solid `border.default` (top only)
- Contains: collapse arrow button + "Company ID : 102938" label

### Responsive behavior
- **Desktop (≥1024px):** always visible, full width
- **Mobile (<1024px):** hidden by default; toggled by hamburger in `AppHeader`
- Collapse transition: `width 200ms ease`

---

## Sitemap & level-2 submenus

**Node:** `268:618` — Recruitment (submenu state)

The sidebar has two render modes, chosen automatically by the active route:

### Full mode (default) — 216px
Used for any route whose parent has **no** children. Single column with labeled nav items (see AppSidebar above).

### Submenu mode — 264px (icon rail 56px + panel 208px)
Triggered when the active route belongs to a parent that **has** children. The sidebar splits into:

| Column | Width | Background | Contents |
|---|---|---|---|
| Icon rail (level 1) | 56px | **`ash.100` (#E7EDF5)** — the collapsed main-nav tint; **1px `gray.100` border-right** | all top-level items as 40×40 icon buttons; active parent → `blue.100` bg. **No expand/collapse button** — once a submenu is open the rail can't be expanded back. |
| Submenu panel (level 2) | 208px | **none (transparent)** — inherits base `background` (#F1F5F9). **Expanded: no borders** (rail `ash.100` vs base colour separates it); **8px (`mr=2`) gap to `<main>`** | section title — `h=36px`, `mt=16px`, uppercase, `blue.400`, `semiBold`, `letterSpacing=wider`. Child items **`h=36px`** (same as main nav): default `dark`/`regular`; **active = `blue.100` bg + `blue.400` + `semiBold`** (hover default = `ash.100`). Footer **collapse** button (`MpIcon chevrons-left`). |

- **Submenu item states:** `h=36px`; default `dark`/`regular`; **active = `blue.100` bg + `blue.400` + `semiBold`** (hover default = `ash.100`).
- **Borders only when collapsed.** Expanded panel = no border; collapsed sliver = left + right `gray.100` borders + inset shadow.
- **Collapse / expand (level-2 only):**
  - The panel footer's `chevrons-left` button collapses the panel.
  - Collapsed = **16px sliver** of the panel stays visible (left + right `gray.100` borders), content hidden, **+ a 16px column gap (`mr=4`) to `<main>`**. Rail 56 + sliver 16 + gap 16.
  - The sliver's shadow is an **inset, horizontal** shadow (Figma spec) — it stays *inside* the sliver, no outward spread at all: `box-shadow: 6px 0 15px -3px rgba(0,0,0,.10) inset, 4px 0 6px -2px rgba(0,0,0,.05) inset`. (Rail also gets `position: relative; zIndex: 1` as belt-and-suspenders.)
  - A **half-circle tab** (**24×36**, flat left edge flush to the sliver, right side `borderRadius=full`, white bg, `shadow=sm`) sits in that gap at the sliver's bottom edge, with an **`MpIcon chevrons-right size="sm"` (20px)** to re-expand.
  - Icons are **chevrons** (`MpIcon chevrons-left` / `chevrons-right`) — never the `caret` SVG.

### Nav tree (data-driven, in `AppSidebar.vue`)

```
Getting started   /getting-started
Home              /
Job listings      /job-listings
Talent pool       /talent-pool
Candidates        /candidates
Assessments       (parent, no own page)
  ├ Library          /assessments/library
  └ My assessments   /assessments/my-assessments
Calendar          /calendar
Activity log      /activity-log
Reports           /reports
─────────────
Settings          (parent, no own page)
  ├ General          /settings/general
  ├ Team & roles     /settings/team-roles
  └ Integrations     /settings/integrations
Give feedback     /feedback
```

- Items with children have **no own page**. Clicking the parent (full mode) or its rail icon (submenu mode) navigates to its **first child**.
- `nuxt.config.ts` `routeRules` redirect the bare parent path → first child (`/assessments` → `/assessments/library`, `/settings` → `/settings/general`).
- Add a submenu to any item by giving it a `children: [{ label, path }]` array (and dropping its `path`).

---

## PageTitle

**Node:** `247:4741`

| Property | Value | Token |
|----------|-------|-------|
| Height | 72px | `height="18"` |
| Horizontal padding | 24px | `paddingX="6"` |
| Vertical padding | 16px | `paddingY="4"` |

### Variants (props)
| Prop | Type | Purpose |
|------|------|---------|
| `title` | `string` | Main H1 text |
| `breadcrumb` | `{ label, to }?` | Parent crumb as a **link** above the title (`blue.400`, regular, hover underline). Only for a **real detail-under-list** page. See Mekari Way "Page title & breadcrumbs". |
| `badge` | `string?` | Status pill next to title (e.g., "Beta") |
| `hasDropdown` | `boolean` | Shows `caret-down` after title for context switching |
| `#actions` slot | — | Right-aligned action buttons |

> **Breadcrumb rule (Mekari Way):** a page shows a breadcrumb **iff its parent
> is a real rendered page at a different route** (e.g. an entity detail under a
> list page → crumb to the list). **Section-grouping children
> (`/assessments/library`, `/settings/general`, …) and top-level pages show NO
> breadcrumb** — the section parent has no own page, so a crumb would link back
> to the same page (circular). Those pages render just the plain `<h1>` title.

### Typography
- Title: `MpText size="h1" weight="semiBold" color="text.primary"`
- Figma spec: Inter SemiBold 24px / 32px / tracking −0.48px

---

## Stage (content canvas)

**Node:** `259:3560`

| Property | Value | Token |
|----------|-------|-------|
| Background | #FFFFFF | `background.surface` |
| Border | 1px top + 1px left | `border.default` |
| Border radius | 6px top-left only | `borderTopLeftRadius="md"` |
| Overflow | auto | — |

> The stage is the inner white canvas where page content lives. It flexes to fill remaining height. Each page's `<slot />` renders here.

---

## LogoTalenta

**Node:** `259:1394`

- Dimensions: `130px × 34px`, overflow hidden
- Contains: icon mark (bird, ~34px) + "mekari" wordmark + "talenta" wordmark
- Replace `public/images/logo-talenta.svg` with the official Mekari Talenta brand SVG.

---

## Icons — local SVG assets

All icons live in `public/icons/` as static SVGs. The naming convention:
- `{name}.svg` — default (outline) variant
- `{name}-1.svg` — active (filled) variant

```vue
<img :src="`/icons/${name}${active ? '-1' : ''}.svg`" width="24" height="24" alt="" />
```

| Label | Default | Active | Used in |
|-------|---------|--------|---------|
| Getting started | `flag.svg` | `flag-1.svg` | Sidebar nav, empty state |
| Home | `home.svg` | `home-1.svg` | Sidebar nav |
| Job listings | `briefcase.svg` | `briefcase-1.svg` | Sidebar nav |
| Talent pool | `people.svg` | `people-1.svg` | Sidebar nav |
| Candidates | `Executive.svg` | `Executive-1.svg` | Sidebar nav |
| Assessments | `Task-check.svg` | `Task-check-1.svg` | Sidebar nav |
| Calendar | `calendar.svg` | `calendar-1.svg` | Sidebar nav |
| Activity log | `log.svg` | `log-1.svg` | Sidebar nav |
| Reports | `reports.svg` | `reports-1.svg` | Sidebar nav |
| Settings | `settings.svg` | `settings-1.svg` | Sidebar nav |
| Give feedback | `broadcast.svg` | `broadcast-1.svg` | Sidebar nav |
| Notification bell | `notification.svg` | — | Header |
| Shortcuts grid | `shortcut.svg` | — | Header |
| Dropdown caret | `caret.svg` | — | Header, PageTitle |
| Sidebar collapse | `collapse.svg` | — | Sidebar footer |
| Hamburger (mobile) | (CSS bars) | — | Header — no asset provided |
| User avatar | `/images/avatar.svg` | — | Header |
| Brand logo | `/images/logo-talenta.svg` | — | Header |

Icons are 24×24px (sidebar/header), avatar is 36×36px, brand logo is 130×34px.

> If you need the icons to recolor based on state, swap to `mask-image` instead of `<img>` (current approach uses baked-in colors — `-1` variant carries the active brand color).

---

## Responsive breakpoints (Pixel 3 / Chakra-based)

| Token | Viewport |
|-------|---------|
| `base` | 0px+ |
| `sm` | 480px+ |
| `md` | 768px+ |
| `lg` | 992px+ |
| `xl` | 1280px+ |
| `2xl` | 1536px+ |

---

## Component behaviour rules

1. **Active nav item** highlights the entire button row — background, text, icon all change.
2. **Sidebar collapse** animates width to `0` with a 200ms ease transition; the footer button rotates to an expand arrow (implement as needed).
3. **Notification badge** is absolutely positioned and always rendered; update the count from API data.
4. **PageTitle actions slot** aligns buttons to the far right via `marginLeft: auto`.
5. **Stage overflow** is `auto` — page content manages its own internal scrolling.
6. **Z-index layers:** Header = 2, Sidebar = 1, Mobile overlay = 1 (sits above sidebar content).
