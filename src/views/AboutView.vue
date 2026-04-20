<!-- <template>
  <section class="about">
    <BreadCrumbs
      :items="[{ label: 'Home', link: '/' }, { label: 'About' }]"
      class="about__breadcrumbs"
    />
    <AboutHeader />
    <StatsSection :items="stats" />
    <TeamCarousel />
    <FeaturesBar />
  </section>
</template>

<script lang="ts">
import AboutHeader from '@/components/about/AboutHeader.vue'
import StatsSection from '@/components/about/StatsSection.vue'
import TeamCarousel from '@/components/about/TeamCarousel.vue'
import BreadCrumbs from '@/components/shared/BreadCrumbs.vue'
import FeaturesBar from '@/components/shared/FeaturesBar.vue'

import Vue from 'vue'
export default Vue.extend({
  name: 'AboutView',
  components: {
    AboutHeader,
    FeaturesBar,
    StatsSection,
    TeamCarousel,
    BreadCrumbs,
  },
  data: function () {
    return {
      stats: [
        {
          icon: 'fas fa-store',
          value: '10.5k',
          label: 'Sellers active on site',
        },
        {
          icon: 'fas fa-dollar-sign',
          value: '33k',
          label: 'Monthly Product Sale',
          highlight: true,
        },
        {
          icon: 'fas fa-shopping-bag',
          value: '45.5k',
          label: 'Customer active on site',
        },
        {
          icon: 'fas fa-coins',
          value: '25k',
          label: 'Annual gross sale on our site',
        },
      ],
    }
  },
})
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
</style> -->
