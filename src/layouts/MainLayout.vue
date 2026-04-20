<template>
  <div class="app-shell">
    <HeaderSection />

    <main class="app-main">
      <router-view />
    </main>

    <FooterSection />
  </div>
</template>

<script setup lang="ts">
import HeaderSection from '@/layouts/HeaderSection.vue'
import FooterSection from '@/layouts/FooterSection.vue'
</script>
