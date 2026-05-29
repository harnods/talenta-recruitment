// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },

  app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/png', href: '/images/favicon.png' },
      ],
    },
  },

  css: [
    '~/assets/css/pixel3.css',
    '~/assets/css/main.css',
  ],

  postcss: {
    plugins: {
      '@mekari/pixel3-postcss': {
        tokenMode: '2.1',
        // Pixel 3 defaults scan ./src and ./app — add Nuxt's directories
        include: [
          './layouts/**/*.{vue,ts}',
          './components/**/*.{vue,ts}',
          './pages/**/*.{vue,ts}',
          './plugins/**/*.{vue,ts}',
          './app/**/*.{vue,ts}',
        ],
      },
    },
  },

  // Parent menus with submenus have no own page — redirect to their first child.
  routeRules: {
    '/assessments': { redirect: '/assessments/library' },
    '/settings': { redirect: '/settings/general' },
  },

  typescript: {
    strict: true,
  },

  compatibilityDate: '2024-04-03',
})
