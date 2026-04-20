<template>
  <div class="load-more">
    <button class="load-more__btn" :disabled="loading" @click="$emit('click')">
      {{ loading ? 'Loading...' : 'Load more →' }}
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  loading?: boolean
}>()

defineEmits<{
  (e: 'click'): void
}>()
</script>

<style lang="scss" scoped>
.load-more {
  display: flex;
  justify-content: center;
  margin-top: 32px;
}

.load-more__btn {
  padding: 12px 40px;
  background: #db4444;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition:
    background-color 0.2s ease,
    transform 0.1s ease;
}

.load-more__btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
