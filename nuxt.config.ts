// https://nuxt.com/docs/api/configuration/nuxt-config
import { fileURLToPath } from 'node:url'

export default defineNuxtConfig({
  modules: ['@nuxt/eslint'],
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  // Явный приоритет слоёв: первый перекрывает следующие.
  // Без этого Nuxt сортирует ./layers по алфавиту (shared > places > core).
  extends: [
    './layers/places',
    './layers/shared',
    './layers/core',
  ],

  // Импорты между слоями: @layers/places/app/types/place
  alias: {
    '@layers': fileURLToPath(new URL('./layers', import.meta.url)),
  },
})
