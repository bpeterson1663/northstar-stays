import { useSearchParams } from 'react-router-dom'

import { StayList } from '../features/stays/StayList'
import { StaySearch } from '../features/stays/StaySearch'
import { useStays } from '../features/stays/useStays'

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
    if (maxPrice != null && !Number.isNaN(maxPrice) && stay.pricePerNight > maxPrice) {
      return false
    }
    return true
  })

  if (status === 'loading') {
    return <p>Loading stays...</p>
  }

  if (status === 'error') {
    return <p>An Error occurred: {message}</p>
  }

  return (
    <section aria-label="Available stays">
      <StaySearch />
      <StayList stays={filteredStays}></StayList>
    </section>
  )
}
