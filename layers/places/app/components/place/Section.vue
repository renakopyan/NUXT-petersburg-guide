<script setup lang="ts">
import type { Place } from '@layers/places/app/types/place'
import type { PlaceCategoryMeta } from '@layers/places/app/utils/placeCategories'

const props = defineProps<{
  category: PlaceCategoryMeta
  places: Place[]
}>()

const onlyWorkFriendly = ref(false)
const canFilterByWork = computed(() => props.category.value === 'coffee')

const visiblePlaces = computed(() =>
  onlyWorkFriendly.value ? props.places.filter((place) => place.workFriendly) : props.places,
)
</script>

<template>
  <section :id="category.value" class="section">
    <header class="section__header">
      <h2 class="section__title">
        <span aria-hidden="true">{{ category.emoji }}</span>
        {{ category.title }}
        <span class="section__count">{{ visiblePlaces.length }}</span>
      </h2>

      <label v-if="canFilterByWork" class="section__filter">
        <input v-model="onlyWorkFriendly" type="checkbox">
        Только где можно поработать
      </label>
    </header>

    <div v-if="visiblePlaces.length" class="section__grid">
      <PlaceCard v-for="place in visiblePlaces" :key="place.id" :place="place" />
    </div>

    <p v-else class="section__empty">
      {{ onlyWorkFriendly ? 'Пока нет мест, где удобно работать.' : 'Здесь пока пусто — добавьте первое место.' }}
    </p>
  </section>
</template>

<style scoped>
.section {
  scroll-margin-top: 88px;
}

.section + .section {
  margin-top: 56px;
}

.section__header {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 20px;
}

.section__title {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 24px;
  font-weight: 700;
}

.section__count {
  padding: 0 10px;
  border-radius: 999px;
  background: var(--color-accent-soft);
  color: var(--color-accent);
  font-size: 14px;
  font-weight: 600;
  line-height: 26px;
}

.section__filter {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 500;
  color: var(--color-work);
  cursor: pointer;
}

.section__filter input {
  width: 16px;
  height: 16px;
  accent-color: var(--color-work);
}

.section__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 20px;
}

.section__empty {
  padding: 32px;
  border: 1px dashed var(--color-border);
  border-radius: var(--radius);
  text-align: center;
  color: var(--color-muted);
}
</style>
