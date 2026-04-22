<template>
  <li>
    <a :href="link" class="footer__link">{{ label }}</a>
  </li>
</template>

<script setup lang="ts">
defineProps<{
  label: string
  link: string
}>()
</script>

<style lang="scss" scoped>
.footer__link {
  display: block;
  color: #ccc;
  font-size: 14px;
  margin-bottom: 8px;
  text-decoration: none;
}
</style>
