export interface BookingStay {
  id: string
  name: string
  location: string
  imageUrl: string
  pricePerNight: number
}

export interface BookingPrice {
  nights: number
  nightlyRate: number
  total: number
}

export interface Booking {
  id: string
  stay: BookingStay
  checkIn: string
  checkOut: string
  guestName: string
  guestEmail: string
  paymentLast4: string
  price: BookingPrice
  createdAt: string
}

export type CreateBookingInput = {
  stayId: string
  guestName: string
  guestEmail: string
  checkIn: string
  checkOut: string
  paymentLast4?: string
}
