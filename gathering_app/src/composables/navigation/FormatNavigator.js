import { useRouter } from 'vue-router'

export function useFormatNavigator() {
  const router = useRouter()

  const goToFormats = () => router.push({ name: 'formatos' })
  const goToNewFormat = () => router.push({ name: 'formatos-new' })
  const goToEditFormat = id => router.push({ name: 'formatos-edit', params: { id } })

  return {
    goToFormats,
    goToNewFormat,
    goToEditFormat
  }
}
