import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const currentDir = dirname(fileURLToPath(import.meta.url))

// Общий слой: layout, шапка, UI-компоненты, composables и утилиты без бизнес-логики.
// Зависит только от core.
export default defineNuxtConfig({
  $meta: { name: 'shared' },

  extends: ['../core'],

  // Папка на компонент (ui/app-button/AppButton.vue): имя берём из файла,
  // а не из пути, иначе Nuxt назовёт компонент UiAppButtonAppButton.
  components: [
    { path: join(currentDir, 'app/components'), pathPrefix: false },
  ],
})
