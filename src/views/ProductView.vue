<template>
  <section>
    <h2>{{ product?.name }}</h2>
    <p>Price: {{ product?.price }}</p>
    <p>Description: {{ product?.description }}</p>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import type { Product } from '@/types'

export default Vue.extend({
  name: 'ProductView',
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  computed: {
    product(): Product | undefined {
      const id = Number(this.id)
      return this.$store.getters.getProductById(id)
    },
  },
})
</script>
