import { Link, useParams } from 'react-router-dom'

import { Confirmation } from '../features/booking/Confirmation/Confirmation'
import { useBooking } from '../features/booking/useBooking'

export function BookingConfirmationPage() {
  const { bookingId } = useParams<{ bookingId: string }>()
  const { booking, status, message } = useBooking(bookingId ?? '')

  if (!bookingId) {
    return (
      <p>
        Booking not found. <Link to="/">Back to stays</Link>
      </p>
    )
  }

  if (status === 'loading') {
    return <p>Loading booking...</p>
  }

  if (status === 'error' || !booking) {
    return (
      <p>
        {message || 'Booking not found.'} <Link to="/">Back to stays</Link>
      </p>
    )
  }

  return <Confirmation booking={booking} />
}
