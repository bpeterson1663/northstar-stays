import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { StayList } from './StayList'
import type { Stay } from '../../../shared/types/stay'

const stay: Stay = {
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
}

describe('StayList', () => {
  it('shows empty state when there are no stays', () => {
    render(
      <MemoryRouter>
        <StayList stays={[]} />
      </MemoryRouter>,
    )
    expect(screen.getByText('No stays found')).toBeInTheDocument()
  })

  it('renders stay names', () => {
    render(
      <MemoryRouter>
        <StayList stays={[stay]} />
      </MemoryRouter>,
    )
    expect(screen.getByText('Lake Cabin')).toBeInTheDocument()
  })
})
