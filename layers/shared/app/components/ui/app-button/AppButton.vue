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
  height: 48px;
  padding: 0 26px;
  border: 1px solid transparent;
  border-radius: 999px;
  font-size: 15px;
  font-weight: 700;
  letter-spacing: 0.01em;
  cursor: pointer;
  transition: background-color 0.2s, border-color 0.2s, box-shadow 0.2s, transform 0.2s;
}

.button:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 3px;
}

.button--primary {
  background: var(--color-accent);
  color: var(--color-on-accent);
  box-shadow: 0 8px 28px rgb(240 179 91 / 0.25);
}

.button--primary:hover {
  background: var(--color-accent-hover);
  box-shadow: 0 10px 36px rgb(240 179 91 / 0.35);
  transform: translateY(-1px);
}

.button--ghost {
  background: transparent;
  border-color: var(--color-border-strong);
}

.button--ghost:hover {
  background: var(--color-surface-raised);
}
</style>
