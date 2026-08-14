import './StarRating.css'

interface Props {
  rating: number
  max?: number
}

export function StarRating({ rating, max = 5 }: Props) {
  const value = Math.round(rating)
  const clamped = Math.min(max, Math.max(0, value))
  return (
    <div className="star-rating" aria-label={`${clamped} out of ${max} stars`}>
      {Array.from({ length: max }, (_, i) => {
        const star = i + 1
        return (
          <span
            key={star}
            className={
              i < clamped ? 'star-rating__star is-filled' : 'star-rating__star'
            }
            aria-hidden="true"
          >
            {i < clamped ? '★' : '☆'}
          </span>
        )
      })}
    </div>
  )
}
