<template>
  <section class="products">
    <h2>Products</h2>
    <ul class="products-list">
      <li v-for="product in products" :key="product.id">
        <h3>{{ product.name }}</h3>
        <p>Price: {{ product.price }}</p>
        <p>Description: {{ product.description }}</p>
      </li>
    </ul>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import type { Product } from '@/types'

export default Vue.extend({
  name: 'ProductsView',
  computed: {
    products(): Product[] {
      return this.$store.getters.products as Product[]
    },
  },
})
</script>

<style scoped></style>
