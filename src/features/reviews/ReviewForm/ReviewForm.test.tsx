import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ReviewForm } from './ReviewForm'
import { createReview } from '../api'

vi.mock('../api', () => ({
  createReview: vi.fn(),
}))

const review = {
  id: 'rev-1',
  stayId: 'cabin-1',
  authorName: 'Alex',
  rating: 5,
  body: 'Great lakeside stay.',
  createdAt: '2026-08-01T12:00:00Z',
}

describe('ReviewForm', () => {
  it('shows an error when createReview fails', async () => {
    const user = userEvent.setup()
    vi.mocked(createReview).mockRejectedValue(new Error('Request failed: 500'))
    const onCreated = vi.fn()

    render(<ReviewForm stayId="cabin-1" onCreated={onCreated} />)

    await user.type(screen.getByLabelText(/^name$/i), 'Alex')
    await user.type(screen.getByLabelText(/^review$/i), 'Great lakeside stay.')
    await user.click(screen.getByRole('button', { name: /submit review/i }))

    expect(await screen.findByRole('alert')).toHaveTextContent(/failed/i)
    expect(onCreated).not.toHaveBeenCalled()
  })

  it('calls onCreated when createReview succeeds', async () => {
    const user = userEvent.setup()
    vi.mocked(createReview).mockResolvedValue(review)
    const onCreated = vi.fn()

    render(<ReviewForm stayId="cabin-1" onCreated={onCreated} />)

    await user.type(screen.getByLabelText(/^name$/i), 'Alex')
    await user.selectOptions(screen.getByLabelText(/^rating$/i), '4')
    await user.type(screen.getByLabelText(/^review$/i), 'Great lakeside stay.')
    await user.click(screen.getByRole('button', { name: /submit review/i }))

    await vi.waitFor(() => {
      expect(onCreated).toHaveBeenCalledWith(review)
    })
    expect(createReview).toHaveBeenCalledWith('cabin-1', {
      authorName: 'Alex',
      rating: 4,
      body: 'Great lakeside stay.',
    })
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })
})
