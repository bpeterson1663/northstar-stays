import { apiGet } from "../../shared/api/client";
import type { Review } from "../../shared/types/review";


export function getReviews(stayId: string, signal?: AbortSignal): Promise<Review[]> {
    return apiGet<Review[]>(`/stays/${stayId}/reviews`, { signal })
}
