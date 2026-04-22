<template>
  <div class="features">
    <div
      v-for="item in stats"
      :key="item.title"
      class="features__item"
      :class="{ 'features__item--highlight': item.highlight }"
    >
      <div class="features__icon">
        <img :src="item.icon" :alt="item.title" />
      </div>

      <h3 class="features__value">{{ item.value }}</h3>
      <p class="features__text">{{ item.title }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import storeIcon from '@/assets/icons/store.svg'
import dollarIcon from '@/assets/icons/dollar.svg'
import bagIcon from '@/assets/icons/bag.svg'
import moneyIcon from '@/assets/icons/money.svg'
const stats = [
  {
    value: '10.5k',
    title: 'Sellers active on site',
    icon: storeIcon,
  },
  {
    value: '33k',
    title: 'Monthly Product Sale',
    icon: dollarIcon,
    highlight: true,
  },
  {
    value: '45.5k',
    title: 'Customers active on site',
    icon: bagIcon,
  },
  {
    value: '25k',
    title: 'Annual gross sale on site',
    icon: moneyIcon,
  },
]
</script>

<style lang="scss" scoped>
.features {
  display: flex;
  justify-content: center;
  gap: 20px;
  padding: 40px 20px;
  max-width: 1170;
}

.features__item {
  text-align: center;
  width: 270px;
  border: 1px solid #e5e7eb;
  padding: 20px;
  border-radius: 6px;
  transition: all 0.2s ease;
}

.features__item--highlight {
  background: #e74c3c;
  color: white;
}

.features__icon {
  width: 60px;
  height: 60px;
  margin: 0 auto 12px;
  border-radius: 50%;
  background: #555555;
  display: flex;
  align-items: center;
  justify-content: center;
}

.features__icon img {
  width: 45px;
  height: 45px;
  background-color: black;
  border-radius: 50%;
  padding: 8px;
}

.features__item--highlight .features__icon {
  background: white;
}
.features__value {
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 6px;
}

.features__text {
  font-size: 12px;
  color: #666;
}

.features__item--highlight .features__text {
  color: white;
}
.features__item--highlight img {
  background-color: white;
}
.features__item:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.08);
}
@media (max-width: 768px) {
  .features {
    flex-wrap: wrap;
  }
}
</style>
