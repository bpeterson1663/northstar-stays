import { useSearchParams } from 'react-router-dom'

import { StayList } from '../features/stays/StayList/StayList'
import { StaySearch } from '../features/stays/StaySearch/StaySearch'
import { useStays } from '../features/stays/useStays'

import './Home.css'

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=1600&q=80'

export function Home() {
  const [searchParams] = useSearchParams()
  const q = (searchParams.get('q') ?? '').trim().toLowerCase()
  const maxPriceParam = searchParams.get('maxPrice')
  const maxPrice = maxPriceParam ? Number(maxPriceParam) : null

  const { stays, message, status } = useStays()

  const filteredStays = stays.filter((stay) => {
    if (q) {
      const matchesName = stay.name.toLowerCase().includes(q)
      const matchesLocation = stay.location.toLowerCase().includes(q)
      if (!matchesName && !matchesLocation) {
        return false
      }
    }
    if (
      maxPrice != null &&
      !Number.isNaN(maxPrice) &&
      stay.pricePerNight > maxPrice
    ) {
      return false
    }
    return true
  })

  return (
    <div className="home">
      <section className="home__hero" aria-labelledby="home-hero-title">
        <img
          className="home__hero-image"
          src={HERO_IMAGE}
          alt=""
          role="presentation"
        />
        <div className="home__hero-content">
          <h1 id="home-hero-title" className="home__hero-title">
            Find your perfect stay in Minnesota
          </h1>
          <p className="home__hero-copy">
            Cabins, lake homes and lodges handpicked across the North Star State
            from the North Shore to the Boundary Waters.
          </p>
        </div>
      </section>

      <div className="home__body">
        <StaySearch />

        <section aria-label="Available stays" className="home__results">
          {status === 'loading' && (
            <p className="home__status">Loading stays...</p>
          )}

          {status === 'error' && (
            <p className="home__status home__status--error">
              An error occurred: {message}
            </p>
          )}

          {status === 'success' && <StayList stays={filteredStays} />}
        </section>
      </div>
    </div>
  )
}
