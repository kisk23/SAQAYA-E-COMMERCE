import { getters } from '@/store/modules/cart/getters'
import type { CartState } from '@/types/cart'
import type { Product } from '@/types'

const makeProduct = (id: number, price = 50): Product =>
  ({ id, title: `P${id}`, price, thumbnail: 'img.jpg' } as unknown as Product)

const createState = (items: { id: number; price?: number; qty: number }[] = []): CartState => ({
  cart: items.map(({ id, price, qty }) => ({ product: makeProduct(id, price), quantity: qty })),
})

describe('cart/getters', () => {
  it('cartItems normalizes cart entries with lineTotal', () => {
    const state = createState([{ id: 1, price: 100, qty: 2 }])

    const items = getters.cartItems(state)

    expect(items).toEqual([expect.objectContaining({ id: 1, quantity: 2, lineTotal: 200 })])
  })

  it('totalItems sums all quantities', () => {
    const state = createState([
      { id: 1, qty: 2 },
      { id: 2, qty: 3 },
    ])

    expect(getters.totalItems(state)).toBe(5)
  })

  it('cartTotal sums all line totals', () => {
    const state = createState([
      { id: 1, price: 50, qty: 2 },
      { id: 2, price: 30, qty: 3 },
    ])

    expect(getters.cartTotal(state)).toBe(190)
  })
})
