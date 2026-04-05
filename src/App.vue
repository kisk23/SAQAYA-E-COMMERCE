<template>
  <router-view />
</template>

<script lang="ts">
import Vue from 'vue'

//This object is a Vue component—apply Vue (typings) here. thats why we use Vue.extend() instead of export default { ... }
export default Vue.extend({
  name: 'App',
  computed: {},
  methods: {},
  components: {},
  created() {
    // Load products when the app is created
    this.$store.dispatch('fetchProducts')
  },
})
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: system-ui, sans-serif;

  line-height: 1.5;

  background: #fff !important;
  color: #000 !important;
}
html {
  color-scheme: light;
}
</style>
