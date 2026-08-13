export interface Review {
    id: string
    stayId: string
    authorName: string
    rating: number
    body: string
    createdAt: string
}

export type CreateReviewInput = Pick<Review, 'authorName' | 'rating' | 'body'>