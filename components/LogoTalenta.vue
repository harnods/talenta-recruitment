<template>
  <div :class="css({ position: 'relative', width: '130px', height: '34px', overflow: 'hidden', flexShrink: 0 })">
    <!--
      TODO: Replace src with the official Mekari Talenta brand asset.
      See public/images/logo-talenta.svg — place the real SVG there.
    -->
    <img
      src="/images/logo-talenta.svg"
      alt="Mekari Talenta"
      width="130"
      height="34"
      :class="css({ display: 'block', width: '100%', height: '100%', objectFit: 'contain' })"
    />
  </div>
</template>

<script setup lang="ts">
import { css } from '@mekari/pixel3'
</script>
