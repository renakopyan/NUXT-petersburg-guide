<template>
  <span class="tag"><slot /></span>
</template>

<style scoped>
.tag {
  display: inline-block;
  padding: 2px 10px;
  border-radius: 999px;
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  font-size: 12px;
  font-weight: 500;
  color: var(--color-muted);
}
</style>
