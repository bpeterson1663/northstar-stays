import { Link } from 'react-router-dom'

import type { Booking } from '../../../shared/types/booking'
import { formatDate } from '../../../shared/lib/date'

import './Confirmation.css'

interface Props {
  booking: Booking
}

export function Confirmation({ booking }: Props) {
  const { stay, price } = booking

  return (
    <article className="confirmation">
      <header className="confirmation__header">
        <div className="confirmation__check" aria-hidden="true">
          ✓
        </div>
        <p className="confirmation__status">Confirmed</p>
        <h1 className="confirmation__title">Your booking is confirmed!</h1>
        <p className="confirmation__email">
          We’ve sent the details to <strong>{booking.guestEmail}</strong>
        </p>
      </header>

      <section className="confirmation__stay" aria-label="Booking details">
        <img
          className="confirmation__image"
          src={stay.imageUrl}
          alt={stay.name}
        />
        <div className="confirmation__stay-body">
          <h2 className="confirmation__name">{stay.name}</h2>
          <p className="confirmation__location">{stay.location}</p>
          <p className="confirmation__dates">
            {formatDate(booking.checkIn)} – {formatDate(booking.checkOut)} (
            {price.nights} {price.nights === 1 ? 'night' : 'nights'})
          </p>
          <p className="confirmation__meta">
            Confirmation #{booking.id}
            <span aria-hidden="true"> · </span>
            Booked {formatDate(booking.createdAt.slice(0, 10))}
          </p>
        </div>
      </section>

      <section className="confirmation__summary" aria-label="Payment summary">
        <div className="confirmation__row">
          <span>
            ${price.nightlyRate} × {price.nights}{' '}
            {price.nights === 1 ? 'night' : 'nights'}
          </span>
          <span>${price.total}</span>
        </div>
        <div className="confirmation__total">
          <span>Total paid</span>
          <strong>${price.total}</strong>
        </div>
        <p className="confirmation__payment">
          Card ending in •••• {booking.paymentLast4}
        </p>
      </section>

      <Link to="/" className="confirmation__back">
        Back to stays
      </Link>
    </article>
  )
}
