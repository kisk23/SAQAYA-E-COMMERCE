import { getters } from '@/store/modules/cart/getters'
import { CartState } from '@/types/cart'
import { Product, RootState } from '@/types'

const makeProduct = (id: number, price = 50): Product =>
  ({ id, title: `P${id}`, price, thumbnail: 'img.jpg' }) as unknown as Product

const createState = (items: { id: number; price?: number; qty: number }[] = []): CartState => ({
  cart: items.map(({ id, price, qty }) => ({ product: makeProduct(id, price), quantity: qty })),
})

const r = {} as RootState

describe('cart/getters', () => {
  it('cartItems normalizes cart entries with lineTotal', () => {
    const state = createState([{ id: 1, price: 100, qty: 2 }])

    const items = getters.cartItems(state, {}, r, {})

    expect(items).toEqual([expect.objectContaining({ id: 1, quantity: 2, lineTotal: 200 })])
  })

  it('totalItems sums all quantities', () => {
    const cartItems = [
      { id: 1, quantity: 2, lineTotal: 100 },
      { id: 2, quantity: 3, lineTotal: 150 },
    ]

    const result = getters.totalItems(createState(), { cartItems }, r, {})

    expect(result).toBe(5)
  })

  it('cartTotal sums all lineTotals', () => {
    const cartItems = [
      { id: 1, quantity: 2, lineTotal: 100 },
      { id: 2, quantity: 3, lineTotal: 150 },
    ]

    const result = getters.cartTotal(createState(), { cartItems }, r, {})

    expect(result).toBe(250)
  })
})
