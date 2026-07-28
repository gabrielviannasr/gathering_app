export function pluralize(value, singular, plural = `${singular}s`) {
  return `${value} ${value === 1 ? singular : plural}`
}
