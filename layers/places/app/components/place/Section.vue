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
        <span class="section__emoji" aria-hidden="true">{{ category.emoji }}</span>
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
  scroll-margin-top: 96px;
}

.section + .section {
  margin-top: 72px;
}

.section__header {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--color-border);
}

.section__title {
  display: flex;
  align-items: baseline;
  gap: 14px;
  font-size: clamp(34px, 4vw, 44px);
  line-height: 1;
}

.section__emoji {
  font-size: 0.7em;
}

.section__count {
  font-family: var(--font-body);
  font-size: 14px;
  font-weight: 700;
  color: var(--color-accent);
}

.section__filter {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 8px 16px;
  border: 1px solid var(--color-border-strong);
  border-radius: 999px;
  font-size: 14px;
  font-weight: 600;
  color: var(--color-muted);
  cursor: pointer;
  transition: color 0.2s, border-color 0.2s, background-color 0.2s;
}

.section__filter:hover {
  color: var(--color-text);
}

.section__filter:has(input:checked) {
  border-color: rgb(115 214 171 / 0.5);
  background: var(--color-work-soft);
  color: var(--color-work);
}

.section__filter input {
  width: 16px;
  height: 16px;
  accent-color: var(--color-work);
}

.section__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
}

.section__empty {
  padding: 48px 32px;
  border: 1px dashed var(--color-border-strong);
  border-radius: var(--radius);
  text-align: center;
  font-family: var(--font-display);
  font-size: 22px;
  font-style: italic;
  color: var(--color-muted);
}
</style>
