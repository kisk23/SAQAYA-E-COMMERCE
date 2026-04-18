import { mutations } from '@/store/modules/cart/mutations'
import { CartState } from '@/types/cart'
import { Product } from '@/types'

const mockStorage: Record<string, string> = {}
beforeAll(() => {
  jest.spyOn(Storage.prototype, 'setItem').mockImplementation((key, val) => {
    mockStorage[key] = val
  })
})
afterAll(() => jest.restoreAllMocks())

const makeProduct = (id: number): Product =>
  ({ id, title: `P${id}`, price: 50, thumbnail: 'img.jpg' }) as unknown as Product

const createState = (items: { id: number; qty: number }[] = []): CartState => ({
  cart: items.map(({ id, qty }) => ({ product: makeProduct(id), quantity: qty })),
})

describe('cart/mutations', () => {
  it('addToCart pushes a new item or increments existing', () => {
    const state = createState()

    mutations.addToCart(state, makeProduct(1))
    expect(state.cart).toHaveLength(1)
    expect(state.cart[0].quantity).toBe(1)

    mutations.addToCart(state, makeProduct(1))
    expect(state.cart).toHaveLength(1)
    expect(state.cart[0].quantity).toBe(2)
  })

  it('decreaseCartItem reduces quantity or removes item at 1', () => {
    const state = createState([{ id: 1, qty: 2 }])

    mutations.decreaseCartItem(state, 1)
    expect(state.cart[0].quantity).toBe(1)

    mutations.decreaseCartItem(state, 1)
    expect(state.cart).toHaveLength(0)
  })

  it('removeFromCart removes the item entirely', () => {
    const state = createState([
      { id: 1, qty: 3 },
      { id: 2, qty: 1 },
    ])

    mutations.removeFromCart(state, 1)

    expect(state.cart).toHaveLength(1)
    expect(state.cart[0].product.id).toBe(2)
  })
})
