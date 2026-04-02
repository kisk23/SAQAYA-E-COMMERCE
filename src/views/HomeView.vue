<template>
  <section>
    <HeroSection />
    <FlashSales />
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import HeroSection from '@/components/HeroSection.vue'
import FlashSales from '@/components/FlashSales.vue'

export default Vue.extend({
  name: 'HomeView',
  components: {
    HeroSection,
    FlashSales,
  },
})
</script>
