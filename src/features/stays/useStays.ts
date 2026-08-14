import { useEffect, useState } from 'react'

import { getStays } from './api'
import type { Status } from '../../shared/types/status'
import type { Stay } from '../../shared/types/stay'
import { isAbortError } from '../../shared/api/error'

interface StaysState {
  status: Status
  stays: Stay[]
  message: string
}

export function useStays(): StaysState {
  const [state, setState] = useState<StaysState>({
    status: 'loading',
    stays: [],
    message: '',
  })

  useEffect(() => {
    const controller = new AbortController()

    async function loadStays() {
      try {
        const stays = await getStays(controller.signal)
        setState({ status: 'success', stays, message: '' })
      } catch (error) {
        if (isAbortError(error)) {
          return
        }

        const message =
          error instanceof Error ? error.message : 'Failed to load stays'
        setState({ status: 'error', message, stays: [] })
      }
    }

    void loadStays()

    return () => {
      controller.abort()
    }
  }, [])

  return state
}
