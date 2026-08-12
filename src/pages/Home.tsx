import { StayList } from '../features/stays/StayList'
import { useStays } from '../features/stays/useStays'

export function Home() {
  const { stays, message, status } = useStays()

  if (status === 'loading') {
    return <p>Loading stays…</p>
  }

  if (status === 'error') {
    return <p>Error: {message}</p>
  }

  return (
    <section aria-label="Available stays">
      <StayList stays={stays}></StayList>
    </section>
  )
}
