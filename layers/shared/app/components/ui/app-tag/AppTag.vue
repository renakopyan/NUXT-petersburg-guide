<template>
  <span class="tag"><slot /></span>
</template>

<style scoped>
.tag {
  display: inline-block;
  padding: 3px 10px;
  border-radius: 999px;
  background: var(--glass);
  border: 1px solid var(--color-border-strong);
  backdrop-filter: blur(6px);
  font-size: 12px;
  font-weight: 600;
  color: var(--color-text);
}
</style>
