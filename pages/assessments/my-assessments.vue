<template>
  <div :class="css({ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: '1 1 auto', h: '100%', gap: '4', py: '10', px: '6' })">
    <img
      src="/icons/Task-check.svg"
      alt=""
      aria-hidden="true"
      width="48"
      height="48"
      :class="css({ display: 'block', w: '48px', h: '48px', opacity: 0.5 })"
    />
    <p :class="css({ m: 0, fontSize: 'md', lineHeight: 'lg', fontWeight: 'regular', color: 'gray.600' })">My assessments coming soon.</p>
  </div>
</template>

<script setup lang="ts">
import { css } from '@mekari/pixel3'

definePageMeta({
  title: 'My assessments',
})
</script>
