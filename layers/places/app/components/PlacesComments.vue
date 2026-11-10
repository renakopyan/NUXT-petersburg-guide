<script setup lang="ts">
import type { PlaceComment, PlaceCommentInput } from '@layers/places/app/types/place'

defineProps<{ comments: PlaceComment[] }>()
const emit = defineEmits<{ add: [comment: PlaceCommentInput] }>()

// Имя запоминаем на время сессии, чтобы не вводить его каждый раз.
const author = useState('comment-author', () => '')
const text = ref('')

const dateFormatter = new Intl.DateTimeFormat('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })
const formatDate = (iso: string) => dateFormatter.format(new Date(iso))

function onSubmit() {
  if (!author.value.trim() || !text.value.trim()) return
  emit('add', { author: author.value.trim(), text: text.value.trim() })
  text.value = ''
}
</script>

<template>
  <section class="comments" aria-labelledby="comments-title">
    <h2 id="comments-title" class="comments__title">
      Впечатления <span class="comments__count">{{ comments.length }}</span>
    </h2>

    <ul v-if="comments.length" class="comments__list">
      <li v-for="comment in comments" :key="comment.id" class="comment">
        <div class="comment__avatar" aria-hidden="true">{{ comment.author.charAt(0).toUpperCase() }}</div>
        <div class="comment__body">
          <div class="comment__meta">
            <span class="comment__author">{{ comment.author }}</span>
            <time :datetime="comment.createdAt" class="comment__date">{{ formatDate(comment.createdAt) }}</time>
          </div>
          <p class="comment__text">{{ comment.text }}</p>
        </div>
      </li>
    </ul>
    <p v-else class="comments__empty">Пока никто ничего не написал. Поделитесь впечатлением первым.</p>

    <form class="comments__form" @submit.prevent="onSubmit">
      <input v-model="author" class="comments__input" placeholder="Ваше имя" required maxlength="40">
      <textarea
        v-model="text"
        class="comments__input comments__textarea"
        rows="3"
        placeholder="Что заказали, что понравилось, с кем ходили…"
        required
        maxlength="1000"
      />
      <AppButton type="submit" class="comments__submit">Добавить</AppButton>
    </form>
  </section>
</template>

<style scoped>
.comments__title {
  display: flex;
  align-items: baseline;
  gap: 12px;
  margin-bottom: 24px;
  font-size: clamp(30px, 3.5vw, 40px);
}

.comments__count {
  font-family: var(--font-body);
  font-size: 14px;
  font-weight: 700;
  color: var(--color-accent);
}

.comments__list {
  display: flex;
  flex-direction: column;
  gap: 14px;
  list-style: none;
}

.comment {
  display: flex;
  gap: 14px;
  padding: 18px 20px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  background: var(--color-surface);
}

.comment__avatar {
  display: grid;
  place-items: center;
  flex: 0 0 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--color-accent-soft);
  color: var(--color-accent);
  font-family: var(--font-display);
  font-size: 20px;
  font-weight: 700;
}

.comment__meta {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 10px;
  margin-bottom: 4px;
}

.comment__author {
  font-weight: 700;
}

.comment__date {
  font-size: 12px;
  color: var(--color-muted);
}

.comment__text {
  white-space: pre-line;
}

.comments__empty {
  padding: 28px;
  border: 1px dashed var(--color-border-strong);
  border-radius: var(--radius);
  text-align: center;
  font-family: var(--font-display);
  font-size: 20px;
  font-style: italic;
  color: var(--color-muted);
}

.comments__form {
  display: grid;
  gap: 12px;
  margin-top: 24px;
  padding: 20px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  background: var(--color-surface);
}

.comments__input {
  width: 100%;
  max-width: 320px;
  padding: 10px 14px;
  border: 1px solid var(--color-border-strong);
  border-radius: var(--radius-sm);
  background: var(--color-bg);
}

.comments__textarea {
  max-width: none;
  resize: vertical;
}

.comments__input:focus {
  outline: none;
  border-color: var(--color-accent);
}

.comments__input::placeholder {
  color: var(--color-muted);
}

.comments__submit {
  justify-self: end;
}
</style>
