<template>
  <section class="hero">
    <div ref="heroSwiper" class="swiper hero__swiper">
      <div class="swiper-wrapper">
        <div v-for="(slide, index) in slides" :key="index" class="swiper-slide hero__slide">
          <div class="hero__inner">
            <div class="hero__content">
              <div class="hero__brand">
                <img :src="slide.logo" class="hero__logo" />
                <span class="hero__series">{{ slide.title }}</span>
              </div>

              <h1 class="hero__title">{{ slide.text }}</h1>

              <router-link to="/products" class="hero__cta"> Shop Now → </router-link>
            </div>

            <div class="hero__image-wrapper">
              <img :src="slide.image" :alt="slide.title" class="hero__image" />
            </div>
          </div>
        </div>
      </div>

      <div class="swiper-pagination"></div>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import Swiper from 'swiper'
import { Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import HeroFrame from '@/assets/images/HeroFrame.svg'

export default Vue.extend({
  name: 'HeroSection',

  data(): { swiperInstance: Swiper | null } {
    return {
      swiperInstance: null,
    }
  },

  computed: {
    slides() {
      return [
        {
          title: 'iPhone 14 Series',
          text: 'Up to 10% off Voucher',
          logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg',
          image: HeroFrame,
        },
        {
          title: 'iPhone 14 Series',
          text: 'Up to 10% off Voucher',
          logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg',
          image: 'https://images.unsplash.com/photo-1605236453806-6ff36851218e?w=800&q=80',
        },
        {
          title: 'Samsung Deals',
          text: 'Limited Time Offer',
          logo: 'https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg',
          image: 'https://images.unsplash.com/photo-1678685888221-cda773a3dcdb?w=800&q=80',
        },
        {
          title: 'OnePlus 6T',
          text: 'Speed Reimagined',
          logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg',
          image: 'https://images.unsplash.com/photo-1616348436168-de43ad0db179?w=800&q=80',
        },
      ]
    },
  },

  mounted() {
    this.$nextTick(() => {
      this.initSwiper()
    })
  },

  beforeDestroy() {
    this.swiperInstance?.destroy(true, true)
  },

  methods: {
    initSwiper(): void {
      const el = this.$refs.heroSwiper as HTMLElement | undefined
      if (!el) return

      this.swiperInstance = new Swiper(el, {
        modules: [Autoplay, Pagination],
        slidesPerView: 1,
        loop: true,
        speed: 800,

        autoplay: {
          delay: 3500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        },

        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
      })
    },
  },
})
</script>

<style scoped>
.hero {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 36px auto;
}

.hero__swiper {
  width: 100%;
  max-width: 1170px;
  background: #000;
  border-radius: 6px;
  overflow: hidden;
  position: relative;
}

.hero__slide {
  background: #000;
}

.hero__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 50px;
  height: 320px;
  color: #fff;
  gap: 40px;
}

.hero__content {
  max-width: 380px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.hero__brand {
  display: flex;
  align-items: center;
  gap: 10px;
}

.hero__logo {
  width: 22px;
  height: 22px;
  object-fit: contain;
  filter: invert(1);
}

.hero__series {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.85);
}

.hero__title {
  font-size: 40px;
  font-weight: 600;
  line-height: 1.15;
  margin: 12px 0;
}

.hero__cta {
  display: inline-flex;
  color: #fff;
  text-decoration: none;
  font-size: 14px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.6);
  padding-bottom: 3px;
  width: fit-content;
  transition: opacity 0.2s ease;
}

.hero__cta:hover {
  opacity: 0.65;
}

.hero__image-wrapper {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero__image {
  max-width: 100%;
  max-height: 280px;
  object-fit: contain;

  display: block;
  margin: auto;
}

:deep(.swiper-pagination) {
  position: absolute;
  bottom: 14px !important;
}

:deep(.swiper-pagination-bullet) {
  background: rgba(255, 255, 255, 0.4);
  width: 10px;
  height: 10px;
  opacity: 1;
}

:deep(.swiper-pagination-bullet-active) {
  background: #db4444;
}

.swiper-slide {
  transition:
    transform 0.8s ease,
    opacity 0.8s ease;
}

@media (max-width: 900px) {
  .hero__inner {
    flex-direction: column-reverse;
    height: auto;
    padding: 30px 20px 50px;
    text-align: center;
  }

  .hero__title {
    font-size: 28px;
  }

  .hero__image {
    max-width: 220px;
  }
}
</style>
