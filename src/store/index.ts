import Vue from 'vue'
import Vuex from 'vuex'
import type { RootState } from '@/types'
Vue.use(Vuex)
// using dumb json data for products, in a real app this would come from an API
//store Cart and User data here as well in a real app
const productsList = [
  {
    id: 1,
    name: 'HAVIT HV-G92 Gamepad',
    price: 120,
    oldPrice: 160,
    discount: '-40%',
    rating: 5,
    reviews: 88,
    image: require('@/assets/images/Product1.svg'),
    description:
      'Experience the ultimate gaming performance with the HAVIT HV-G92 Gamepad. Featuring ergonomic design, responsive controls, and customizable buttons, this gamepad is perfect for both casual and competitive gamers. Enjoy seamless connectivity and enhanced gameplay on your PC or console.',
  },
  {
    id: 2,
    name: 'HAVIT HV-G92 Gamepad',
    price: 110,
    oldPrice: 150,
    discount: '-27%',
    rating: 4,
    reviews: 65,
    image: require('@/assets/images/Product1.svg'),
    description:
      'Experience the ultimate gaming performance with the HAVIT HV-G92 Gamepad. Featuring ergonomic design, responsive controls, and customizable buttons, this gamepad is perfect for both casual and competitive gamers. Enjoy seamless connectivity and enhanced gameplay on your PC or console.',
  },
  {
    id: 3,
    name: 'HAVIT HV-G92 Gamepad',
    price: 130,
    oldPrice: 180,
    discount: '-28%',
    rating: 5,
    reviews: 102,
    image: require('@/assets/images/Product1.svg'),
    description:
      'Experience the ultimate gaming performance with the HAVIT HV-G92 Gamepad. Featuring ergonomic design, responsive controls, and customizable buttons, this gamepad is perfect for both casual and competitive gamers. Enjoy seamless connectivity and enhanced gameplay on your PC or console.',
  },
  {
    id: 4,
    name: 'HAVIT HV-G92 Gamepad',
    price: 95,
    oldPrice: 140,
    discount: '-32%',
    rating: 4,
    reviews: 47,
    image: require('@/assets/images/Product1.svg'),
    description:
      'Experience the ultimate gaming performance with the HAVIT HV-G92 Gamepad. Featuring ergonomic design, responsive controls, and customizable buttons, this gamepad is perfect for both casual and competitive gamers. Enjoy seamless connectivity and enhanced gameplay on your PC or console.',
  },
  {
    id: 5,
    name: 'HAVIT HV-G92 Gamepad',
    price: 140,
    oldPrice: 200,
    discount: '-30%',
    rating: 5,
    reviews: 120,
    image: require('@/assets/images/Product1.svg'),
    description:
      'Experience the ultimate gaming performance with the HAVIT HV-G92 Gamepad. Featuring ergonomic design, responsive controls, and customizable buttons, this gamepad is perfect for both casual and competitive gamers. Enjoy seamless connectivity and enhanced gameplay on your PC or console.',
  },
  {
    id: 6,
    name: 'HAVIT HV-G92 Gamepad',
    price: 125,
    oldPrice: 170,
    discount: '-26%',
    rating: 4,
    reviews: 73,
    image: require('@/assets/images/Product1.svg'),
    description:
      'Experience the ultimate gaming performance with the HAVIT HV-G92 Gamepad. Featuring ergonomic design, responsive controls, and customizable buttons, this gamepad is perfect for both casual and competitive gamers. Enjoy seamless connectivity and enhanced gameplay on your PC or console.',
  },
  {
    id: 7,
    name: 'HAVIT HV-G92 Gamepad',
    price: 100,
    oldPrice: 150,
    discount: '-33%',
    rating: 5,
    reviews: 91,
    image: require('@/assets/images/Product1.svg'),
    description:
      'Experience the ultimate gaming performance with the HAVIT HV-G92 Gamepad. Featuring ergonomic design, responsive controls, and customizable buttons, this gamepad is perfect for both casual and competitive gamers. Enjoy seamless connectivity and enhanced gameplay on your PC or console.',
  },
  {
    id: 8,
    name: 'HAVIT HV-G92 Gamepad',
    price: 115,
    oldPrice: 160,
    discount: '-28%',
    rating: 4,
    reviews: 58,
    image: require('@/assets/images/Product1.svg'),
    description:
      'Experience the ultimate gaming performance with the HAVIT HV-G92 Gamepad. Featuring ergonomic design, responsive controls, and customizable buttons, this gamepad is perfect for both casual and competitive gamers. Enjoy seamless connectivity and enhanced gameplay on your PC or console.',
  },
]
const cartList = [
  {
    id: 1,
    name: 'HAVIT HV-G92 Gamepad',
    price: 120,
    oldPrice: 160,
    discount: '-40%',
    rating: 5,
    reviews: 88,
    image: require('@/assets/images/Product1.svg'),
    description:
      'Experience the ultimate gaming performance with the HAVIT HV-G92 Gamepad. Featuring ergonomic design, responsive controls, and customizable buttons, this gamepad is perfect for both casual and competitive gamers. Enjoy seamless connectivity and enhanced gameplay on your PC or console.',
  },
  {
    id: 2,
    name: 'HAVIT HV-G92 Gamepad',
    price: 110,
    oldPrice: 150,
    discount: '-27%',
    rating: 4,
    reviews: 65,
    image: require('@/assets/images/Product1.svg'),
    description:
      'Experience the ultimate gaming performance with the HAVIT HV-G92 Gamepad. Featuring ergonomic design, responsive controls, and customizable buttons, this gamepad is perfect for both casual and competitive gamers. Enjoy seamless connectivity and enhanced gameplay on your PC or console.',
  },
]
export default new Vuex.Store<RootState>({
  state: {
    products: productsList,
    cart: cartList,
  },
  getters: {
    products: (state) => state.products,

    getProductById: (state) => (id: number) => {
      return state.products.find((p) => p.id === id)
    },
  },
})
