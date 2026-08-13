import { initials } from "../../shared/lib/utils";
import { formatMonthYear } from "../../shared/lib/date"
import type { Review } from "../../shared/types/review";
import { StarRating } from "../../shared/ui/StarRating";
import './ReviewList.css'


interface Props {
    reviews: Review[];
    averageRating: number;
    reviewCount: number;
}

 // TODO: implement pagination for ratings. Currently just rendering all reviews that come back from the api.
export function ReviewList({ reviews, averageRating, reviewCount }: Props) {
    if (reviews.length === 0) {
        return (
            <section className="review-list">
                <h2>Reviews</h2>
                <p className="review-list__empty">No reviews yet</p>
            </section>
        )
    }

    return (
        <section className="review-list">
            <header className="review-list__header">
                <div className="review-list__summary">
                    <h2>Reviews</h2>
                    <p className="review-list__rating-line">
                        <span aria-hidden="true">★ </span>
                        { averageRating.toFixed(1)}
                        <span className="review-list__count"> ({reviewCount} reviews)</span>
                    </p>
                </div>
            </header>

            <ul className="review-list__cards">
                { reviews.map(review => (
                    <li key={review.id} className="review-list__card">
                        <div className="review-list__author">
                            <span className="review-list__avatar" aria-hidden="true">
                                {initials(review.authorName)}
                            </span>
                            <div>
                                <p className="review-list__name">{review.authorName}</p>
                                <p className="review-list__date">{formatMonthYear(review.createdAt)}</p>
                            </div>
                        </div>
                        <p className="review-list__stars">
                            <StarRating rating={review.rating} />
                        </p>
                        <p className="review-list__body">{ review.body }</p>
                    </li>
                ))}

            </ul>
        </section>
    )
}