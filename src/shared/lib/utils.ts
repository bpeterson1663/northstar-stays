export function initials(name: string) {
    return name.split(/\s+/).map((p) => p[0]).join('').slice(0, 2).toUpperCase()
}

export function formatMonthYear(iso: string) {
    return new Date(iso).toLocaleDateString(undefined, { month: 'short', year: 'numeric' })
}