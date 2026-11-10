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
      meta: [{ name: 'theme-color', content: '#0a0f1d' }],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,500;1,600&family=Manrope:wght@400;500;600;700&display=swap',
        },
      ],
    },
  },
})
