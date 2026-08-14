import { describe, expect, it } from 'vitest'
import { estimateStayTotal } from './pricing'

describe('estimateStayTotal', () => {
  it('returns nights and total for a valid range;', () => {
    expect(estimateStayTotal(100, '2026-08-01', '2026-08-04')).toEqual({
      nights: 3,
      nightlyRate: 100,
      total: 300,
    })
  })

  it('returns null when check out is not after check in', () => {
    expect(estimateStayTotal(100, '2026-08-01', '2026-08-01')).toBeNull()
    expect(estimateStayTotal(100, '2026-08-02', '2026-08-01')).toBeNull()
  })

  it('returns null when dates are missing', () => {
    expect(estimateStayTotal(100, '', '2026-08-04')).toBeNull()
  })
})
