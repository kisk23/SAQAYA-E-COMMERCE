<!-- <template>
  <section class="products">
    <BreadCrumbs :items="productsBreadcrumbs" />

    <ProductsHeader @change="handleSortChange" />

    <ProductsList :products="sortedProducts" />

    <div v-if="!sortedProducts.length && !loading" class="products__empty">
      No products available
    </div>

    <LoadMoreButton v-if="hasMore && !isCategoryMode" :loading="loading" @click="loadMore" />
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import ProductsHeader from '@/components/product/ProductHeader.vue'
import ProductsList from '@/components/product/ProductList.vue'
import LoadMoreButton from '@/components/product/LoadMore.vue'
import BreadCrumbs from '@/components/shared/BreadCrumbs.vue'
import type { Product } from '@/types'
import type { BreadcrumbItem } from '@/types/breadcrumb'

const SORT_OPTIONS = ['Highest Rating', 'Price: Low to High', 'Price: High to Low'] as const

type SortOption = (typeof SORT_OPTIONS)[number]

export default Vue.extend({
  name: 'ProductsView',

  components: {
    ProductsHeader,
    ProductsList,
    LoadMoreButton,
    BreadCrumbs,
  },

  data() {
    return {
      sortBy: 'Highest Rating' as SortOption,
    }
  },

  computed: {
    productsBreadcrumbs(): BreadcrumbItem[] {
      const homePath =
        typeof this.$route.query.homePath === 'string' ? this.$route.query.homePath : '/'
      const homeLabel =
        typeof this.$route.query.homeLabel === 'string' ? this.$route.query.homeLabel : 'Home'

      return [{ label: homeLabel, link: homePath }, { label: 'Products' }]
    },
    products(): Product[] {
      return this.$store.state.product.products as Product[]
    },
    activeCategory(): string | null {
      return this.$store.getters['product/activeCategory'] as string | null
    },
    selectedCategory(): string | null {
      return this.$store.getters['category/selectedCategory'] as string | null
    },
    isCategoryMode(): boolean {
      return Boolean(this.selectedCategory)
    },
    sortedProducts(): Product[] {
      const sorted = [...this.products]

      if (this.sortBy === 'Price: Low to High') {
        return sorted.sort((a, b) => a.price - b.price)
      }

      if (this.sortBy === 'Price: High to Low') {
        return sorted.sort((a, b) => b.price - a.price)
      }

      return sorted.sort((a, b) => b.rating - a.rating)
    },
    loading() {
      return this.$store.state.product.loading
    },
    hasMore() {
      return this.$store.state.product.hasMore
    },
  },

  created() {
    const querySort = this.$route.query.sort
    if (this.isSortOption(querySort)) {
      this.sortBy = querySort
    }

    this.syncProductsWithRoute(this.$route.query.category)
  },

  watch: {
    '$route.query.sort': {
      immediate: false,
      handler(value: unknown) {
        if (this.isSortOption(value)) {
          this.sortBy = value
        }
      },
    },
    '$route.query.category': {
      immediate: false,
      handler(value: unknown) {
        this.syncProductsWithRoute(value)
      },
    },
  },

  methods: {
    loadMore() {
      this.$store.dispatch('product/loadMore')
    },
    handleSortChange(option: string) {
      if (!this.isSortOption(option)) return

      this.sortBy = option
      this.$router
        .replace({
          query: {
            ...this.$route.query,
            sort: option,
          },
        })
        .catch(() => undefined)
    },
    isSortOption(value: unknown): value is SortOption {
      return typeof value === 'string' && (SORT_OPTIONS as readonly string[]).includes(value)
    },
    parseCategoryQuery(value: unknown): string {
      if (typeof value === 'string') return value.trim()
      if (Array.isArray(value) && typeof value[0] === 'string') return value[0].trim()
      return ''
    },
    async syncProductsWithRoute(rawCategory: unknown): Promise<void> {
      const category = this.parseCategoryQuery(rawCategory)

      if (category) {
        this.$store.dispatch('category/setSelectedCategory', category)

        if (this.activeCategory !== category || !this.products.length) {
          await this.$store.dispatch('product/fetchByCategory', category)
        }

        return
      }

      this.$store.dispatch('category/clearSelectedCategory')

      if (this.activeCategory !== null) {
        await this.$store.dispatch('product/prepareDefaultListing')
      }

      if (!this.products.length) {
        await this.$store.dispatch('product/fetchProducts')
      }
    },
  },
})
</script>

<style lang="scss" scoped>
.products {
  max-width: 1170px;
  margin: 40px auto;
  padding: 32px 24px;
  background: #fff;
}
.products__empty {
  text-align: center;
  margin: 40px 0;
  color: #6b7280;
}
@media (max-width: 768px) {
  .products {
    padding: 24px 16px;
    margin: 24px auto;
  }
}

@media (max-width: 480px) {
  .products {
    padding: 16px 12px;
    margin: 16px auto;
  }
}
</style> -->
