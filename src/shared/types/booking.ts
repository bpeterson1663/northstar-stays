export interface Booking {
  id: string
  checkIn: string
  checkOut: string
  guestName: string
  guestEmail: string
  paymentLast4: string
  price: number
  createdAt: string
}

export type CreateBookingInput = Pick<
  Booking,
  'guestName' | 'guestEmail' | 'checkIn' | 'checkOut'
> & {
  stayId: string
  paymentLast4?: string
}
