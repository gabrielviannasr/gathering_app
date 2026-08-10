import { toPng } from 'html-to-image'

export async function generateCashClosingImage(cashClosingRef) {
  const element = cashClosingRef.value.$el

  const dataUrl = await toPng(element)

  console.log(dataUrl)
}
