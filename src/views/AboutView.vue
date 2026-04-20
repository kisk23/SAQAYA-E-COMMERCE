<template>
  <section class="about">
    <BreadCrumbs
      :items="[{ label: 'Home', link: '/' }, { label: 'About' , link: '/about' }]"
      class="about__breadcrumbs"
    />
    <AboutHeader />
    <StatsSection  />
    <TeamCarousel />
    <FeaturesBar />
  </section>
</template>

<script setup lang="ts">
import AboutHeader from '@/components/about/AboutHeader.vue'
import StatsSection from '@/components/about/StatsSection.vue'
import TeamCarousel from '@/components/about/TeamCarousel.vue'
import BreadCrumbs from '@/components/shared/BreadCrumbs.vue'
import FeaturesBar from '@/components/shared/FeaturesBar.vue'
</script>

<style lang="scss" scoped>
.about {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.about__breadcrumbs {
  margin: 40px;
}
</style>
