<script setup lang="ts">
import type { PlaceCategory } from '@layers/places/app/types/place'
import { PLACE_CATEGORIES } from '@layers/places/app/utils/placeCategories'

// Фото заведения или, если фото нет, «ночное небо» в цвете его категории.
const props = defineProps<{
  category: PlaceCategory
  src?: string
  alt?: string
}>()

const emoji = computed(() => PLACE_CATEGORIES.find((c) => c.value === props.category)?.emoji)
</script>

<template>
  <img v-if="src" :src="src" :alt="alt ?? ''" class="cover" loading="lazy">
  <div v-else class="cover cover--empty" :class="`cover--${category}`" aria-hidden="true">
    <span class="cover__emoji">{{ emoji }}</span>
  </div>
</template>

<style scoped>
.cover {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.cover--empty {
  display: grid;
  place-items: center;
  container-type: size;
}

.cover--coffee {
  background:
    radial-gradient(circle at 70% 25%, rgb(240 179 91 / 0.45), transparent 45%),
    linear-gradient(160deg, #2a1d14, #0f1424 70%);
}

.cover--restaurant {
  background:
    radial-gradient(circle at 30% 25%, rgb(226 106 106 / 0.4), transparent 45%),
    linear-gradient(160deg, #2b1220, #0f1424 70%);
}

.cover--bar {
  background:
    radial-gradient(circle at 65% 30%, rgb(150 120 255 / 0.45), transparent 45%),
    linear-gradient(160deg, #1b1640, #0b1020 70%);
}

.cover__emoji {
  font-size: clamp(28px, 22cqmin, 96px);
  filter: drop-shadow(0 8px 24px rgb(0 0 0 / 0.5));
}
</style>
