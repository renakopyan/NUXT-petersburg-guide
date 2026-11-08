<script setup lang="ts">
withDefaults(
  defineProps<{
    variant?: 'primary' | 'ghost'
    type?: 'button' | 'submit' | 'reset'
  }>(),
  { variant: 'primary', type: 'button' },
)
</script>

<template>
  <button :type="type" class="button" :class="`button--${variant}`">
    <slot />
  </button>
</template>

<style scoped>
.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  height: 44px;
  padding: 0 20px;
  border: 1px solid transparent;
  border-radius: var(--radius-sm);
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.15s, border-color 0.15s;
}

.button:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
}

.button--primary {
  background: var(--color-accent);
  color: var(--color-on-accent);
}

.button--primary:hover {
  background: var(--color-accent-hover);
}

.button--ghost {
  background: transparent;
  border-color: var(--color-border);
}

.button--ghost:hover {
  background: var(--color-surface);
}
</style>
