<template>
  <div :class="css({ display: 'flex', alignItems: 'center', gap: '2', py: '4', px: '6', h: '72px', flexShrink: 0 })">
    <div :class="css({ display: 'flex', flexDirection: 'column', justifyContent: 'center', flex: '1 1 auto', minWidth: 0 })">
      <NuxtLink
        v-if="breadcrumb"
        :to="breadcrumb.to"
        :class="css({ alignSelf: 'flex-start', color: 'blue.400', fontSize: 'md', lineHeight: 'md', fontWeight: 'regular', textDecoration: 'none', _hover: { textDecoration: 'underline' } })"
      >
        {{ breadcrumb.label }}
      </NuxtLink>
      <div :class="css({ display: 'flex', alignItems: 'center', gap: '2' })">
        <h1
          :class="css({ m: 0, color: 'dark', fontSize: '2xl', lineHeight: '2xl', fontWeight: 'semiBold', letterSpacing: 'tighter', whiteSpace: 'nowrap' })"
        >
          {{ title }}
        </h1>
        <span
          v-if="badge"
          :class="css({ display: 'inline-flex', alignItems: 'center', bg: 'blue.400', borderRadius: 'full', px: '1.5', py: 0, color: 'white', fontSize: 'md', lineHeight: 'md', fontWeight: 'regular' })"
        >
          {{ badge }}
        </span>
        <img
          v-if="hasDropdown"
          src="/icons/caret.svg"
          alt=""
          aria-hidden="true"
          width="24"
          height="24"
          :class="css({ display: 'block', flexShrink: 0, w: '24px', h: '24px' })"
        />
      </div>
    </div>
    <div
      v-if="$slots.actions"
      :class="css({ display: 'flex', alignItems: 'center', gap: '2', ml: 'auto' })"
    >
      <slot name="actions" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { css } from '@mekari/pixel3'

withDefaults(defineProps<{
  title?: string
  /** Parent crumb for detail/child pages. Top-level pages omit this. */
  breadcrumb?: { label: string, to: string }
  badge?: string
  hasDropdown?: boolean
}>(), {
  title: 'Page Title',
  hasDropdown: false,
})
</script>
