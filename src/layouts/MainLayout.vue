<template>
  <div class="app-shell">
    <HeaderSection />

    <main class="app-main">
      <router-view />
    </main>

    <FooterSection />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import HeaderSection from '@/layout/HeaderSection.vue'
import FooterSection from '@/layout/FooterSection.vue'

export default Vue.extend({
  name: 'MainLayout',
  components: { HeaderSection, FooterSection },
})
</script>
