<script setup lang="ts">
const links = [
  { to: '/', label: 'Главная' },
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
  background: color-mix(in srgb, var(--color-bg) 70%, transparent);
  backdrop-filter: blur(14px) saturate(140%);
  border-bottom: 1px solid var(--color-border);
}

.header__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 72px;
}

.header__logo {
  display: flex;
  align-items: baseline;
  gap: 8px;
  font-family: var(--font-display);
  font-size: 26px;
  font-weight: 600;
  font-style: italic;
  letter-spacing: 0.01em;
}

.header__city {
  font-family: var(--font-body);
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--color-accent);
}

.header__nav {
  display: flex;
  gap: 4px;
  padding: 4px;
  border: 1px solid var(--color-border);
  border-radius: 999px;
  background: var(--glass);
}

.header__link {
  padding: 8px 18px;
  border-radius: 999px;
  font-size: 14px;
  font-weight: 600;
  color: var(--color-muted);
  transition: color 0.2s, background-color 0.2s;
}

.header__link:hover {
  color: var(--color-text);
}

.header__link--active {
  color: var(--color-on-accent);
  background: var(--color-accent);
}
</style>
