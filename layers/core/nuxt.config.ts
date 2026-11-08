import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const currentDir = dirname(fileURLToPath(import.meta.url))

// Базовый слой: глобальные стили, шрифты, плагины, мета приложения.
// Ни от кого не зависит.
export default defineNuxtConfig({
  $meta: { name: 'core' },

  css: [join(currentDir, './app/assets/css/global.css')],

  app: {
    head: {
      htmlAttrs: { lang: 'ru' },
      titleTemplate: '%s · Топ заведений СПб',
      meta: [{ name: 'theme-color', content: '#121417' }],
    },
  },
})
