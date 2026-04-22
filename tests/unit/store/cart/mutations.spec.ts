jest.mock('@/store/modules/cart/cartStorage', () => ({
  loadCart: jest.fn(() => []),
  saveCart: jest.fn(),
}))

import { actions } from '@/store/modules/cart/actions'
import { saveCart } from '@/store/modules/cart/cartStorage'
import type { Product } from '@/types'
import type { CartItem } from '@/types/cart'

const mockedSaveCart = saveCart as jest.MockedFunction<typeof saveCart>

const makeProduct = (id: number): Product =>
  ({ id, title: `P${id}`, price: 50, thumbnail: 'img.jpg' } as unknown as Product)

type CartActionCtx = {
  cart: CartItem[]
}

const createContext = (items: { id: number; qty: number }[] = []): CartActionCtx => ({
  cart: items.map(({ id, qty }) => ({ product: makeProduct(id), quantity: qty })),
})

describe('cart/actions', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('addToCart pushes a new item or increments existing', () => {
    const ctx = createContext()

    actions.addToCart.call(ctx, makeProduct(1))
    expect(ctx.cart).toHaveLength(1)
    expect(ctx.cart[0].quantity).toBe(1)

    actions.addToCart.call(ctx, makeProduct(1))
    expect(ctx.cart).toHaveLength(1)
    expect(ctx.cart[0].quantity).toBe(2)
    expect(mockedSaveCart).toHaveBeenCalledTimes(2)
  })

  it('incrementCartItem increases quantity for matching id', () => {
    const ctx = createContext([{ id: 1, qty: 2 }])

    actions.incrementCartItem.call(ctx, 1)

    expect(ctx.cart[0].quantity).toBe(3)
    expect(mockedSaveCart).toHaveBeenCalledWith(ctx.cart)
  })

  it('decreaseCartItem reduces quantity or removes item at 1', () => {
    const ctx = createContext([{ id: 1, qty: 2 }])

    actions.decreaseCartItem.call(ctx, 1)
    expect(ctx.cart[0].quantity).toBe(1)

    actions.decreaseCartItem.call(ctx, 1)
    expect(ctx.cart).toHaveLength(0)
  })

  it('removeFromCart removes the item entirely', () => {
    const ctx = createContext([
      { id: 1, qty: 3 },
      { id: 2, qty: 1 },
    ])

    actions.removeFromCart.call(ctx, 1)

    expect(ctx.cart).toHaveLength(1)
    expect(ctx.cart[0].product.id).toBe(2)
    expect(mockedSaveCart).toHaveBeenCalledWith(ctx.cart)
  })
})
