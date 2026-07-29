export function formatCurrency(value) {
  if (!value) return '0,00'

  return Number(value).toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })
}
