import { Link } from 'react-router-dom'

import type { Stay } from '../../shared/types/stay'
import './StayCard.css'

interface Props {
    stay: Stay
}

export function StayCard({ stay }: Props) {
    return (
        <article className="stay-card">
            <Link to={`/stays/${stay.id}`} className="stay-card__link">
                <div className="stay-card__media">
                    <img src={stay.imageUrl} alt={stay.name} />
                </div>
                <div className="stay-card__body">
                    <h2 className="stay-card__title">{stay.name}</h2>
                    <p className="stay-card__location">{stay.location}</p>
                    <div className="stay-card__meta">
                        <p className="stay-card__rating">
                            <span aria-hidden="true">★</span>
                            {stay.rating.toFixed(1)}
                            <span className="stay-card__reviews">({stay.reviewCount})</span>
                        </p>
                        <p className="stay-card__price">
                            <strong>${stay.pricePerNight}</strong>
                            <span> / night</span>
                        </p>
                    </div>
                </div>
            </Link>
        </article>
    )
}