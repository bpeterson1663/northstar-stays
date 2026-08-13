import { Link } from "react-router-dom";
import type { StayDetail as StayDetailType } from "../../shared/types/stay";
import { Gallery } from "../../shared/ui/Gallery";
import { ReviewSection } from "../reviews/ReviewSection";

import './StayDetail.css'

interface Props {
    stay: StayDetailType
    onReviewCreated?: () => void
}

export function StayDetail({ stay, onReviewCreated }: Props) {
    const images =
        stay.images.length > 0
            ? stay.images.map((imageUrl, idx) => ({
                    imageUrl,
                    altName: `Image ${idx + 1} for ${stay.name}`,
                }))
            : [{ imageUrl: stay.imageUrl, altName: stay.name }]

    return (
        <article className="stay-detail">
            <Link to="/" className="stay-detail__back">
                ← Back to results
            </Link>
            
            <Gallery images={images} />

            <div className="stay-detail__layout">
                <div className="stay-detail__main">
                    <header className="stay-detail__header">
                        <div>
                            <h1 className="stay-detail__title">{stay.name}</h1>
                            <p className="stay-detail__location">{stay.location}</p>
                        </div>
                        { stay.badge ? (
                            <span className="stay-detail__badge">{stay.badge}</span>
                        ) : null }
                    </header>
                    <ul className="stay-detail__facts">
                        <li>
                            <span aria-hidden="true">★</span>
                            {stay.rating.toFixed(1)} ({stay.reviewCount} reviews)
                        </li>
                        <li>{stay.bedrooms} bedrooms</li>
                        <li>{stay.baths} baths</li>
                        <li>{stay.maxGuests} guests</li>
                    </ul>

                    <section className="stay-detail__section" aria-labelledby="about-heading">
                        <h2 id="about-heading">About this stay</h2>
                        <p>{stay.description}</p>
                    </section>

                    <section
                        className="stay-detail__section"
                        aria-labelledby="amenities-heading"
                    >
                        <h2 id="amenities-heading">Amenities</h2>
                        <ul className="stay-detail__amenities">
                        {stay.amenities.map((amenity) => (
                            <li key={amenity}>{amenity}</li>
                        ))}
                        </ul>
                    </section>
                    {stay.highlights.length > 0 && (
                        <section
                            className="stay-detail__section"
                            aria-labelledby="highlights-heading"
                        >
                            <h2 id="highlights-heading">What guests love</h2>
                            <ul className="stay-detail__highlights">
                                {stay.highlights.map((highlight) => (
                                    <li key={highlight} className="stay-detail__highlight">
                                        {highlight}
                                    </li>
                                ))}
                            </ul>
                        </section>
                    )}
                    <section className="stay-detail__section">
                        <ReviewSection stayId={stay.id} onReviewCreated={onReviewCreated} averageRating={stay.rating} reviewCount={stay.reviewCount} />
                    </section>
                </div>
                <aside className="stay-detail__aside" aria-label="Booking summary">
                    <div className="stay-detail__booking">
                        <p className="stay-detail__price">
                        <strong>${stay.pricePerNight}</strong>
                        <span> / night</span>
                        </p>

                        <p className="stay-detail__rating-line">
                        <span aria-hidden="true">★</span>
                        {stay.rating.toFixed(1)} ({stay.reviewCount} reviews)
                        </p>

                        <dl className="stay-detail__fees">
                        <div>
                            <dt>Nightly rate</dt>
                            <dd>${stay.pricePerNight}</dd>
                        </div>
                        <div>
                            <dt>Cleaning fee</dt>
                            <dd>${stay.cleaningFee}</dd>
                        </div>
                        <div>
                            <dt>Taxes & fees</dt>
                            <dd>At checkout</dd>
                        </div>
                        </dl>

                        <p className="stay-detail__availability">{stay.availabilitySummary}</p>
                        <p className="stay-detail__policy">{stay.cancellationPolicy}</p>

                        <Link
                            to={`/stays/${stay.id}/checkout`}
                            className="stay-detail__cta"
                        >
                            Continue to checkout
                        </Link>
                    </div>
                </aside>
            </div>
        </article>
    )
}