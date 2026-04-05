<template>
  <section class="flash-sales">
    <div class="flash-sales__header">
      <TodayBadge label="Today's" />
      <SectionHeader
        title="Flash Sales"
        @prev="swiperInstance?.slidePrev()"
        @next="swiperInstance?.slideNext()"
      />
    </div>

    <div ref="flashSalesSwiper" class="swiper flash-sales__swiper">
      <div class="swiper-wrapper">
        <div v-for="product in products" :key="product.id" class="swiper-slide flash-sales__slide">
          <ProductCard :product="product" />
        </div>
      </div>
    </div>

    <div class="flash-sales__footer">
      <router-link to="/products" class="flash-sales__button">View All Products</router-link>
    </div>
  </section>
</template>

<script lang="ts">
import Swiper from 'swiper'
import 'swiper/css'
import type { Product } from '@/types'
import Vue from 'vue'
import TodayBadge from './TodayBadge.vue'
import SectionHeader from './SectionHeader.vue'
import ProductCard from './ProductCard.vue'

export default Vue.extend({
  name: 'FlashSales',
  components: { TodayBadge, SectionHeader, ProductCard },
  data(): { swiperInstance: Swiper | null } {
    return {
      swiperInstance: null,
    }
  },
  computed: {
    products(): Product[] {
      console.log('Accessing products from store:', this.$store.state.products)
      return this.$store.getters.products as Product[]
    },
  },
  mounted() {
    this.initSwiper()
  },
  beforeDestroy() {
    this.swiperInstance?.destroy(true, true)
  },
  methods: {
    initSwiper(): void {
      const swiperElement = this.$refs.flashSalesSwiper as HTMLElement | undefined

      if (!swiperElement) return

      this.swiperInstance = new Swiper(swiperElement, {
        slidesPerView: 4,
        spaceBetween: 30,
        watchOverflow: true,
        breakpoints: {
          0: {
            slidesPerView: 1.2,
          },
          640: {
            slidesPerView: 2,
          },
          900: {
            slidesPerView: 3,
          },
          1200: {
            slidesPerView: 4,
          },
        },
      })
    },
  },
})
</script>

<style scoped>
.flash-sales {
  padding: 20px;
  max-width: 1170px;
  margin: auto;
  margin-top: 112px;
}

.flash-sales__header {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.flash-sales__swiper {
  margin: 20px 20px 40px;
}

.flash-sales__slide {
  height: auto;
}

.flash-sales__slide ::v-deep .product-card {
  width: 100%;
}

.flash-sales__footer {
  text-align: center;
}

.flash-sales__button {
  background: #db4444;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 4px;
  cursor: pointer;
  text-decoration: none;
}
</style>
