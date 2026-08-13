import { useCallback, useEffect, useState } from 'react'

import { isAbortError } from '../../shared/api/error'
import type { Status } from '../../shared/types/status'
import type { StayDetail } from '../../shared/types/stay'
import { getStay } from './api'

interface StayState {
  status: Status
  stay?: StayDetail
  message: string
}

export function useStay(id: string): StayState & { refetch: () => Promise<void> } {
  const [state, setState] = useState<StayState>({
    status: 'loading',
    message: '',
  })

  useEffect(() => {
    if (!id) {
      setState({ status: 'error', message: 'Stay not found.', stay: undefined })
      return
    }

    const controller = new AbortController()
    setState({ status: 'loading', message: '', stay: undefined })

    async function loadStay() {
      try {
        const stay = await getStay(id, controller.signal)
        setState({ status: 'success', stay, message: '' })
      } catch (error) {
        if (isAbortError(error)) {
          return
        }

        const message =
          error instanceof Error ? error.message : 'Failed to load stay'

        setState({ status: 'error', message, stay: undefined })
      }
    }

    void loadStay()

    return () => {
      controller.abort()
    }
  }, [id])

  const refetch = useCallback(async () => {
    if (!id) {
      return
    }

    try {
      const stay = await getStay(id)
      setState({ status: 'success', stay, message: '' })
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Failed to refresh stay'
        setState((prev) => ({
            ...prev,
            message,
            status: prev.stay ? 'success' : 'error',
        }))
    }
  }, [id])

  return { ...state, refetch }
}
