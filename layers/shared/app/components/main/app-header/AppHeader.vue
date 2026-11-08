<script setup lang="ts">
const links = [
  { to: '/', label: 'Главная' },
  { to: '/map', label: 'Карта' },
]
</script>

<template>
  <header class="header">
    <div class="container header__inner">
      <NuxtLink to="/" class="header__logo">
        Свои места <span class="header__city">СПб</span>
      </NuxtLink>

      <nav class="header__nav" aria-label="Основное меню">
        <NuxtLink
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="header__link"
          exact-active-class="header__link--active"
        >
          {{ link.label }}
        </NuxtLink>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 10;
  background: color-mix(in srgb, var(--color-bg) 85%, transparent);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid var(--color-border);
}

.header__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
}

.header__logo {
  font-weight: 700;
  font-size: 18px;
}

.header__city {
  color: var(--color-accent);
}

.header__nav {
  display: flex;
  gap: 4px;
}

.header__link {
  padding: 8px 14px;
  border-radius: var(--radius-sm);
  font-weight: 500;
  color: var(--color-muted);
  transition: color 0.15s, background-color 0.15s;
}

.header__link:hover {
  color: var(--color-text);
}

.header__link--active {
  color: var(--color-accent);
  background: var(--color-accent-soft);
}
</style>
