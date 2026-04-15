<template>
  <section class="explore-products">
    <div class="explore-products__header">
      <TodayBadge label="Our Products" />
      <SectionHeader
        title="Explore Products"
        @prev="swiperInstance?.slidePrev()"
        @next="swiperInstance?.slideNext()"
      />
    </div>

    <p v-if="loading && !products.length" class="explore-products__state">Loading products...</p>

    <p v-else-if="!products.length" class="explore-products__state">No products available.</p>

    <div v-else ref="exploreProductsSwiper" class="swiper explore-products__swiper">
      <div class="swiper-wrapper">
        <div
          v-for="product in products"
          :key="product.id"
          class="swiper-slide explore-products__slide"
        >
          <ProductCard :product="product" />
        </div>
      </div>
    </div>

    <div v-if="products.length" class="explore-products__footer">
      <router-link to="/products" class="explore-products__button">View All Products</router-link>
    </div>
    <div class="section-divider"></div>
  </section>
</template>

<script lang="ts">
import Swiper from 'swiper'
import { Grid } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/grid'
import type { Product } from '@/types'
import Vue from 'vue'
import TodayBadge from '@/components/shared/TodayBadge.vue'
import SectionHeader from '@/components/home/SectionHeader.vue'
import ProductCard from '@/components/shared/ProductCard.vue'

export default Vue.extend({
  name: 'ExploreProducts',
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
      const swiperElement = this.$refs.exploreProductsSwiper as HTMLElement | undefined

      if (!swiperElement) return

      this.swiperInstance = new Swiper(swiperElement, {
        modules: [Grid],
        slidesPerView: 4,
        spaceBetween: 30,
        watchOverflow: true,
        grid: {
          rows: 2,
          fill: 'row',
        },
        breakpoints: {
          0: {
            slidesPerView: 1.2,
            spaceBetween: 16,
            grid: {
              rows: 2,
              fill: 'row',
            },
          },
          640: {
            slidesPerView: 2,
            grid: {
              rows: 2,
              fill: 'row',
            },
          },
          900: {
            slidesPerView: 3,
            grid: {
              rows: 2,
              fill: 'row',
            },
          },
          1200: {
            slidesPerView: 4,
            grid: {
              rows: 2,
              fill: 'row',
            },
          },
        },
      })
    },
  },
})
</script>

<style scoped>
.explore-products {
  padding: 20px;
  max-width: 1170px;
  margin: auto;
  margin-top: 112px;
}

.explore-products__header {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.explore-products__swiper {
  margin: 20px 20px 40px;
}

.explore-products__state {
  margin: 20px;
  color: #6b7280;
}

.explore-products__slide {
  height: auto;
}

.explore-products__slide ::v-deep .product-card {
  width: 100%;
}

.explore-products__footer {
  text-align: center;
  margin-top: 84px;
}

.explore-products__button {
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
