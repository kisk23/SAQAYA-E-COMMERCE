<template>
  <div class="section-header">
    <h2 class="section-header__title">{{ title }}</h2>

    <div class="section-header__controls">
      <button @click="$emit('prev')" class="section-header__btn">←</button>
      <button @click="$emit('next')" class="section-header__btn">→</button>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    title: String,
  },
}
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
