<template>
  <div class="section-header">
    <h2 class="section-header__title">{{ title }}</h2>

    <div class="section-header__controls">
      <button class="section-header__btn" @click="emit('prev')">&larr;</button>
      <button class="section-header__btn" @click="emit('next')">&rarr;</button>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
}>()

const emit = defineEmits<{
  (event: 'prev'): void
  (event: 'next'): void
}>()
</script>

<style lang="scss" scoped>
.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.section-header__title {
  font-size: 24px;
  font-weight: bold;
}

.section-header__controls {
  display: flex;
  gap: 10px;
}

.section-header__btn {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
}
</style>
