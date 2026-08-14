import { Link, useParams } from 'react-router-dom'

import { StayDetail } from '../features/stays/StayDetail'
import { useStay } from '../features/stays/useStay'

export function StayDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { stay, status, message, refetch } = useStay(id ?? '')

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
        {message || 'Stay not found.'} <Link to="/">Back to stays</Link>
      </p>
    )
  }

  return <StayDetail stay={stay} onReviewCreated={() => void refetch()} />
}
