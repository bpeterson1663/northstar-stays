import { Link, useLocation } from 'react-router-dom'

import { Confirmation } from '../features/booking/Confirmation/Confirmation'
import type { Booking } from '../shared/types/booking'

export function BookingConfirmationPage() {
  const location = useLocation()
  const booking = (location.state as { booking?: Booking } | null)?.booking

  if (!booking) {
    return (
      <p>
        Booking not found. <Link to="/">Back to stays</Link>
      </p>
    )
  }

  return <Confirmation booking={booking} />
}
