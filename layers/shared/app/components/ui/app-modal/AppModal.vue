<script setup lang="ts">
defineProps<{ title: string }>()

const open = defineModel<boolean>({ required: true })
const titleId = useId()

function close() {
  open.value = false
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') close()
}

function toggleListeners(isOpen: boolean) {
  if (!import.meta.client) return
  document.body.style.overflow = isOpen ? 'hidden' : ''
  if (isOpen) window.addEventListener('keydown', onKeydown)
  else window.removeEventListener('keydown', onKeydown)
}

watch(open, toggleListeners)
onBeforeUnmount(() => toggleListeners(false))
</script>

<template>
  <Teleport to="#teleports">
    <Transition name="modal">
      <div v-if="open" class="modal" @click.self="close">
        <div
          class="modal__dialog"
          role="dialog"
          aria-modal="true"
          :aria-labelledby="titleId"
        >
          <header class="modal__header">
            <h2 :id="titleId" class="modal__title">{{ title }}</h2>
            <button
              type="button"
              class="modal__close"
              aria-label="Закрыть"
              @click="close"
            >
              ×
            </button>
          </header>

          <div class="modal__body">
            <slot />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal {
  position: fixed;
  inset: 0;
  z-index: 100;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 48px 16px;
  overflow-y: auto;
  background: var(--color-backdrop);
  backdrop-filter: blur(4px);
}

.modal__dialog {
  width: 100%;
  max-width: 580px;
  background: var(--color-surface);
  border: 1px solid var(--color-border-strong);
  border-radius: var(--radius);
  box-shadow: var(--shadow-hover);
}

.modal__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 22px 28px;
  border-bottom: 1px solid var(--color-border);
}

.modal__title {
  font-size: 30px;
  font-weight: 600;
  line-height: 1.1;
}

.modal__close {
  width: 36px;
  height: 36px;
  border: none;
  border-radius: var(--radius-sm);
  background: transparent;
  font-size: 26px;
  line-height: 1;
  color: var(--color-muted);
  cursor: pointer;
}

.modal__close:hover {
  background: var(--color-surface-raised);
  color: var(--color-text);
}

.modal__body {
  padding: 24px 28px 28px;
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s ease;
}

.modal-enter-active .modal__dialog,
.modal-leave-active .modal__dialog {
  transition: transform 0.2s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal__dialog,
.modal-leave-to .modal__dialog {
  transform: translateY(12px);
}
</style>
