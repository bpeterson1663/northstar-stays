import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { CheckoutForm } from './CheckoutForm'

vi.mock('../api', () => ({
  createBooking: vi.fn(),
}))

import { createBooking } from '../api'

describe('CheckoutForm', () => {
  it('shows an error when createBooking fails', async () => {
    const user = userEvent.setup()
    vi.mocked(createBooking).mockRejectedValue(new Error('Request failed: 500'))
    const onCreated = vi.fn()

    render(
      <CheckoutForm
        stayId="cabin-1"
        pricePerNight={100}
        onCreated={onCreated}
      />,
    )

    await user.type(screen.getByLabelText(/name/i), 'Alex')
    await user.type(screen.getByLabelText(/email/i), 'alex@example.com')
    await user.type(screen.getByLabelText(/check in/i), '2026-08-10')
    await user.type(screen.getByLabelText(/check out/i), '2026-08-12')
    await user.type(screen.getByLabelText(/card number/i), '4242424242424242')
    await user.click(screen.getByRole('button', { name: /confirm booking/i }))

    expect(await screen.findByRole('alert')).toHaveTextContent(/failed/i)
    expect(onCreated).not.toHaveBeenCalled()
  })
})
