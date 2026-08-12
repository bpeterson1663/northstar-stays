export interface Stay {
  id: string
  name: string
  location: string
  pricePerNight: number
  imageUrl: string
  rating: number
  reviewCount: number
  badge: string
  bedrooms: number
  baths: number
  maxGuests: number
  description: string
  amenities: string[]
  images: string[]
  highlights: string[]
  cleaningFee: number
}
