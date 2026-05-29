<template>
  <div :class="css({ display: 'flex', flexDirection: 'column', minHeight: '100vh', bg: 'background' })">
    <AppHeader
      @module-switch="onModuleSwitch"
      @sidebar-toggle="isMobileSidebarOpen = !isMobileSidebarOpen"
    />

    <div :class="css({ display: 'flex', flex: '1 1 auto', h: 'calc(100vh - 56px)', overflow: 'hidden', position: 'relative' })">
      <AppSidebar
        :class="sidebarClass"
        @collapse="isMobileSidebarOpen = false"
      />

      <!-- Mobile overlay (only visible when sidebar open on mobile) -->
      <div
        v-if="isMobileSidebarOpen"
        :class="overlay"
        @click="isMobileSidebarOpen = false"
      />

      <main :class="css({ display: 'flex', flexDirection: 'column', flex: '1 1 auto', minWidth: 0, overflow: 'hidden' })">
        <PageTitle :title="pageTitle" :breadcrumb="pageBreadcrumb" />
        <section
          :class="css({
            flex: '1 1 auto', bg: 'white',
            borderTopWidth: '1px', borderTopStyle: 'solid', borderTopColor: 'gray.100',
            borderLeftWidth: '1px', borderLeftStyle: 'solid', borderLeftColor: 'gray.100',
            borderTopLeftRadius: 'md', overflow: 'auto', minHeight: 0,
          })"
        >
          <slot />
        </section>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { css } from '@mekari/pixel3'

const route = useRoute()
const isMobileSidebarOpen = ref(false)

const pageTitle = computed(() => (route.meta.title as string) || 'Page Title')
const pageBreadcrumb = computed(() => route.meta.breadcrumb as { label: string, to: string } | undefined)

useHead(() => ({
  title: pageTitle.value ? `${pageTitle.value} — Talenta` : 'Talenta Recruitment',
}))

function onModuleSwitch() {
  // Integrate with Mekari app switcher / router as needed
}

// Sidebar: desktop always visible; mobile (<lg / 1024px) slides in/out via transform.
const sidebarShared = {
  position: 'fixed', top: '56px', left: 0, h: 'calc(100vh - 56px)',
  zIndex: 20, transition: 'transform 200ms ease',
} as const

const sidebarClosed = css({ flexShrink: 0, lgDown: { ...sidebarShared, transform: 'translateX(-100%)' } })
const sidebarOpen = css({ flexShrink: 0, lgDown: { ...sidebarShared, transform: 'translateX(0)' } })
const sidebarClass = computed(() => (isMobileSidebarOpen.value ? sidebarOpen : sidebarClosed))

const overlay = css({
  display: { base: 'none', lgDown: 'block' },
  position: 'fixed', top: '56px', right: 0, bottom: 0, left: 0,
  bg: 'overlay', zIndex: 10,
})
</script>
