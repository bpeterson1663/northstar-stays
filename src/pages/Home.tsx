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
    <section>
      {stays.map(stay => (
        <div key={stay.id}>
          {stay.name}
        </div>
      ))}
    </section>
  )
}
