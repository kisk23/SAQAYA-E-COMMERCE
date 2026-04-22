import CartDrawer from '@/components/cart/CartDrawer.vue'
import { useCartStore } from '@/store/modules/cart'
import { setupShallowMount, createCartTestingPinia } from '@tests/helpers'

const createProduct = (id: number, title: string, price: number, thumbnail = 'img.jpg') => ({
  id,
  title,
  description: '',
  price,
  discountPercentage: 0,
  rating: 0,
  stock: 10,
  brand: '',
  category: '',
  sku: '',
  weight: 1,
  dimensions: { width: 1, height: 1, depth: 1 },
  images: [thumbnail],
  thumbnail,
  tags: [],
  reviews: [],
  availabilityStatus: '',
  returnPolicy: '',
  warrantyInformation: '',
  shippingInformation: '',
  minimumOrderQuantity: 1,
  meta: { createdAt: '', updatedAt: '', barcode: '', qrCode: '' },
})

const singleCart = [{ product: createProduct(1, 'Test Product', 100), quantity: 2 }]
const multiCart = [
  { product: createProduct(1, 'Product A', 100, 'a.jpg'), quantity: 1 },
  { product: createProduct(2, 'Product B', 100, 'b.jpg'), quantity: 3 },
  { product: createProduct(3, 'Product C', 100, 'c.jpg'), quantity: 2 },
]

describe('CartDrawer', () => {
  const factory = (props = { isOpen: true }, cart = singleCart) => {
    const pinia = createCartTestingPinia({ cart })
    const mounted = setupShallowMount(CartDrawer, { pinia, props })
    const cartStore = useCartStore(pinia)

    return { ...mounted, cartStore }
  }

  it('adds active class to backdrop when isOpen is true', () => {
    const { get } = factory({ isOpen: true })

    expect(get('backdrop').classes()).toContain('cart-drawer__backdrop--active')
  })

  it('does not add active class to backdrop when isOpen is false', () => {
    const { get } = factory({ isOpen: false })

    expect(get('backdrop').classes()).not.toContain('cart-drawer__backdrop--active')
  })

  it('has aria-label on the drawer element', () => {
    const { get } = factory()

    expect(get('drawer').attributes('aria-label')).toBe('Shopping cart')
  })

  it('renders item quantity', () => {
    const { get } = factory()

    expect(get('quantity').text()).toContain('2')
  })

  it('renders formatted per-item line total', () => {
    const { get } = factory()

    expect(get('total').text()).toContain('200')
  })

  it('renders all items when cart has multiple entries', () => {
    const { wrapper } = factory({ isOpen: true }, multiCart)

    expect(wrapper.findAll('[data-test="cart-item"]').length).toBe(3)
  })

  it('renders subtotal row with cartTotal value', () => {
    const { get } = factory()

    expect(get('subtotal').text()).toContain('200')
  })

  it('renders shipping row as Free', () => {
    const { get } = factory()

    expect(get('shipping').text()).toContain('Free')
  })

  it('renders summary total row with cartTotal value', () => {
    const { get } = factory()

    expect(get('summary-total').text()).toContain('200')
  })

  it('renders the Place Order button', () => {
    const { get } = factory()

    expect(get('checkout').exists()).toBe(true)
    expect(get('checkout').text()).toBe('Place Order')
  })

  it('does not emit close when clicking inside the drawer', async () => {
    const { wrapper, get } = factory()

    await get('drawer').trigger('click')

    expect(wrapper.emitted('close')).toBeFalsy()
  })

  it('calls cart actions when controls are clicked', async () => {
    const { wrapper, cartStore } = factory()

    await wrapper.find('[data-test="increase"]').trigger('click')
    await wrapper.find('[data-test="decrease"]').trigger('click')
    await wrapper.find('[data-test="remove"]').trigger('click')

    expect(cartStore.incrementCartItem).toHaveBeenCalledWith(1)
    expect(cartStore.decreaseCartItem).toHaveBeenCalledWith(1)
    expect(cartStore.removeFromCart).toHaveBeenCalledWith(1)
  })
})
