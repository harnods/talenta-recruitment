# Token Reference — Pixel 3 Design Token 2.1

> Token mode: **2.1** (do not mix with 2.4 / `[data-panda-theme=next]`)
> Source: `@mekari/pixel3` + `@mekari/pixel3-postcss` generate CSS variables; Vue SFC `<style>` blocks consume them.
> Last updated: 2026-05-22

---

## Styling approach (important)

This project styles components with the **`css()` function** from `@mekari/pixel3`, per the official guides:
- [CSS Function](https://docs.mekari.design/docs/guides/css-function.html)
- [CSS Props](https://docs.mekari.design/docs/guides/css-props.html)
- [Dynamic Styles](https://docs.mekari.design/docs/guides/dynamic-styles.html)

`css()` is the documented way to style native HTML tags and override Pixel components. It accepts utility props (full or shorthand: `backgroundColor` / `bg`) and design-token dot-path values (`'white'`, `'blue.400'`, `'gray.100'`). Panda CSS extracts every `css({...})` call from `.vue` files (template `:class` bindings AND `<script setup>`) and generates atomic classes like `.mp-bg_white`.

```vue
<template>
  <header :class="css({ bg: 'white', px: '6', borderBottomWidth: '1px', borderBottomColor: 'gray.100', borderBottomStyle: 'solid' })">
    <MpIcon name="bell" />
  </header>
</template>

<script setup lang="ts">
import { css } from '@mekari/pixel3'
</script>
```

**Verified working in this Nuxt + `@mekari/pixel3-postcss` setup** — `css()` calls in Vue templates extract correctly and produce real CSS rules. Token values use dot-path names (NOT `var(--mp-*)`).

### Rules

1. **No scoped `<style>` blocks** in components/pages/layouts — use `css()`.
2. **No `var(--mp-*)` references** in `.vue` files — use token dot-path values inside `css()`.
3. **CSS Props directly on `Pixel.*` / `MpFlex` template attributes** (e.g. `<MpFlex bg="white">`) are NOT used — Panda does not reliably extract Vue template attribute syntax. Use `css()` on semantic HTML instead (keeps accessible markup + works reliably).
4. **Dynamic / runtime values** → use `token.var()` with `:style`, e.g. `:style="{ color: token.var(\`colors.${name}\`) }"`. For boolean toggles, precompute two static `css()` results and switch (see `layouts/default.vue` sidebar).
5. **Responsive** → use Panda breakpoint conditions: `lg` = 1024px, `md` = 768px; `lgDown` / `mdDown` for max-width. Example: `display: { base: 'none', lgDown: 'flex' }`.
6. **Global resets only** (`assets/css/main.css`) stay as plain CSS — they target `html`/`body`/`:focus-visible`, not components. `:focus-visible` still references `var(--mp-colors-blue-400)`.
7. Keep Pixel components (`MpIcon`, `MpAvatar`, `MpText`, `MpButton`) for semantics where used.

### Utility prop quick reference (used in this project)

| CSS | Utility prop | Token category |
|---|---|---|
| `background-color` | `bg` / `backgroundColor` | colors |
| `color` | `color` | colors |
| `padding-x/y` | `px` / `py` (or `p`, `pt`, `pl`…) | spacing |
| `gap` | `gap` | spacing |
| `border-radius` | `borderRadius` | radii |
| `font-size` | `fontSize` | fontSizes |
| `line-height` | `lineHeight` | lineHeights |
| `font-weight` | `fontWeight` | fontWeights |
| `letter-spacing` | `letterSpacing` | letterSpacings |
| `width` / `height` | `w` / `h` | sizes (or raw `'56px'`) |
| `margin` | `m` / `ml` / `mr`… | spacing |

Hover/focus → `_hover: {…}`, `_focus: {…}`. Raw values (`'100vh'`, `'56px'`, `'calc(...)'`, `'1 1 auto'`) pass through as strings.

---

## DT2.1 CSS variables (verified from generated output)

### Color tokens

| CSS variable | Hex | Used for |
|---|---|---|
| `--mp-colors-dark` | `#232933` | Primary text, headings, nav labels, icon default |
| `--mp-colors-gray-600` | `#626B79` | Secondary text, captions, module label |
| `--mp-colors-gray-100` | `#D0D6DD` | Borders, dividers |
| `--mp-colors-gray-50` | `#EDF0F2` | Hover background |
| `--mp-colors-background` | `#F1F5F9` | App background, sidebar bg |
| `--mp-colors-white` | `#FFFFFF` | Stage/canvas background, text-on-dark |
| `--mp-colors-blue-100` | `#D5DEFF` | Active nav item background |
| `--mp-colors-blue-400` | `#4B61DD` | Active nav text/icon, breadcrumb, beta badge |
| `--mp-colors-red-400` | `#DA473F` | Notification badge background |
| `--mp-colors-transparent` | `transparent` | Default button background |

### Spacing tokens

Pixel's spacing scale uses the format `--mp-spacing-{n}` where `n` is the scale step.

| CSS variable | px | Common usage |
|---|---|---|
| `--mp-spacing-1` | 4px | Badge padding Y, fine gaps |
| `--mp-spacing-2` | 8px | Nav item padding X, header right gap, sidebar padding X |
| `--mp-spacing-3` | 12px | Sidebar footer padding X, user avatar gap |
| `--mp-spacing-4` | 16px | Page title padding Y, nav group padding Y |
| `--mp-spacing-6` | 24px | Header padding X, header left gap, page title padding X |
| `--mp-spacing-10` | 40px | Empty state padding |

### Border radius tokens

| CSS variable | px | Usage |
|---|---|---|
| `--mp-radii-sm` | 4px | Small chips |
| `--mp-radii-md` | 6px | Buttons, nav items, stage top-left |
| `--mp-radii-lg` | 8px | Cards |
| `--mp-radii-full` (or `999px`) | 999px | Badges, avatars, pills |

### Typography tokens

**Font sizes** (`--mp-font-sizes-{size}`)

| CSS variable | px | Pixel 3 text style |
|---|---|---|
| `--mp-font-sizes-xs` | 10px | `overline` |
| `--mp-font-sizes-sm` | 12px | `label-small`, `body-small` |
| `--mp-font-sizes-md` | 14px | `label`, `body` |
| `--mp-font-sizes-lg` | 16px | (lg text) |
| `--mp-font-sizes-xl` | 18px | `h3` |
| `--mp-font-sizes-2xl` | 24px | `h1` |

**Font weights** (`--mp-font-weights-{weight}`)

| CSS variable | Value |
|---|---|
| `--mp-font-weights-regular` | 400 |
| `--mp-font-weights-semi-bold` | 600 |
| `--mp-font-weights-bold` | 700 |

**Line heights** (`--mp-line-heights-{size}`) — ⚠️ exact px values inferred from Pixel 3 text styles, verify with design system team

| CSS variable | px (inferred) | Paired with |
|---|---|---|
| `--mp-line-heights-xs` | 12px | `overline` (10px font) |
| `--mp-line-heights-sm` | 16px | `label-small` (12px font) |
| `--mp-line-heights-md` | 20px | `label` (14px font) |
| `--mp-line-heights-lg` | 24px | `body` (14px font) |
| `--mp-line-heights-2xl` | 32px | `h1` (24px font) |
| `--mp-line-heights-3xl` | — | (larger headings) |

**Letter spacings** (`--mp-letter-spacings-{name}`) — ⚠️ exact values need verification

| CSS variable | Value (inferred) | Usage |
|---|---|---|
| `--mp-letter-spacings-tighter` | −0.02em (~−0.48px @ 24px) | `h1` heading |
| `--mp-letter-spacings-tight` | −0.01em | tight text |
| `--mp-letter-spacings-normal` | 0 | default body |
| `--mp-letter-spacings-wide` | 0.025em | — |
| `--mp-letter-spacings-wider` | 0.05em | — |
| `--mp-letter-spacings-widest` | 0.1em | — |

### Spacing half-steps

These exist in the DT2.1 token map (Chakra CSS scale). The dot in the variable name is a CSS-escaped character — reference exactly as written:

| CSS variable | px |
|---|---|
| `--mp-spacing-0\.5` | 2px |
| `--mp-spacing-1\.5` | 6px |
| `--mp-spacing-2\.5` | 10px |

### Border width tokens

| CSS variable | Width |
|---|---|
| `--mp-border-widths-sm` | 1px |
| `--mp-border-widths-md` | 1.5px |
| `--mp-border-widths-lg` | 2px |

### Radii tokens

| CSS variable | Value |
|---|---|
| `--mp-radii-none` | 0 |
| `--mp-radii-xs` | 0.125rem (2px) |
| `--mp-radii-sm` | ~4px |
| `--mp-radii-md` | 6px |
| `--mp-radii-lg` | ~8px |
| `--mp-radii-xl` | ~12px |
| `--mp-radii-full` | 9999px |

### Overlay token

| CSS variable | Value | Usage |
|---|---|---|
| `--mp-colors-overlay` | `rgba(22, 26, 32, 0.8)` | Modal/sidebar mobile backdrop |

### Shadow tokens

Use via `boxShadow` / `shadow` utility prop with the token name (e.g. `css({ boxShadow: 'lg' })`).

| Token | Usage |
|---|---|
| `xs`, `sm`, `md`, `lg`, `xl` | Elevation presets |
| `lg` | Submenu panel (level-2) — `0 10px 15px -3px / 0 4px 6px -2px`, matches Figma shadow `S` |
| `outline` | Focus ring |

---

## Fixed pixel values (legitimate non-token)

These do not have direct DT2.1 tokens and remain as raw `px`. All are architectural constants or brand asset dimensions:

| Component | Value | Reason |
|---|---|---|
| Header height | `56px` | Layout fixed dimension (14 × 4px) |
| Sidebar width | `216px` | Layout fixed dimension (54 × 4px) |
| Sidebar footer height | `68px` | Layout fixed dimension (17 × 4px) |
| Page title height | `72px` | Layout fixed dimension (18 × 4px) |
| Logo size | `130×34px` | Brand asset dimension |
| Icon sizes | `24px`, `48px` | Asset-fixed sizes for SVG icons |
| Avatar size | `36px` | Asset-fixed dimension (`--mp-sizes-9`) |
| Hamburger bar | `18px × 2px` | Structural CSS-drawn element |
| Hamburger bar radius | `1px` | Below `--mp-radii-xs` (2px) — no token |
| Notification badge offset | `right: -2px`, `top: 0` | Sub-pixel fine-tuning — no token |
| Badge padding-Y | `1px` | Between `0` and `--mp-spacing-0\.5` (2px) — no token |
| Border widths used as dividers | `1px` | Use `--mp-border-widths-sm` for actual borders |

---

## Pixel components used (semantic features only)

These are used for built-in behavior, not for layout/styling props:

| Component | Why |
|---|---|
| `MpIcon` | Icon system — `name="bell"`, `name="flag"`, etc. |
| `MpAvatar` | Avatar with initials fallback — `size="sm" name="..."` |
| `MpText` | (Not used in current shell — pages may use it for body text via `size` prop) |
| `MpButton` | (Not used in current shell — pages may use it for actions via `variant` prop) |

Custom buttons in the shell (icon-only header buttons, sidebar nav items) are styled `<button>` elements because the design needs precise padding/state control that's easier to express in scoped CSS.

---

## Open questions — verify with design system team

1. **Line height exact px values** — tokens exist (`--mp-line-heights-xs/sm/md/lg/2xl`) but mapping to actual px is inferred. Verify: xs=12px, sm=16px, md=20px, lg=24px, 2xl=32px.
2. **Letter spacing tighter** — `--mp-letter-spacings-tighter` used for h1 (-0.48px at 24px). Verify this equals `−0.02em`.
3. **Danger color** — Figma uses `#EF4444` but `--mp-colors-red-400` is `#DA473F`. Confirm preferred token for the notification badge background.
4. **Brand red `#F22929`** (Talenta brand mark) — token name not yet identified.
5. **Beta badge color** — currently `--mp-colors-blue-400`. Confirm.
6. **`--mp-colors-overlay` in mobile sidebar backdrop** — uses `rgba(22, 26, 32, 0.8)` which is darker than the original `rgba(35, 41, 51, 0.4)`. Confirm if overlay token is correct here or if a lighter alpha token is preferred.
