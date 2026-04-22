import type { CartItem } from '@/types/cart'

export function loadCart(): CartItem[] {
  const raw = localStorage.getItem('cart')
  if (!raw) return []

  try {
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function saveCart(cart: CartItem[]) {
  localStorage.setItem('cart', JSON.stringify(cart))
}
