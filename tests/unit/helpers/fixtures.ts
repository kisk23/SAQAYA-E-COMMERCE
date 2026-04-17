export const mockProduct = {
  id: 1,
  title: 'Test Product',
  price: 100,
  discountPercentage: 20,
  thumbnail: 'test.jpg',
  reviews: [{ rating: 4 }, { rating: 4 }],
}

export const mockCartItems = [
  {
    id: 1,
    title: 'Test Product',
    quantity: 2,
    image: 'img.jpg',
    lineTotal: 200,
  },
]

export const mockMultiCartItems = [
  { id: 1, title: 'Product A', quantity: 1, image: 'a.jpg', lineTotal: 100 },
  { id: 2, title: 'Product B', quantity: 3, image: 'b.jpg', lineTotal: 300 },
  { id: 3, title: 'Product C', quantity: 2, image: 'c.jpg', lineTotal: 200 },
]
