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
        <h1 class="home__title">Наши проверенные места</h1>
        <p class="home__subtitle">
          Кофейни, рестораны и бары Петербурга, где мы уже были и куда хочется вернуться.
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
  gap: 24px;
  margin-bottom: 28px;
}

.home__title {
  font-size: clamp(28px, 4vw, 40px);
  font-weight: 700;
  line-height: 1.15;
}

.home__subtitle {
  max-width: 560px;
  margin-top: 10px;
  color: var(--color-muted);
}

.home__tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 40px;
}

.home__tab {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border: 1px solid var(--color-border);
  border-radius: 999px;
  background: var(--color-surface);
  font-weight: 500;
  transition: border-color 0.15s;
}

.home__tab:hover {
  border-color: var(--color-accent);
}

.home__tab-count {
  font-size: 13px;
  color: var(--color-muted);
}
</style>
