<template>
  <nav class="breadcrumbs">
    <span v-for="(item, index) in items" :key="index" class="breadcrumbs__item">
      <span v-if="index !== items.length - 1">
        <a :href="item.link" class="breadcrumbs__link">
          {{ item.label }}
        </a>
        <span class="breadcrumbs__separator">/</span>
      </span>

      <span v-else class="breadcrumbs__current">
        {{ item.label }}
      </span>
    </span>
  </nav>
</template>

<script setup lang="ts">

import type { BreadcrumbItem } from '@/types/breadcrumb'

defineProps<{
  items: BreadcrumbItem[]
}>()

 

</script>

<style lang="scss" scoped>
.breadcrumbs {
  font-size: 12px;
  color: #777;
  margin-bottom: 20px;
}

.breadcrumbs__item {
  display: inline;
}

.breadcrumbs__link {
  text-decoration: none;
  color: #777;
}

.breadcrumbs__link:hover {
  text-decoration: underline;
}

.breadcrumbs__separator {
  margin: 0 6px;
}

.breadcrumbs__current {
  color: #000;
}
</style>
