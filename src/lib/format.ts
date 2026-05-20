/**
 * Format amount as VND: 23,000,120đ
 * Uses integer rounding (no decimal places for VND).
 */
export function formatVND(amount: number | null | undefined): string {
  if (amount === null || amount === undefined || isNaN(amount)) return '—'
  return new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(Math.round(amount)) + 'đ'
}

/**
 * Format date as DD-MM-YYYY.
 */
export function formatDate(date: Date | string | null | undefined): string {
  if (!date) return '—'
  try {
    const d = typeof date === 'string' ? new Date(date) : date
    if (isNaN(d.getTime())) return '—'
    const day = d.getDate().toString().padStart(2, '0')
    const month = (d.getMonth() + 1).toString().padStart(2, '0')
    const year = d.getFullYear()
    return `${day}-${month}-${year}`
  } catch {
    return '—'
  }
}
