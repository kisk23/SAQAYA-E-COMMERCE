<template>
  <div class="product-card">
    <div class="product-card__image">
      <span class="product-card__discount">{{ product.discountPercentage }}%</span>
      <img :src="product.thumbnail" :alt="`Product image: ${product.title}`" />

      <div class="product-card__actions">
        <button @click="$store.commit('addToCart', product)">Add to Cart</button>
      </div>
    </div>

    <div class="product-card__info">
      <p class="product-card__name">{{ product.title }}</p>

      <div class="product-card__prices">
        <span class="product-card__price">${{ product.price?.toFixed(2) }}</span>
        <span class="product-card__old">${{ product.oldPrice?.toFixed(2) }}</span>
      </div>
    </div>
    <div class="product-card__rating">
      <span class="stars">
        <span v-for="n in 5" :key="n">
          {{ n <= Math.round(averageRating) ? '★' : '☆' }}
        </span>
      </span>

      <span class="count">({{ product.reviews.length }})</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    product: Object,
  },

  computed: {
    averageRating() {
      const reviews = this.product.reviews || []

      if (!reviews.length) return 0

      const total = reviews.reduce((sum, r) => sum + r.rating, 0)
      return total / reviews.length
    },
  },
}
</script>

<style scoped>
.product-card {
  width: 100%;
  max-width: 280px;
  background: #fff;
  border-radius: 6px;
  overflow: hidden;
}

.product-card__image {
  position: relative;
  background: #f5f5f5;
  text-align: center;
}

.product-card__discount {
  position: absolute;
  top: 10px;
  left: 10px;
  background: #db4444;
  color: white;
  font-size: 12px;
  padding: 2px 6px;
}

.product-card__image img {
  max-width: 100%;
}

.product-card__name {
  font-size: 14px;
  margin: 10px 0;
}

.product-card__prices {
  display: flex;
  gap: 8px;
}

.product-card__price {
  color: red;
  font-weight: bold;
}

.product-card__old {
  text-decoration: line-through;
  color: gray;
}
.product-card__actions {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
}
.product-card__actions button {
  position: relative;
  width: 100%;
  padding: 10px;
  background: black;
  color: white;
  border: none;
  font-weight: 600;
  cursor: pointer;

  box-sizing: border-box;
  opacity: 0;
  transition: opacity 0.2s ease;
}
.product-card__image:hover .product-card__actions button {
  opacity: 1;
}
.product-card__rating {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 6px;
  font-size: 13px;
}

.stars {
  color: #f5a623;
}

.count {
  color: #888;
}
</style>
