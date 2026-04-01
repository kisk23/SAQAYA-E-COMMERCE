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

<script>
export default {
  data() {
    return {}
  },
  computed: {
    products() {
      return this.$store.getters.products
    },
  },
}
</script>

<style scoped></style>
