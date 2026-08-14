import type { Stay } from '../../../shared/types/stay'
import { StayCard } from '../StayCard/StayCard'
import './StayList.css'

interface Props {
  stays: Stay[]
}

export function StayList({ stays }: Props) {
  if (stays.length === 0) {
    return <p className="stay-list__empty">No stays found</p>
  }

  return (
    <ul className="stay-list">
      {stays.map((stay) => (
        <li key={stay.id} className="stay-list__item">
          <StayCard stay={stay} />
        </li>
      ))}
    </ul>
  )
}
