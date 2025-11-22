export function formatDateShort(dateStr) {
  const meses = [
    'jan.',
    'fev.',
    'mar.',
    'abr.',
    'mai.',
    'jun.',
    'jul.',
    'ago.',
    'set.',
    'out.',
    'nov.',
    'dez.'
  ]

  const date = new Date(dateStr)
  const dia = date.getDate()
  const mes = meses[date.getMonth()]
  const ano = date.getFullYear()

  return `${dia} de ${mes} de ${ano}`
}
