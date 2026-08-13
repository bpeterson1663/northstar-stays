import { ReviewList } from "./ReviewList";
import { useReviews } from "./useReviews";

interface Props {
    stayId: string;
    averageRating: number;
    reviewCount: number;
}

export function ReviewSection({ stayId, averageRating, reviewCount }: Props) {
    const { status, message, reviews } = useReviews(stayId)

    if (status === 'loading') {
        return <p>Loading reviews...</p>
    }

    if (status === 'error') {
        return <p>Error loading reviews: {message}</p>
    }

    return (
        <ReviewList reviews={reviews} averageRating={averageRating} reviewCount={reviewCount} />
    )
}