import { useEffect, useState } from 'react'

import { isAbortError } from '../../shared/api/error'
import type { Status } from '../../shared/types/status'
import type { StayDetail } from '../../shared/types/stay'
import { getStay } from './api'

interface StayState {
  status: Status
  stay?: StayDetail
  message: string
}

export function useStay(id: string): StayState {
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

    return state
}
