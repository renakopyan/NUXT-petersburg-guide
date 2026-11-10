<script setup lang="ts">
import type { Place, PlaceInput } from '@layers/places/app/types/place'

const open = defineModel<boolean>({ required: true })
const emit = defineEmits<{ created: [place: Place] }>()

const { addPlace } = usePlaces()

function onSubmit(input: PlaceInput) {
  const place = addPlace(input)
  open.value = false
  emit('created', place)
}
</script>

<template>
  <AppModal v-model="open" title="Новое заведение">
    <PlaceForm submit-label="Добавить" @submit="onSubmit" @cancel="open = false" />
  </AppModal>
</template>
