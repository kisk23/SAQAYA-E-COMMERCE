<template>
  <section>
    <h2>Home</h2>

    <HeroSection />
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import HeroSection from '@/components/HeroSection.vue'

export default Vue.extend({
  name: 'HomeView',
  components: {
    HeroSection,
  },
})
</script>
