import { Link } from 'react-router-dom'

import type { Booking } from '../../shared/types/booking'
import type { StayDetail } from '../../shared/types/stay'
import { CheckoutForm } from './CheckoutForm'

import './Checkout.css'

interface Props {
  stay: StayDetail
  onCreated: (booking: Booking) => void
}

export function Checkout({ stay, onCreated }: Props) {
  return (
    <article className="checkout">
      <Link to={`/stays/${stay.id}`} className="checkout__back">
        ← Back to stay
      </Link>

      <header className="checkout__stay">
        <img className="checkout__image" src={stay.imageUrl} alt={stay.name} />
        <div className="checkout__stay-body">
          <div>
            <h1 className="checkout__name">{stay.name}</h1>
            <p className="checkout__location">{stay.location}</p>
          </div>
          <p className="checkout__rate">
            <strong>${stay.pricePerNight}</strong>
            <span> / night</span>
          </p>
        </div>
      </header>

      <CheckoutForm
        stayId={stay.id}
        pricePerNight={stay.pricePerNight}
        onCreated={onCreated}
      />
    </article>
  )
}
