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

    <p v-if="loading && !products.length" class="flash-sales__state">Loading products...</p>

    <p v-else-if="!products.length" class="flash-sales__state">No products available.</p>

    <div v-else ref="flashSalesSwiper" class="swiper flash-sales__swiper">
      <div class="swiper-wrapper">
        <div v-for="product in products" :key="product.id" class="swiper-slide flash-sales__slide">
          <ProductCard :product="product">
            <template #discount-badge>
              <span class="product-card__discount">{{ product.discountPercentage }}%</span>
            </template>
          </ProductCard>
        </div>
      </div>
    </div>

    <div v-if="products.length" class="flash-sales__footer">
      <router-link to="/products" class="flash-sales__button">View All Products</router-link>
    </div>
    <div class="section-divider"></div>
  </section>
</template>

<script lang="ts">
import Swiper from 'swiper'
import 'swiper/css'
import type { Product } from '@/types'
import Vue from 'vue'
import TodayBadge from '@/components/shared/TodayBadge.vue'
import SectionHeader from '@/components/home/SectionHeader.vue'
import ProductCard from '@/components/shared/ProductCard.vue'

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
      return this.$store.getters['product/products']
    },
    loading(): boolean {
      return this.$store.state.product.loading
    },
  },
  created() {
    if (!this.products.length) {
      this.$store.dispatch('product/fetchProducts')
    }
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

<style lang="scss" scoped>
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

.flash-sales__state {
  margin: 20px;
  color: #6b7280;
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
.section-divider {
  width: 100%;
  max-width: 1170px;
  height: 1px;
  background: #e5e5e5;
  margin: 84px auto 0;
}
</style>
