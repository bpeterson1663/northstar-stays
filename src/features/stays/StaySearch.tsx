import { useSearchParams } from 'react-router-dom'

import './StaySearch.css'

export function StaySearch() {
  const [searchParams, setSearchParams] = useSearchParams()
  const q = searchParams.get('q') ?? ''
  const maxPrice = searchParams.get('maxPrice') ?? ''

  function updateParam(key: string, value: string) {
    const next = new URLSearchParams(searchParams)
    const trimmed = value.trim()
    if (trimmed) {
      next.set(key, trimmed)
    } else {
      next.delete(key)
    }
    setSearchParams(next, { replace: true })
  }

  return (
    <form
      className="stay-search"
      role="search"
      onSubmit={(e) => e.preventDefault()}
    >
      <div className="stay-search__field">
        <label htmlFor="stay-search-q">Search by name or city</label>
        <input
          id="stay-search-q"
          type="search"
          name="q"
          placeholder="e.g. cabin, Duluth"
          enterKeyHint="done"
          value={q}
          onChange={(e) => updateParam('q', e.target.value)}
        />
      </div>
      <div className="stay-search__field">
        <label htmlFor="stay-search-max-price">Max price / night</label>
        <input
          id="stay-search-max-price"
          type="number"
          name="maxPrice"
          min={0}
          step={1}
          placeholder="e.g. 300"
          inputMode="numeric"
          enterKeyHint="done"
          value={maxPrice}
          onChange={(e) => updateParam('maxPrice', e.target.value)}
        />
      </div>
      <button type="submit" className="stay-search__done">
        Search
      </button>
    </form>
  )
}
