import { useRouter } from 'vue-router'

export function useConfraNavigator() {
  const router = useRouter()

  const goToConfras = () => router.push({ name: 'confras' })
  const goToConfraNew = () => router.push({ name: 'confras-new' })
  const goToConfraEdit = id => router.push({ name: 'confras-edit', params: { id } })

  const goToConfraFormats = id => router.push({ name: 'confras-formats', params: { id } })

  const goToConfraPots = id =>
    router.push({
      name: 'confras-pots',
      params: { id }
    })

  const goToConfraWinrate = id => router.push({ name: 'confras-winrate', params: { id } })

  return {
    goToConfras,
    goToConfraNew,
    goToConfraEdit,

    goToConfraFormats,
    goToConfraPots,
    goToConfraWinrate
  }
}
