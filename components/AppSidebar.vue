<template>
  <aside :class="mode === 'full' ? rootFull : rootSubmenu">
    <!-- ============ FULL MODE (expanded main nav, no submenu) ============ -->
    <template v-if="mode === 'full'">
      <div :class="css({ display: 'flex', flexDirection: 'column', flex: '1 1 auto', px: '2', overflow: 'auto', minHeight: 0 })">
        <div :class="navGroup">
          <button
            v-for="item in primaryNavItems"
            :key="item.label"
            type="button"
            :class="isItemActive(item) ? itemActive : itemDefault"
            @click="navigateTo(itemTarget(item))"
          >
            <img :src="iconSrc(item.icon, isItemActive(item))" :alt="''" aria-hidden="true" width="24" height="24" :class="itemIcon" />
            <span :class="itemLabel">{{ item.label }}</span>
          </button>
        </div>
        <div :class="navGroup">
          <button
            v-for="item in secondaryNavItems"
            :key="item.label"
            type="button"
            :class="isItemActive(item) ? itemActive : itemDefault"
            @click="navigateTo(itemTarget(item))"
          >
            <img :src="iconSrc(item.icon, isItemActive(item))" :alt="''" aria-hidden="true" width="24" height="24" :class="itemIcon" />
            <span :class="itemLabel">{{ item.label }}</span>
          </button>
        </div>
      </div>

      <div :class="css({ display: 'flex', alignItems: 'center', gap: '0.5', h: '68px', px: '3', borderTopWidth: '1px', borderTopStyle: 'solid', borderTopColor: 'gray.100', flexShrink: 0 })">
        <button type="button" :class="ghostBtn" aria-label="Collapse sidebar" @click="isMainNavCollapsed = true">
          <img src="/icons/collapse.svg" alt="" aria-hidden="true" width="24" height="24" />
        </button>
        <span :class="css({ flex: '1 1 auto', color: 'dark', fontSize: 'sm', lineHeight: 'md', fontWeight: 'regular', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' })">Company ID : 102938</span>
      </div>
    </template>

    <!-- ============ RAIL + SUBMENU (collapsed main nav; panel only if submenu) ============ -->
    <template v-else>
      <!-- Icon rail (level 1) — collapsed main nav.
           submenu mode: ash.100 bg + border-right (sits beside the level-2 panel;
             position+zIndex so its opaque bg paints over the panel's drop shadow).
           rail-only mode (no submenu): transparent bg (= base) + no border. -->
      <div :class="mode === 'submenu' ? railBoxSubmenu : railBoxOnly">
        <div :class="css({ display: 'flex', flexDirection: 'column', flex: '1 1 auto', alignItems: 'center', px: '1', overflow: 'auto', minHeight: 0 })">
          <div :class="railGroup">
            <button
              v-for="item in primaryNavItems"
              :key="item.label"
              type="button"
              :class="isItemActive(item) ? railActive : railDefault"
              :aria-label="item.label"
              @click="navigateTo(itemTarget(item))"
            >
              <img :src="iconSrc(item.icon, isItemActive(item))" :alt="''" aria-hidden="true" width="24" height="24" />
            </button>
          </div>
          <div :class="railGroup">
            <button
              v-for="item in secondaryNavItems"
              :key="item.label"
              type="button"
              :class="isItemActive(item) ? railActive : railDefault"
              :aria-label="item.label"
              @click="navigateTo(itemTarget(item))"
            >
              <img :src="iconSrc(item.icon, isItemActive(item))" :alt="''" aria-hidden="true" width="24" height="24" />
            </button>
          </div>
        </div>
        <!-- Expand button ONLY in rail-only mode (no submenu). In submenu mode the
             rail has no expand button (the open submenu owns the space). -->
        <div v-if="mode === 'rail'" :class="css({ display: 'flex', alignItems: 'center', justifyContent: 'center', h: '68px', flexShrink: 0, borderTopWidth: '1px', borderTopStyle: 'solid', borderTopColor: 'gray.100' })">
          <button type="button" :class="ghostBtn" aria-label="Expand sidebar" @click="isMainNavCollapsed = false">
            <img src="/icons/collapse.svg" alt="" aria-hidden="true" width="24" height="24" :class="css({ transform: 'rotate(180deg)' })" />
          </button>
        </div>
      </div>

      <!-- Submenu panel (level 2). Width / margin / border / shadow animate; the
           inner content is kept mounted and clipped (not v-if'd) so collapse /
           expand is a smooth, glitch-free transition rather than a pop. -->
      <div
        v-if="mode === 'submenu'"
        :class="panelBase"
        :style="panelStyle"
      >
        <div
          :class="panelInner"
          :style="{ opacity: isPanelCollapsed ? 0 : 1, pointerEvents: isPanelCollapsed ? 'none' : 'auto' }"
        >
          <div :class="css({ display: 'flex', alignItems: 'center', h: '36px', mt: '4', px: '4', fontSize: 'sm', fontWeight: 'semiBold', letterSpacing: 'wider', textTransform: 'uppercase', color: 'blue.400', whiteSpace: 'nowrap' })">
            {{ activeParent?.label }}
          </div>
          <div :class="css({ display: 'flex', flexDirection: 'column', gap: '0.5', flex: '1 1 auto', px: '2', overflow: 'auto', minHeight: 0 })">
            <NuxtLink
              v-for="child in activeParent?.children"
              :key="child.path"
              :to="child.path"
              v-slot="{ isExactActive, navigate }"
              custom
            >
              <button type="button" :class="isExactActive ? childActive : childDefault" @click="navigate">
                {{ child.label }}
              </button>
            </NuxtLink>
          </div>
          <!-- Level-2 collapse button (collapses the panel, leaving a 16px sliver) — no border-top -->
          <div :class="css({ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', h: '68px', px: '3', flexShrink: 0 })">
            <button type="button" :class="ghostBtn" aria-label="Collapse submenu" @click="isPanelCollapsed = true">
              <MpIcon name="chevrons-left" />
            </button>
          </div>
        </div>
      </div>

      <!-- Half-circle tab — fades in when the level-2 panel is collapsed -->
      <button
        v-if="mode === 'submenu'"
        type="button"
        :class="halfCircleExpand"
        :style="{ opacity: isPanelCollapsed ? 1 : 0, pointerEvents: isPanelCollapsed ? 'auto' : 'none' }"
        aria-label="Expand submenu"
        @click="isPanelCollapsed = false"
      >
        <MpIcon name="chevrons-right" size="sm" />
      </button>
    </template>
  </aside>
</template>

<script setup lang="ts">
import { css, token } from '@mekari/pixel3'

interface NavChild {
  label: string
  path: string
}
interface NavItem {
  label: string
  /** Base icon name in /public/icons/ — active variant uses `${icon}-1.svg` */
  icon: string
  /** Leaf route. Omitted when the item has children (it then routes to its first child). */
  path?: string
  children?: NavChild[]
}

defineProps<{
  isCollapsed?: boolean
}>()

const route = useRoute()

const primaryNavItems: NavItem[] = [
  { label: 'Getting started', icon: 'flag', path: '/getting-started' },
  { label: 'Home', icon: 'home', path: '/' },
  { label: 'Job listings', icon: 'briefcase', path: '/job-listings' },
  { label: 'Talent pool', icon: 'people', path: '/talent-pool' },
  { label: 'Candidates', icon: 'Executive', path: '/candidates' },
  {
    label: 'Assessments',
    icon: 'Task-check',
    children: [
      { label: 'Library', path: '/assessments/library' },
      { label: 'My assessments', path: '/assessments/my-assessments' },
    ],
  },
  { label: 'Calendar', icon: 'calendar', path: '/calendar' },
  { label: 'Activity log', icon: 'log', path: '/activity-log' },
  { label: 'Reports', icon: 'reports', path: '/reports' },
]

const secondaryNavItems: NavItem[] = [
  {
    label: 'Settings',
    icon: 'settings',
    children: [
      { label: 'General', path: '/settings/general' },
      { label: 'Team & roles', path: '/settings/team-roles' },
      { label: 'Integrations', path: '/settings/integrations' },
    ],
  },
  { label: 'Give feedback', icon: 'broadcast', path: '/feedback' },
]

const allItems = [...primaryNavItems, ...secondaryNavItems]

function hasActiveChild(item: NavItem): boolean {
  return !!item.children?.some(c => route.path === c.path || route.path.startsWith(c.path + '/'))
}
function isItemActive(item: NavItem): boolean {
  return item.path ? route.path === item.path : hasActiveChild(item)
}
function itemTarget(item: NavItem): string {
  return item.path ?? item.children?.[0]?.path ?? '/'
}
function iconSrc(name: string, active: boolean): string {
  return `/icons/${name}${active ? '-1' : ''}.svg`
}

const activeParent = computed<NavItem | undefined>(() => allItems.find(hasActiveChild))
const isSubmenuMode = computed(() => !!activeParent.value)

// ---- Collapse state (both GLOBAL via useState → persist across navigation) ----
// Main nav: full (216px labelled) ↔ icon rail (56px). Persists, so <main> never
// jumps on page change. Opening a submenu auto-collapses it and it STAYS collapsed
// afterwards (you re-expand from the rail's expand button on a non-submenu page).
const isMainNavCollapsed = useState('sidebar-main-collapsed', () => false)
watch(isSubmenuMode, (open) => { if (open) isMainNavCollapsed.value = true }, { immediate: true })

// Level-2 panel: full (208px) ↔ sliver (16px).
const isPanelCollapsed = useState('sidebar-panel-collapsed', () => false)

const mode = computed<'full' | 'rail' | 'submenu'>(() =>
  activeParent.value ? 'submenu' : (isMainNavCollapsed.value ? 'rail' : 'full'),
)

// Animated level-2 panel box (width / gap / border / shadow) — driven by collapse state.
const panelStyle = computed(() => ({
  width: isPanelCollapsed.value ? '16px' : '208px',
  marginRight: isPanelCollapsed.value ? '16px' : '8px',
  borderColor: isPanelCollapsed.value ? token.var('colors.gray.100') : 'transparent',
  boxShadow: isPanelCollapsed.value
    ? '6px 0 15px -3px rgba(0, 0, 0, 0.10) inset, 4px 0 6px -2px rgba(0, 0, 0, 0.05) inset'
    : 'none',
}))

/* ---------- shared styles ---------- */
const rootFull = css({ display: 'flex', flexDirection: 'column', w: '216px', h: '100%', bg: 'background', flexShrink: 0 })
const rootSubmenu = css({ display: 'flex', flexDirection: 'row', h: '100%', flexShrink: 0, position: 'relative' })

// Icon rail container — differs by mode:
const railBoxBase = { display: 'flex', flexDirection: 'column', w: '56px', h: '100%', flexShrink: 0 } as const
// submenu: ash.100 bg + border-right; relative/zIndex so bg covers the panel shadow.
const railBoxSubmenu = css({
  ...railBoxBase, bg: 'ash.100', position: 'relative', zIndex: 1,
  borderRightWidth: '1px', borderRightStyle: 'solid', borderRightColor: 'gray.100',
})
// rail-only (no submenu): transparent (= base background), no border.
const railBoxOnly = css({ ...railBoxBase, bg: 'transparent' })

// Level-2 panel shell. width/marginRight/borderColor/boxShadow animated via :style
// (panelStyle); borders always 1px (transparent when expanded) with box-border so
// toggling them never shifts layout. overflow:hidden clips the fixed-width inner.
const panelBase = css({
  display: 'flex', flexDirection: 'column', h: '100%', flexShrink: 0,
  overflow: 'hidden', boxSizing: 'border-box',
  borderLeftWidth: '1px', borderRightWidth: '1px', borderStyle: 'solid',
  transitionProperty: 'width, margin-right, border-color, box-shadow',
  transitionDuration: '200ms', transitionTimingFunction: 'ease',
})
const panelInner = css({
  display: 'flex', flexDirection: 'column', w: '208px', h: '100%', flexShrink: 0,
  transition: 'opacity 150ms ease',
})

const halfCircleExpand = css({
  position: 'absolute', bottom: '5', left: '72px', zIndex: 30,
  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
  w: '24px', h: '36px', bg: 'white', color: 'gray.600',
  borderTopWidth: '1px', borderRightWidth: '1px', borderBottomWidth: '1px',
  borderStyle: 'solid', borderColor: 'gray.100',
  borderTopRightRadius: 'full', borderBottomRightRadius: 'full',
  boxShadow: 'sm', cursor: 'pointer',
  transition: 'opacity 150ms ease',
  _hover: { bg: 'gray.50' },
})

const navGroup = css({
  display: 'flex', flexDirection: 'column', gap: '0.5', py: '4',
  borderBottomWidth: '1px', borderBottomStyle: 'solid', borderBottomColor: 'gray.100',
})

const itemBase = {
  display: 'flex', alignItems: 'center', gap: '2', w: 'full', py: '1.5', px: '2',
  border: 'none', borderRadius: 'md', cursor: 'pointer', textAlign: 'left',
  transition: 'background-color 120ms ease', fontFamily: 'inherit', fontSize: 'md', lineHeight: 'lg',
} as const
const itemDefault = css({ ...itemBase, bg: 'transparent', color: 'dark', fontWeight: 'regular', _hover: { bg: 'gray.50' } })
const itemActive = css({ ...itemBase, bg: 'blue.100', color: 'blue.400', fontWeight: 'semiBold', _hover: { bg: 'blue.100' } })
const itemIcon = css({ flexShrink: 0, display: 'block', w: '24px', h: '24px' })
const itemLabel = css({ flex: '1 1 auto', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' })

const railGroup = css({
  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5', py: '4', w: 'full',
  borderBottomWidth: '1px', borderBottomStyle: 'solid', borderBottomColor: 'gray.100',
})
// h must match the full-mode item (36px) so icons don't shift vertically when
// the main nav expands/collapses. Icon lands at the same x (16px) in both modes.
const railBase = {
  display: 'flex', alignItems: 'center', justifyContent: 'center', w: '40px', h: '36px',
  border: 'none', borderRadius: 'md', cursor: 'pointer', flexShrink: 0,
  transition: 'background-color 120ms ease',
} as const
const railDefault = css({ ...railBase, bg: 'transparent', _hover: { bg: 'gray.50' } })
const railActive = css({ ...railBase, bg: 'blue.100', _hover: { bg: 'blue.100' } })

const childBase = {
  display: 'flex', alignItems: 'center', w: 'full', h: '36px', textAlign: 'left', border: 'none', cursor: 'pointer',
  px: '3', borderRadius: 'md', fontFamily: 'inherit', fontSize: 'md', lineHeight: 'md',
  transition: 'background-color 120ms ease',
} as const
const childDefault = css({ ...childBase, bg: 'transparent', color: 'dark', fontWeight: 'regular', _hover: { bg: 'ash.100' } })
const childActive = css({ ...childBase, bg: 'blue.100', color: 'blue.400', fontWeight: 'semiBold', _hover: { bg: 'blue.100' } })

const ghostBtn = css({
  display: 'inline-flex', alignItems: 'center', justifyContent: 'center', p: '1.5',
  border: 'none', bg: 'transparent', borderRadius: 'md', cursor: 'pointer', flexShrink: 0,
  transition: 'background-color 120ms ease', _hover: { bg: 'gray.50' },
})
</script>
