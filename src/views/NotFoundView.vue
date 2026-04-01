<template>
  <section class="not-found">
    <h1>404</h1>
    <p>Page not found.</p>
    <router-link to="/">Go back home</router-link>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'NotFoundView',
})
</script>

<style scoped>
.not-found {
  min-height: 50vh;
  display: grid;
  align-content: center;
  justify-items: center;
  gap: 12px;
  text-align: center;
}

h1 {
  margin: 0;
  font-size: 72px;
}

p {
  margin: 0;
}
</style>
