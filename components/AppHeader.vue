<template>
  <header
    :class="css({
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      bg: 'white', borderBottomWidth: '1px', borderBottomStyle: 'solid', borderBottomColor: 'gray.100',
      px: '6', h: '56px', flexShrink: 0, position: 'sticky', top: 0, zIndex: 2,
    })"
  >
    <!-- Left: Logo + divider + module switcher -->
    <div :class="css({ display: 'flex', alignItems: 'center', gap: '6', flex: '1 1 auto', h: '100%', minWidth: 0 })">
      <LogoTalenta />
      <div :class="css({ w: '1px', h: '24px', bg: 'gray.100', flexShrink: 0 })" />
      <button
        type="button"
        :class="css({
          display: 'inline-flex', alignItems: 'center', gap: '2',
          pt: '2', pb: '2', pl: '4', pr: '3', border: 'none', bg: 'transparent',
          borderRadius: 'md', cursor: 'pointer', color: 'gray.600', fontFamily: 'inherit',
          fontSize: 'md', lineHeight: 'md', fontWeight: 'regular',
          transition: 'background-color 120ms ease', _hover: { bg: 'gray.50' },
        })"
        @click="emit('module-switch')"
      >
        <span :class="css({ whiteSpace: 'nowrap' })">Recruitment</span>
        <img
          src="/icons/caret.svg"
          alt=""
          aria-hidden="true"
          width="20"
          height="20"
          :class="css({ display: 'block', flexShrink: 0, w: '20px', h: '20px' })"
        />
      </button>
    </div>

    <!-- Right: hamburger (mobile) + notification + shortcuts + user -->
    <div :class="css({ display: 'flex', alignItems: 'center', gap: '2' })">
      <button
        type="button"
        :class="css({
          display: { base: 'none', lgDown: 'flex' }, flexDirection: 'column', justifyContent: 'center',
          gap: '1', w: '9', h: '9', border: 'none', bg: 'transparent', borderRadius: 'md',
          cursor: 'pointer', flexShrink: 0, transition: 'background-color 120ms ease', _hover: { bg: 'gray.50' },
        })"
        aria-label="Toggle sidebar"
        @click="emit('sidebar-toggle')"
      >
        <span :class="css({ display: 'block', w: '18px', h: '2px', bg: 'dark', borderRadius: '1px' })" />
        <span :class="css({ display: 'block', w: '18px', h: '2px', bg: 'dark', borderRadius: '1px' })" />
        <span :class="css({ display: 'block', w: '18px', h: '2px', bg: 'dark', borderRadius: '1px' })" />
      </button>

      <!-- Notification bell with badge -->
      <div :class="css({ position: 'relative', flexShrink: 0 })">
        <button type="button" :class="iconButton" aria-label="Notifications">
          <img src="/icons/notification.svg" alt="" aria-hidden="true" width="24" height="24" />
        </button>
        <span
          :class="css({
            position: 'absolute', top: 0, right: '-2px', display: 'inline-flex', alignItems: 'center',
            bg: 'red.400', borderWidth: '2px', borderStyle: 'solid', borderColor: 'white', borderRadius: 'full',
            py: '1px', px: '1', color: 'white', fontSize: 'xs', lineHeight: 'xs', fontWeight: 'semiBold',
            pointerEvents: 'none', whiteSpace: 'nowrap',
          })"
        >9+</span>
      </div>

      <!-- Shortcuts -->
      <button type="button" :class="iconButton" aria-label="Shortcuts">
        <img src="/icons/shortcut.svg" alt="" aria-hidden="true" width="24" height="24" />
      </button>

      <!-- User snapshot -->
      <div
        :class="css({
          display: 'flex', alignItems: 'center', gap: '3', py: '1', px: '2', borderRadius: 'md',
          cursor: 'pointer', transition: 'background-color 120ms ease', _hover: { bg: 'gray.50' },
        })"
        role="button"
        tabindex="0"
        aria-label="User menu"
      >
        <img
          src="/images/avatar.svg"
          alt="Rizal Candra"
          width="36"
          height="36"
          :class="css({ display: 'block', w: '9', h: '9', borderRadius: 'full', flexShrink: 0 })"
        />
        <div :class="css({ display: { base: 'none', md: 'flex' }, flexDirection: 'column' })">
          <span :class="css({ color: 'dark', fontSize: 'md', lineHeight: 'md', fontWeight: 'semiBold', whiteSpace: 'nowrap' })">Rizal Candra</span>
          <span :class="css({ color: 'gray.600', fontSize: 'sm', lineHeight: 'sm', fontWeight: 'regular', whiteSpace: 'nowrap' })">PT Central Perk Indonesia</span>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { css } from '@mekari/pixel3'

defineEmits<{
  'module-switch': []
  'sidebar-toggle': []
}>()

// Shared icon-button style (notification + shortcuts)
const iconButton = css({
  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
  p: '1.5', border: 'none', bg: 'transparent', borderRadius: 'md',
  cursor: 'pointer', flexShrink: 0, transition: 'background-color 120ms ease',
  _hover: { bg: 'gray.50' },
})
</script>
