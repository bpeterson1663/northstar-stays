import { apiGet } from '../../shared/api/client.ts'
import type { StayDetail, Stay } from '../../shared/types/stay.ts'

export function getStays(signal?: AbortSignal): Promise<Stay[]> {
  return apiGet<Stay[]>('/stays', { signal })
}

export function getStay(id: string, signal?: AbortSignal) {
  return apiGet<StayDetail>(`/stays/${id}`, { signal })
}
