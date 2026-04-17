<template>
  <section class="about">
    <div class="about__container">
      <div class="about__content">
        <h2 class="about__title">Our Story</h2>

        <p>
          Launced in 2015, Exclusive is South Asia’s premier online shopping makterplace with an
          active presense in Bangladesh. Supported by wide range of tailored marketing, data and
          service solutions, Exclusive has 10,500 sallers and 300 brands and serves 3 millioons
          customers across the region.
        </p>
      </div>

      <div class="about__image-wrapper">
        <img src="@/assets/images/about.svg" alt="about" class="about__image" />
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'AboutHeader',
})
</script>

<style lang="scss" scoped>
.about {
  padding: 60px 20px;
}

.about__container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 40px;
}

.about__content {
  flex: 1;
}

.about__title {
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 20px;
}

.about__text {
  font-size: 14px;
  line-height: 1.6;
  color: #555;
  margin-bottom: 15px;
}

.about__image-wrapper {
  flex: 1;
}

.about__image {
  width: 100%;
  border-radius: 6px;
  object-fit: cover;
}

@media (max-width: 768px) {
  .about__container {
    flex-direction: column;
  }

  .about__image-wrapper {
    order: -1;
  }
}
</style>
