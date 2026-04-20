<template>
  <div class="features">
    <div class="features__item">
      <div class="features__icon">
        <img src="@/assets/icons/truck.svg" alt="delivery" />
      </div>

      <h3 class="features__title">FREE AND FAST DELIVERY</h3>

      <p class="features__text">Free delivery for all orders over $140</p>
    </div>

    <div class="features__item">
      <div class="features__icon">
        <img src="@/assets/icons/support.svg" alt="support" />
      </div>

      <h3 class="features__title">24/7 CUSTOMER SERVICE</h3>

      <p class="features__text">Friendly 24/7 customer support</p>
    </div>

    <div class="features__item">
      <div class="features__icon">
        <img src="@/assets/icons/shield.svg" alt="guarantee" />
      </div>

      <h3 class="features__title">MONEY BACK GUARANTEE</h3>

      <p class="features__text">We return money within 30 days</p>
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>
.features {
  display: flex;
  justify-content: center;
  gap: 80px;
  padding: 40px 20px;
  margin-bottom: 30px;
}

.features__item {
  text-align: center;
  max-width: 220px;
}

.features__icon {
  width: 60px;
  height: 60px;
  margin: 0 auto 16px;
  border-radius: 50%;
  background: #c1c0c1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.features__icon img {
  width: 46px;
  height: 46px;
  object-fit: contain;
  background-color: black;
  border-radius: 50%;
  padding: 6px;
}

.features__title {
  font-size: 14px;
  font-weight: 700;
  margin-bottom: 6px;
}

.features__text {
  font-size: 12px;
  color: #666;
}

@media (max-width: 768px) {
  .features {
    gap: 40px;
    flex-wrap: wrap;
  }
}

@media (max-width: 480px) {
  .features {
    flex-direction: column;
    align-items: center;
    gap: 30px;
  }

  .features__item {
    max-width: 100%;
  }
}
</style>
