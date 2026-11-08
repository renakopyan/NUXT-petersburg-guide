<script setup lang="ts">
import { PLACE_CATEGORIES } from '@layers/places/app/utils/placeCategories'

useHead({ title: 'Главная' })

const { places } = usePlaces()
const isCreateOpen = ref(false)

const sections = computed(() =>
  PLACE_CATEGORIES.map((category) => ({
    category,
    places: places.value.filter((place) => place.category === category.value),
  })),
)
</script>

<template>
  <div class="container home">
    <section class="home__hero">
      <div>
        <p class="home__eyebrow">Санкт‑Петербург · личный гид</p>
        <h1 class="home__title">Наши <em>проверенные</em> места</h1>
        <p class="home__subtitle">
          Кофейни, рестораны и бары, где мы уже были и куда хочется вернуться.
        </p>
      </div>

      <AppButton @click="isCreateOpen = true">+ Создать</AppButton>
    </section>

    <nav class="home__tabs" aria-label="Разделы">
      <a v-for="{ category, places: list } in sections" :key="category.value" :href="`#${category.value}`" class="home__tab">
        {{ category.emoji }} {{ category.title }}
        <span class="home__tab-count">{{ list.length }}</span>
      </a>
    </nav>

    <PlaceSection
      v-for="section in sections"
      :key="section.category.value"
      :category="section.category"
      :places="section.places"
    />

    <PlaceCreateModal v-model="isCreateOpen" />
  </div>
</template>

<style scoped>
.home__hero {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-between;
  gap: 32px;
  padding: 32px 0 40px;
}

.home__eyebrow {
  margin-bottom: 16px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--color-accent);
}

.home__title {
  max-width: 760px;
  font-size: clamp(44px, 7vw, 84px);
  font-weight: 600;
  line-height: 0.95;
}

.home__title em {
  font-style: italic;
  color: var(--color-accent);
}

.home__subtitle {
  max-width: 520px;
  margin-top: 20px;
  font-size: 17px;
  color: var(--color-muted);
}

.home__tabs {
  position: sticky;
  top: 84px;
  z-index: 5;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  width: fit-content;
  margin-bottom: 48px;
  padding: 6px;
  border: 1px solid var(--color-border);
  border-radius: 999px;
  background: var(--glass);
  backdrop-filter: blur(14px);
}

.home__tab {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 18px;
  border-radius: 999px;
  font-size: 14px;
  font-weight: 600;
  transition: background-color 0.2s, color 0.2s;
}

.home__tab:hover {
  background: var(--color-surface-raised);
}

.home__tab-count {
  font-size: 12px;
  font-weight: 700;
  color: var(--color-accent);
}
</style>
