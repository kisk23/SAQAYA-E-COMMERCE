<template>
  <div class="notfound">
    <div class="notfound__breadcrumbs">
      <Breadcrumbs :items="breadcrumbs" />
    </div>

    <div class="notfound__content">
      <h1 class="notfound__title">404 Not Found</h1>

      <p class="notfound__text">Your visited page not found. You may go home page.</p>

      <button class="notfound__button" @click="goHome">Back to home page</button>
    </div>
  </div>
</template>

<script lang="ts">
import Breadcrumbs from '@/components/shared/BreadCrumbs.vue'
import Vue from 'vue'
export default Vue.extend({
  name: 'NotFound',
  components: { Breadcrumbs },

  data() {
    return {
      breadcrumbs: [
        { label: 'Home', link: '/' },
        { label: '404 Error', link: '/404' },
      ],
    }
  },

  methods: {
    goHome() {
      this.$router.push('/')
    },
  },
})
</script>

<style lang="scss" scoped>
.notfound {
  padding: 40px 20px;
  max-width: 1100px;
  margin: auto;
  margin-bottom: 250px;
}

.notfound__breadcrumbs {
  margin-bottom: 80px;
}

.notfound__content {
  text-align: center;
}

.notfound__title {
  font-size: 72px;
  font-weight: 600;
  margin-bottom: 20px;
}

/* text */
.notfound__text {
  font-size: 14px;
  color: #666;
  margin-bottom: 30px;
}

.notfound__button {
  background: #e74c3c;
  color: #fff;
  border: none;
  padding: 12px 24px;
  border-radius: 4px;
  cursor: pointer;
}

.notfound__button:hover {
  opacity: 0.9;
}
</style>
