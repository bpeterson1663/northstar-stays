import { afterEach, describe, expect, it, vi } from 'vitest'
import { apiGet, apiPost } from './client'
import { ApiError } from './error'

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('apiGet', () => {
  it('returns parsed JSON on success', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ id: '1' }),
      }),
    )
    await expect(apiGet<{ id: string }>('/stays')).resolves.toEqual({ id: '1' })
  })

  it('throws ApiError when response is not ok', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: false,
        status: 500,
      }),
    )

    const error = await apiGet('/stays').catch((e: unknown) => e)
    expect(error).toBeInstanceOf(ApiError)
    expect(error).toMatchObject({ status: 500 })
  })
})

describe('apiPost', () => {
  it('posts JSON and returns parsed response', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ id: 'booking-1' }),
    })
    vi.stubGlobal('fetch', fetchMock)

    const body = { stayId: 'cabin-1', guestName: 'Alex' }
    await expect(apiPost<{ id: string }>('/bookings', body)).resolves.toEqual({
      id: 'booking-1',
    })

    expect(fetchMock).toHaveBeenCalledWith(
      '/api/bookings',
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({
          'Content-Type': 'application/json',
        }),
        body: JSON.stringify(body),
      }),
    )
  })

  it('throws ApiError when response is not ok', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: false,
        status: 400,
      }),
    )

    const error = await apiPost('/bookings', {}).catch((e: unknown) => e)
    expect(error).toBeInstanceOf(ApiError)
    expect(error).toMatchObject({ status: 400 })
  })
})
