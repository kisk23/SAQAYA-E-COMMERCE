<template>
  <div class="product-card">
    <div class="product-card__image">
      <span class="product-card__discount">{{ product.discount }}</span>
      <img src="@/assets/images/Product1.svg" alt=" Product image" />
    </div>

    <div class="product-card__info">
      <p class="product-card__name">{{ product.name }}</p>

      <div class="product-card__prices">
        <span class="product-card__price">${{ product.price }}</span>
        <span class="product-card__old">${{ product.oldPrice }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    product: Object,
  },
}
</script>

<style scoped>
.product-card {
  width: 180px;
}

.product-card__image {
  position: relative;
  background: #f5f5f5;
  padding: 20px;
  text-align: center;
}

.product-card__discount {
  position: absolute;
  top: 10px;
  left: 10px;
  background: red;
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
</style>
