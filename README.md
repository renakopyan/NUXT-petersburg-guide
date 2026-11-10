# Топ заведений Санкт-Петербурга

Nuxt 4 + TypeScript, архитектура на Nuxt Layers.

## Структура

```
app/                  корневое приложение: только app.vue
layers/
  core/               базовый слой: стили, шрифты, плагины, мета
  shared/             layout, шапка, общий UI (App*), composables, утилиты
  places/             домен «Заведения»: главная (/), страницы /places/*, компоненты, server/api
```

## Правила

- Код слоя лежит в `layers/<name>/app/` (pages, components, composables, assets),
  серверный код — в `layers/<name>/server/`.
  Только эти папки попадают в tsconfig, который генерирует Nuxt 4.
- Зависимости идут в одну сторону: `places → shared → core`. Слой не импортирует
  то, что выше него.
- Приоритет слоёв задаётся в корневом `nuxt.config.ts` (`extends`, первый — главный).
  Новый слой нужно добавить туда же.
- Между слоями импортируем через алиасы: `@layers/core/...`, `@layers/places/app/...` (алиас из корневого nuxt.config.ts).
- В `shared` у каждого компонента своя папка, имя файла совпадает с именем компонента:
  `ui/app-button/AppButton.vue` → `<AppButton>` (`pathPrefix: false`).

## Запуск

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
npm run preview
```
