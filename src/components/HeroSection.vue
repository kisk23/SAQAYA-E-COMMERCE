<template>
  <section class="hero">
    <div class="hero__box">
      <div class="hero__inner">
        <div class="hero__content">
          <div class="hero__brand">
            <img src="@/assets/images/Apple_logo.svg" alt="Apple Logo" class="hero__logo" />
            <span class="hero__series">iPhone 14 Series</span>
          </div>

          <h1 class="hero__title">
            Up to 10%<br />
            off Voucher
          </h1>

          <a href="#" class="hero__cta"> Shop Now <span class="hero__arrow">→</span> </a>
        </div>

        <img src="@/assets/images/hero-frame.svg" alt="Hero Image" class="hero__image" />
      </div>
    </div>

    <div class="hero__outer">
      <div class="slider__controls">
        <div class="slider__dots">
          <span class="slider__dot"></span>
          <span class="slider__dot"></span>
          <span class="slider__dot slider__dot--active"></span>
          <span class="slider__dot"></span>
          <span class="slider__dot"></span>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'HeroSection',
})
</script>

<style scoped>
.hero {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 64px;
  flex-direction: column;
}

.hero__box {
  width: 100%;
  max-width: 1170px;
  height: 346px;
  background-color: black;
  display: flex;
  align-items: center;
  overflow: hidden;
}

.hero__inner {
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  color: white;
}

.hero__content {
  padding: 40px;
  flex-shrink: 0;
}

.hero__image {
  width: 100%;
  max-width: 496px;
  height: 100%;
  object-fit: cover;
  flex: 1 1 auto;
  margin-left: 24px;
}

.hero__brand {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  margin-bottom: 20px;
}

.hero__logo {
  font-size: 18px;
}

.hero__title {
  font-size: clamp(28px, 5vw, 48px);
  font-weight: bold;
  line-height: 1.2;
  margin-bottom: 20px;
}

.hero__cta {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: white;
  text-decoration: none;
  border-bottom: 1px solid white;
  padding-bottom: 4px;
}

.hero__outer {
  display: flex;
  justify-content: center;
  margin-top: -56px;
}

.slider__controls {
  display: flex;
  align-items: center;
  gap: 16px;
}

.slider__dots {
  display: flex;
  gap: 8px;
}

.slider__dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #bbb;
  display: inline-block;
}

.slider__dot--active {
  background: red;
}

@media (max-width: 768px) {
  .hero {
    margin-top: 120px;
  }

  .hero__box {
    height: auto;
  }

  .hero__inner {
    flex-direction: column;
    padding: 20px;
  }

  .hero__content {
    padding: 0 0 20px;
    width: 100%;
  }

  .hero__image {
    max-width: 100%;
    width: 100%;
    height: auto;
  }
}
</style>
