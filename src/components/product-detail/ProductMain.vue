<template>
  <div class="product-gallery">
    <div class="product-gallery__thumbnails">
      <button
        v-for="(image, index) in product.images"
        :key="image"
        class="product-gallery__thumbnail"
        :class="{ 'product-gallery__thumbnail--active': activeIndex === index }"
        @click="setActive(index)"
        @mouseenter="setActive(index)"
        :aria-label="`View image ${index + 1}`"
      >
        <img
          :src="image"
          :alt="`${product.title} - view ${index + 1}`"
          class="product-gallery__thumbnail-img"
        />
        <span class="product-gallery__thumbnail-overlay"></span>
      </button>
    </div>

    <div class="product-gallery__main" @mousemove="onMouseMove" @mouseleave="onMouseLeave">
      <div
        class="product-gallery__zoom-lens"
        :class="{ 'product-gallery__zoom-lens--visible': zooming }"
        :style="lensStyle"
      ></div>

      <div class="product-gallery__badge" v-if="product.availabilityStatus === 'Low Stock'">
        <span class="product-gallery__badge-text">Low Stock</span>
      </div>

      <transition name="product-gallery__fade" mode="out-in">
        <img
          :key="activeIndex"
          :src="product.images[activeIndex]"
          :alt="product.title"
          class="product-gallery__main-img"
        />
      </transition>

      <div class="product-gallery__dots">
        <button
          v-for="(_, i) in product.images"
          :key="i"
          class="product-gallery__dot"
          :class="{ 'product-gallery__dot--active': activeIndex === i }"
          @click="setActive(i)"
        ></button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import type { Product } from '@/types'

export default Vue.extend({
  name: 'ProductMain',

  props: {
    product: {
      type: Object as () => Product,
      required: true,
    },
  },

  data() {
    return {
      activeIndex: 0,
      zooming: false,
      lensStyle: {} as Record<string, string>,
    }
  },

  methods: {
    setActive(index: number) {
      this.activeIndex = index
    },

    onMouseMove(event: MouseEvent) {
      const container = event.currentTarget as HTMLElement
      const rect = container.getBoundingClientRect()

      const x = ((event.clientX - rect.left) / rect.width) * 100
      const y = ((event.clientY - rect.top) / rect.height) * 100

      this.zooming = true
      this.lensStyle = {
        left: `${event.clientX - rect.left - 30}px`,
        top: `${event.clientY - rect.top - 30}px`,
        backgroundPosition: `${x}% ${y}%`,
        backgroundImage: `url(${this.product.images[this.activeIndex]})`,
      }
    },

    onMouseLeave() {
      this.zooming = false
    },
  },
})
</script>

<style scoped>
.product-gallery {
  display: flex;
  gap: 16px;
  width: 100%;
  max-width: 600px;
  font-family: 'DM Sans', sans-serif;
}

.product-gallery__thumbnails {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 88px;
}

.product-gallery__thumbnail {
  width: 88px;
  height: 88px;
  border-radius: 12px;
  border: 2px solid transparent;
  background: #f5f5f7;
  overflow: hidden;
  cursor: pointer;
  padding: 0;
}

.product-gallery__thumbnail--active {
  border-color: #1a1a2e;
}

.product-gallery__thumbnail-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.product-gallery__main {
  flex: 1;
  position: relative;
  border-radius: var(--radius-lg);
  background: var(--color-bg);
  overflow: hidden;
  min-height: 380px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: crosshair;
  box-shadow: var(--shadow-lg);
}

.product-gallery__main-img {
  width: 90%;
  height: 90%;
  object-fit: contain;
}

.product-gallery__zoom-lens {
  position: absolute;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 2px solid rgba(201, 169, 110, 0.7);
  background-repeat: no-repeat;
  background-size: 300%;
  pointer-events: none;
  opacity: 0;
}

.product-gallery__zoom-lens--visible {
  opacity: 1;
}

.product-gallery__badge {
  position: absolute;
  top: 14px;
  left: 14px;
  background: #1a1a2e;
  border-radius: 6px;
  padding: 4px 10px;
}

.product-gallery__badge-text {
  font-size: 10px;
  color: #c9a96e;
}

.product-gallery__dots {
  position: absolute;
  bottom: 14px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 6px;
}

.product-gallery__dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  border: none;
  background: rgba(0, 0, 0, 0.3);
  cursor: pointer;
}

.product-gallery__dot--active {
  background: #000;
  width: 18px;
  border-radius: 3px;
}

.product-gallery__fade-enter-active,
.product-gallery__fade-leave-active {
  transition: opacity 0.2s ease;
}

.product-gallery__fade-enter,
.product-gallery__fade-leave-to {
  opacity: 0;
}

@media (max-width: 480px) {
  .product-gallery {
    flex-direction: column-reverse;
  }

  .product-gallery__thumbnails {
    flex-direction: row;
    width: 100%;
    justify-content: center;
  }

  .product-gallery__thumbnail {
    width: 64px;
    height: 64px;
  }

  .product-gallery__main {
    min-height: 280px;
  }
}
</style>
