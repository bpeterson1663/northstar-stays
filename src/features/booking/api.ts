import { apiPost } from "../../shared/api/client";
import type { Booking, CreateBookingInput } from "../../shared/types/booking";

export function createBooking(body: CreateBookingInput, signal?: AbortSignal) {
    return apiPost<Booking>('/bookings', body, { signal })
}