import { useActionState } from 'react'
import type { Review } from '../../shared/types/review'
import { createReview } from './api'
import { SubmitButton } from '../../shared/ui/SubmitButton'

import './ReviewForm.css'

interface Props {
  stayId: string
  onCreated: (review: Review) => void
}

type FormState = { error: string } | null

export function ReviewForm({ stayId, onCreated }: Props) {
  const [state, submitAction] = useActionState(
    async (_prev: FormState, formData: FormData): Promise<FormState> => {
      const authorName = String(formData.get('authorName') ?? '').trim()
      const body = String(formData.get('body') ?? '').trim()
      const rating = Number(formData.get('rating'))

      if (!authorName || !body || rating < 1 || rating > 5) {
        return { error: 'Name, rating (1–5), and review text are required.' }
      }

      try {
        const review = await createReview(stayId, { authorName, rating, body })
        onCreated(review)
        return null
      } catch (error) {
        return {
          error:
            error instanceof Error ? error.message : 'Failed to submit review',
        }
      }
    },
    null,
  )

  return (
    <form className="review-form" action={submitAction}>
      <h3 className="review-form__title">Leave a review</h3>

      <div className="review-form__field">
        <label htmlFor="review-author">Name</label>
        <input
          id="review-author"
          name="authorName"
          type="text"
          autoComplete="name"
          required
        />
      </div>
      <div className="review-form__field">
        <label htmlFor="review-rating">Rating</label>
        <select id="review-rating" name="rating" defaultValue="5" required>
          {[5, 4, 3, 2, 1].map((value) => (
            <option key={value} value={value}>
              {value} {value === 1 ? 'star' : 'stars'}
            </option>
          ))}
        </select>
      </div>

      <div className="review-form__field">
        <label htmlFor="review-body">Review</label>
        <textarea id="review-body" name="body" rows={4} required />
      </div>

      {state?.error ? (
        <p className="review-form__error" role="alert">
          {state.error}
        </p>
      ) : null}

      <SubmitButton label="Submit Review" />
    </form>
  )
}
