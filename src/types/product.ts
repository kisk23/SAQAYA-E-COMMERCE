export interface Dimensions {
  width: number
  height: number
  depth: number
}

export interface Review {
  rating: number
  comment: string
  date: string
  reviewerName: string
  reviewerEmail: string
}

export interface ProductMeta {
  createdAt: string
  updatedAt: string
  barcode: string
  qrCode: string
}

export interface Product {
  id: number
  title: string
  description: string

  price: number
  discountPercentage: number

  rating: number
  stock: number

  brand: string
  category: string
  sku: string

  weight: number
  dimensions: Dimensions

  images: string[]
  thumbnail: string

  tags: string[]

  reviews: Review[]

  availabilityStatus: string
  returnPolicy: string
  warrantyInformation: string
  shippingInformation: string

  minimumOrderQuantity: number

  meta: ProductMeta
}
