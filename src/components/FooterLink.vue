<template>
  <li>
    <a :href="link" class="footer__link">{{ label }}</a>
  </li>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'FooterLink',
  props: {
    label: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
  },
})
</script>

<style scoped>
.footer__link {
  display: block;
  color: #ccc;
  font-size: 14px;
  margin-bottom: 8px;
  text-decoration: none;
}
</style>
