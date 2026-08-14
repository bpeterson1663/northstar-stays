import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { StayDetail } from './StayDetail'
import type { StayDetail as StayDetailType } from '../../../shared/types/stay'

vi.mock('../../reviews/ReviewSection', () => ({
  ReviewSection: () => <div data-testid="review-section" />,
}))

const stay: StayDetailType = {
  id: 'cabin-1',
  name: 'Lake Cabin',
  location: 'Bemidji, MN',
  pricePerNight: 180,
  imageUrl: '/cabin.jpg',
  rating: 4.8,
  reviewCount: 12,
  badge: 'Guest favorite',
  bedrooms: 2,
  baths: 1,
  maxGuests: 4,
  description: 'A quiet lakeside cabin.',
  amenities: ['WiFi', 'Dock'],
  images: ['/cabin-1.jpg', '/cabin-2.jpg'],
  highlights: ['Lake access'],
  cleaningFee: 50,
  availabilitySummary: 'Available most weekends',
  cancellationPolicy: 'Free cancellation within 48 hours',
}

describe('StayDetail', () => {
  it('renders stay header details', () => {
    render(
      <MemoryRouter>
        <StayDetail stay={stay} />
      </MemoryRouter>,
    )

    expect(
      screen.getByRole('heading', { name: 'Lake Cabin' }),
    ).toBeInTheDocument()
    expect(screen.getByText('Bemidji, MN')).toBeInTheDocument()
    expect(screen.getByText('Guest favorite')).toBeInTheDocument()
    expect(screen.getByText('2 bedrooms')).toBeInTheDocument()
    expect(screen.getByText('1 baths')).toBeInTheDocument()
    expect(screen.getByText('4 guests')).toBeInTheDocument()
  })

  it('renders about, amenities, and booking summary', () => {
    render(
      <MemoryRouter>
        <StayDetail stay={stay} />
      </MemoryRouter>,
    )

    expect(screen.getByText('A quiet lakeside cabin.')).toBeInTheDocument()
    expect(screen.getByText('WiFi')).toBeInTheDocument()
    expect(screen.getByText('Dock')).toBeInTheDocument()
    expect(screen.getByText('Available most weekends')).toBeInTheDocument()
    expect(
      screen.getByText('Free cancellation within 48 hours'),
    ).toBeInTheDocument()
    expect(screen.getByText('/ night')).toBeInTheDocument()
    expect(screen.getAllByText('$180')).toHaveLength(2)
  })

  it('links back to results and forward to checkout', () => {
    render(
      <MemoryRouter>
        <StayDetail stay={stay} />
      </MemoryRouter>,
    )

    expect(
      screen.getByRole('link', { name: /back to results/i }),
    ).toHaveAttribute('href', '/')
    expect(
      screen.getByRole('link', { name: /continue to checkout/i }),
    ).toHaveAttribute('href', '/stays/cabin-1/checkout')
  })
})
