<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()

const isNotFound = computed(() => props.error.statusCode === 404)

const title = computed(() => (isNotFound.value ? 'Такого места нет' : 'Что-то пошло не так'))
const text = computed(() =>
  isNotFound.value
    ? 'Возможно, его удалили или в ссылке опечатка. Зато в списке есть другие проверенные места.'
    : 'На нашей стороне что-то сломалось. Обновите страницу или вернитесь на главную.',
)

useHead({ title })

const goHome = () => clearError({ redirect: '/' })
</script>

<template>
  <NuxtLayout>
    <div class="container error">
      <p class="error__code">{{ error.statusCode }}</p>
      <h1 class="error__title">{{ title }}</h1>
      <p class="error__text">{{ text }}</p>
      <AppButton @click="goHome">← На главную</AppButton>
    </div>
  </NuxtLayout>
</template>

<style scoped>
.error {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 80px 24px 40px;
  text-align: center;
}

.error__code {
  font-family: var(--font-display);
  font-size: clamp(120px, 22vw, 220px);
  font-style: italic;
  font-weight: 600;
  line-height: 0.85;
  color: var(--color-accent);
  text-shadow: 0 0 60px rgb(240 179 91 / 0.35);
}

.error__title {
  margin-top: 24px;
  font-size: clamp(36px, 5vw, 56px);
  line-height: 1;
}

.error__text {
  max-width: 460px;
  margin: 16px 0 32px;
  font-size: 17px;
  color: var(--color-muted);
}
</style>
