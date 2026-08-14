import { apiGet, apiPost } from '../../shared/api/client'
import type { CreateReviewInput, Review } from '../../shared/types/review'

export function getReviews(
  stayId: string,
  signal?: AbortSignal,
): Promise<Review[]> {
  return apiGet<Review[]>(`/stays/${stayId}/reviews`, { signal })
}

export function createReview(
  stayId: string,
  body: CreateReviewInput,
  signal?: AbortSignal,
) {
  return apiPost<Review>(`/stays/${stayId}/reviews`, body, { signal })
}
