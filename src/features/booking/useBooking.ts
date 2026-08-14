import { useEffect, useState } from 'react'

import { isAbortError } from '../../shared/api/error'
import type { Status } from '../../shared/types/status'
import type { Booking } from '../../shared/types/booking'
import { getBooking } from './api'

interface BookingState {
  status: Status
  booking?: Booking
  message: string
}

export function useBooking(id: string): BookingState {
  const [state, setState] = useState<BookingState>({
    status: 'loading',
    message: '',
  })

  useEffect(() => {
    if (!id) {
      setState({
        status: 'error',
        message: 'Booking not found.',
        booking: undefined,
      })
      return
    }

    const controller = new AbortController()
    setState({ status: 'loading', message: '', booking: undefined })

    async function loadBooking() {
      try {
        const booking = await getBooking(id, controller.signal)
        setState({ status: 'success', booking, message: '' })
      } catch (error) {
        if (isAbortError(error)) {
          return
        }

        const message =
          error instanceof Error ? error.message : 'Failed to load booking'

        setState({ status: 'error', message, booking: undefined })
      }
    }

    void loadBooking()

    return () => {
      controller.abort()
    }
  }, [id])

  return state
}
