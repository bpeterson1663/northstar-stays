import type { Review } from "../../shared/types/review"
import { ReviewForm } from "./ReviewForm"
import { ReviewList } from "./ReviewList"
import { useReviews } from "./useReviews"

interface Props {
  stayId: string;
  averageRating: number;
  reviewCount: number;
  onReviewCreated?: () => void;
}

export function ReviewSection({ stayId, averageRating, reviewCount, onReviewCreated }: Props) {
  const { status, message, reviews , addReview } = useReviews(stayId)

  if (status === 'loading') {
    return <p>Loading reviews...</p>
  }

  if (status === 'error') {
    return <p>Error loading reviews: {message}</p>
  }

  function handleCreated(review: Review) {
    addReview(review)
    onReviewCreated?.()
  }

  return (
    <>
      <ReviewList
        reviews={reviews}
        averageRating={averageRating}
        reviewCount={reviewCount}
      />
      <ReviewForm stayId={stayId} onCreated={handleCreated} />
    </>
  )
}
