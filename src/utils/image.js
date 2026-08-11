import { toPng } from 'html-to-image'

export async function generateImage(componentRef) {
  const element = componentRef.value.$el

  return await toPng(element)
}

export function dataUrlToFile(dataUrl, filename) {
  const [header, base64] = dataUrl.split(',')
  const mime = header.match(/:(.*?);/)[1]

  const binary = atob(base64)
  const bytes = new Uint8Array(binary.length)

  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i)
  }

  return new File([bytes], filename, { type: mime })
}

export async function shareImage(file, title) {
  if (!navigator.canShare?.({ files: [file] })) {
    throw new Error('Compartilhamento de arquivos não suportado.')
  }

  await navigator.share({
    files: [file],
    title
  })
}
