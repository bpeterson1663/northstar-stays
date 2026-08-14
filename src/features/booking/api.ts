import { apiGet, apiPost } from '../../shared/api/client'
import type { Booking, CreateBookingInput } from '../../shared/types/booking'

export function getBooking(id: string, signal?: AbortSignal) {
  return apiGet<Booking>(`/bookings/${id}`, { signal })
}

export function createBooking(body: CreateBookingInput, signal?: AbortSignal) {
  return apiPost<Booking>('/bookings', body, { signal })
}
