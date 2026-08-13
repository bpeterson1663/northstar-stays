import { Link, useNavigate, useParams } from 'react-router-dom'

import { Checkout } from '../features/booking/Checkout'
import { useStay } from '../features/stays/useStay'

export function CheckoutPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const { stay, status, message } = useStay(id ?? '')

  if (!id) {
    return (
        <p>
            Stay not found. <Link to="/">Back to stays</Link>
        </p>
    )
  }

    if (status === 'loading') {
        return <p>Loading stay…</p>
    }

    if (status === 'error' || !stay) {
        return (
            <p>
                {message || 'Stay not found.'}{' '}
                <Link to="/">Back to stays</Link>
            </p>
        )
    }

    return (
    <Checkout
        stay={stay}
        onCreated={(booking) =>
            navigate(`/bookings/${booking.id}`, { state: { booking } })
        }
    />
  )
}
