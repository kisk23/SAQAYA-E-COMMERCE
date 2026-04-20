<template>
  <div class="today-badge">
    <span class="today-badge__indicator" aria-hidden="true"></span>
    <span class="today-badge__text">{{ label }}</span>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  label: string
}>()

</script>

<style lang="scss" scoped>
.today-badge {
  display: flex;
  align-items: center;
  gap: 8px;
}

.today-badge__indicator {
  width: 6px;
  height: 20px;
  background-color: #e53935;
  border-radius: 2px;
}

.today-badge__text {
  font-size: 14px;
  font-weight: 600;
  color: #e53935;
}
</style>
