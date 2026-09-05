export const todayIso = () => new Date().toISOString().slice(0, 10)

export const addDaysIso = (iso, days) => {
  const d = new Date(`${iso}T00:00:00`)
  d.setDate(d.getDate() + days)
  return d.toISOString().slice(0, 10)
}

export const formatShortDate = (iso) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString('en-US', { day: 'numeric', month: 'short' })
