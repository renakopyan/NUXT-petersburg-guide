<script setup lang="ts">
import type { PlaceInput } from '@layers/places/app/types/place'
import { PLACE_CATEGORIES } from '@layers/places/app/utils/placeCategories'

// Одна форма и для создания, и (позже) для редактирования: передаём initial.
const props = withDefaults(
  defineProps<{
    initial?: PlaceInput
    submitLabel?: string
  }>(),
  { submitLabel: 'Сохранить' },
)

const emit = defineEmits<{
  submit: [place: PlaceInput]
  cancel: []
}>()

const form = reactive({
  category: props.initial?.category ?? 'coffee',
  name: props.initial?.name ?? '',
  description: props.initial?.description ?? '',
  address: props.initial?.address ?? '',
  photos: props.initial?.photos.join('\n') ?? '',
  tags: props.initial?.tags.join(', ') ?? '',
  isWorkFriendly: Boolean(props.initial?.workFriendly),
  work: {
    wifi: props.initial?.workFriendly?.wifi ?? true,
    sockets: props.initial?.workFriendly?.sockets ?? true,
    quiet: props.initial?.workFriendly?.quiet ?? false,
  },
})

const isCoffee = computed(() => form.category === 'coffee')

const splitList = (value: string, separator: RegExp) =>
  value.split(separator).map((item) => item.trim()).filter(Boolean)

function onSubmit() {
  emit('submit', {
    category: form.category,
    name: form.name.trim(),
    description: form.description.trim(),
    address: form.address.trim(),
    photos: splitList(form.photos, /\n/),
    tags: splitList(form.tags, /,/),
    workFriendly: isCoffee.value && form.isWorkFriendly ? { ...form.work } : undefined,
  })
}
</script>

<template>
  <form class="form" @submit.prevent="onSubmit">
    <fieldset class="form__field">
      <legend class="form__label">Тип заведения</legend>
      <div class="form__categories">
        <label
          v-for="category in PLACE_CATEGORIES"
          :key="category.value"
          class="form__category"
          :class="{ 'form__category--active': form.category === category.value }"
        >
          <input v-model="form.category" type="radio" :value="category.value" class="visually-hidden">
          {{ category.emoji }} {{ category.single }}
        </label>
      </div>
    </fieldset>

    <label class="form__field">
      <span class="form__label">Название *</span>
      <input v-model="form.name" class="form__input" required maxlength="80" placeholder="Например, «Кофейня у Фонтанки»">
    </label>

    <label class="form__field">
      <span class="form__label">Адрес</span>
      <input v-model="form.address" class="form__input" placeholder="Улица, дом">
    </label>

    <label class="form__field">
      <span class="form__label">Описание</span>
      <textarea v-model="form.description" class="form__input form__textarea" rows="3" placeholder="Что понравилось, что заказать" />
    </label>

    <label class="form__field">
      <span class="form__label">Фото</span>
      <textarea v-model="form.photos" class="form__input form__textarea" rows="2" placeholder="Ссылки на фото, каждая с новой строки" />
    </label>

    <label class="form__field">
      <span class="form__label">Теги</span>
      <input v-model="form.tags" class="form__input" placeholder="Через запятую: фильтр, десерты, веранда">
    </label>

    <div v-if="isCoffee" class="form__work">
      <label class="form__check form__check--main">
        <input v-model="form.isWorkFriendly" type="checkbox">
        💻 Можно посидеть поработать
      </label>

      <div v-if="form.isWorkFriendly" class="form__work-options">
        <label class="form__check"><input v-model="form.work.wifi" type="checkbox"> Wi‑Fi</label>
        <label class="form__check"><input v-model="form.work.sockets" type="checkbox"> Розетки</label>
        <label class="form__check"><input v-model="form.work.quiet" type="checkbox"> Тихо</label>
      </div>
    </div>

    <div class="form__actions">
      <AppButton variant="ghost" @click="emit('cancel')">Отмена</AppButton>
      <AppButton type="submit">{{ submitLabel }}</AppButton>
    </div>
  </form>
</template>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.form__field {
  display: flex;
  flex-direction: column;
  gap: 6px;
  border: none;
}

.form__label {
  font-size: 13px;
  font-weight: 600;
  color: var(--color-muted);
}

.form__input {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  background: var(--color-bg);
  transition: border-color 0.15s;
}

.form__input:focus {
  outline: none;
  border-color: var(--color-accent);
}

.form__input::placeholder {
  color: var(--color-muted);
  opacity: 0.7;
}

.form__textarea {
  resize: vertical;
}

.form__categories {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.form__category {
  padding: 8px 14px;
  border: 1px solid var(--color-border);
  border-radius: 999px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: border-color 0.15s, background-color 0.15s;
}

.form__category--active {
  border-color: var(--color-accent);
  background: var(--color-accent-soft);
  color: var(--color-accent);
}

.form__category:has(input:focus-visible) {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
}

.form__work {
  padding: 14px 16px;
  border-radius: var(--radius-sm);
  background: var(--color-work-soft);
}

.form__work-options {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-top: 10px;
  padding-left: 26px;
}

.form__check {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  cursor: pointer;
}

.form__check--main {
  font-weight: 600;
  color: var(--color-work);
}

.form__check input {
  width: 16px;
  height: 16px;
  accent-color: var(--color-work);
}

.form__actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 4px;
}

.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
}
</style>
