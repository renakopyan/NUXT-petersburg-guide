// Доменный слой «Заведения»: страницы /places/*, компоненты, composables, server/api.
// Зависит от core и shared, но не наоборот.
export default defineNuxtConfig({
  $meta: { name: 'places' },

  extends: ['../core', '../shared'],
})
