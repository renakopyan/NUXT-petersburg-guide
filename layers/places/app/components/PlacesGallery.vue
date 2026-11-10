<script setup lang="ts">
import type { PlaceCategory } from '@layers/places/app/types/place'

const props = defineProps<{
  photos: string[]
  category: PlaceCategory
  alt: string
}>()

const activeIndex = ref(0)
const active = computed(() => props.photos[activeIndex.value])

// После редактирования фото может стать меньше — не выходим за границы.
watch(() => props.photos.length, (length) => {
  if (activeIndex.value >= length) activeIndex.value = 0
})
</script>

<template>
  <div class="gallery">
    <div class="gallery__main">
      <PlaceCover :category="category" :src="active" :alt="alt" />
    </div>

    <div v-if="photos.length > 1" class="gallery__thumbs">
      <button
        v-for="(photo, index) in photos"
        :key="photo"
        type="button"
        class="gallery__thumb"
        :class="{ 'gallery__thumb--active': index === activeIndex }"
        :aria-label="`Фото ${index + 1}`"
        @click="activeIndex = index"
      >
        <img :src="photo" alt="" loading="lazy">
      </button>
    </div>
  </div>
</template>

<style scoped>
.gallery {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.gallery__main {
  aspect-ratio: 4 / 3;
  overflow: hidden;
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
}

.gallery__thumbs {
  display: flex;
  gap: 10px;
  overflow-x: auto;
  padding-bottom: 4px;
}

.gallery__thumb {
  flex: 0 0 88px;
  height: 66px;
  overflow: hidden;
  border: 2px solid transparent;
  border-radius: var(--radius-sm);
  background: none;
  opacity: 0.6;
  cursor: pointer;
  transition: opacity 0.2s, border-color 0.2s;
}

.gallery__thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.gallery__thumb:hover {
  opacity: 1;
}

.gallery__thumb--active {
  border-color: var(--color-accent);
  opacity: 1;
}
</style>
