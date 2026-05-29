import * as PixelExports from '@mekari/pixel3'
import type { Component } from 'vue'

const { PixelPlugin } = PixelExports

export default defineNuxtPlugin((nuxtApp) => {
  const app = nuxtApp.vueApp

  // Pixel context (theme watcher, optional directives)
  app.use(PixelPlugin)

  // Globally register every Mp* component so templates don't need per-file imports.
  // Pixel.div / Pixel.button (factory) are NOT registered here — they need
  // `import { Pixel } from '@mekari/pixel3'` in the component's <script setup>.
  for (const [name, exported] of Object.entries(PixelExports)) {
    if (name.startsWith('Mp') && exported && typeof exported === 'object' && 'setup' in exported) {
      app.component(name, exported as Component)
    }
  }
})
