import { useState, useEffect } from "react";
import type { Review } from "../../shared/types/review";
import type { Status } from "../../shared/types/status";
import { getReviews } from "./api";
import { isAbortError } from "../../shared/api/error";

interface ReviewsState {
    status: Status;
    reviews: Review[];
    message: string;
}

export function useReviews(stayId: string): ReviewsState {
    const [state, setState] = useState<ReviewsState>({ status: 'loading', reviews: [], message: ''})

    useEffect(() => {
        const controller = new AbortController();

        async function loadReviews() {
            try {
                const reviews = await getReviews(stayId, controller.signal)
                setState({ status: 'success', reviews, message: ''})
            } catch (error) {
                if (isAbortError(error)) {
                    return
                }

                const message = error instanceof Error ? error.message : 'Failed to load reviews'
                setState({ status: 'error', message, reviews: [] })
            }
        }

        void loadReviews();

        return(() => {
            controller.abort();   
        })

    }, [stayId])

    return state
}