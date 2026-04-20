<template>
  <section class="team">
    <div class="team__container">
      <div ref="teamSwiper" class="swiper team__swiper">
        <div class="swiper-wrapper">
          <div v-for="member in members" :key="member.id" class="swiper-slide team__slide">
            <div class="team__card">
              <div class="team__image">
                <img :src="member.image" :alt="member.name" />
              </div>

              <h3 class="team__name">{{ member.name }}</h3>
              <p class="team__role">{{ member.role }}</p>

              <div class="team__socials">
                <i class="team__icon fab fa-twitter"></i>
                <i class="team__icon fab fa-instagram"></i>
                <i class="team__icon fab fa-linkedin-in"></i>
              </div>
            </div>
          </div>
        </div>

        <div class="team__pagination"></div>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
import Swiper from 'swiper'
import { Pagination } from 'swiper/modules'
import { onBeforeUnmount, onMounted, ref } from 'vue'

import 'swiper/css'
import 'swiper/css/pagination'

import type { Member } from '@/types'

const teamSwiper = ref<HTMLElement | null>(null)
let swiperInstance: Swiper | null = null

const members: Member[] = [
  {
    id: 1,
    name: 'Tom Cruise',
    role: 'Founder & Chairman',
    image: require('@/assets/images/team1.png'),
  },
  {
    id: 2,
    name: 'Emma Watson',
    role: 'Managing Director',
    image: require('@/assets/images/team2.png'),
  },
  {
    id: 3,
    name: 'Will Smith',
    role: 'Product Designer',
    image: require('@/assets/images/team3.png'),
  },
  {
    id: 4,
    name: 'Will Smith',
    role: 'Product Designer',
    image: require('@/assets/images/team3.png'),
  },
  {
    id: 5,
    name: 'Will Smith',
    role: 'Product Designer',
    image: require('@/assets/images/team3.png'),
  },
]

onMounted(() => {
  const el = teamSwiper.value
  if (!el) return

  swiperInstance = new Swiper(el, {
    modules: [Pagination],
    slidesPerView: 3,
    spaceBetween: 24,
    loop: true,
    centeredSlides: false,
    pagination: {
      el: '.team__pagination',
      clickable: true,
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      640: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 3,
      },
    },
  })
})

onBeforeUnmount(() => {
  swiperInstance?.destroy(true, true)
})
</script>

<style lang="scss" scoped>
.team {
  padding: 40px 20px;
  background: #ffffff;
}

.team__container {
  max-width: 1170px;
  margin: 0 auto;
}

.team__swiper {
  padding-bottom: 30px;
}

.team__slide {
  display: flex;
  justify-content: center;
}

.team__card {
  text-align: center;
  padding: 20px;
}

.team__image {
  width: 300px;
  height: 300px;
  background: #eaeaea;
  border-radius: 6px;
  overflow: hidden;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.team__image img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.team__name {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 4px;
}

.team__role {
  font-size: 12px;
  color: #777;
  margin-bottom: 10px;
}

.team__socials {
  display: flex;
  justify-content: center;
  gap: 12px;
}

.team__icon {
  font-size: 14px;
  color: #333;
  cursor: pointer;
  transition: 0.2s;
}

.team__icon:hover {
  color: #db4444;
}

.team__pagination {
  text-align: center;
  margin-top: 10px;
}

.team__pagination ::v-deep .swiper-pagination-bullet-active {
  background: #db4444;
}
</style>
