import { apiGet } from '../../shared/api/client.ts'
import type { Stay } from '../../shared/types/stay.ts'

export function getStays(signal?: AbortSignal): Promise<Stay[]> {
  return apiGet<Stay[]>('/stays', { signal })
}
