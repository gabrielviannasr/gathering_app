import { useRouter } from 'vue-router'

export function useConfraNavigator() {
  const router = useRouter()

  const goToConfras = () => router.push({ name: 'confras' })
  const goToNewConfra = () => router.push({ name: 'confras-new' })
  const goToEditConfra = id => router.push({ name: 'confras-edit', params: { id } })

  const goToConfraRank = id =>
    router.push({
      name: 'confras-rank',
      params: { id }
    })

  return {
    goToConfras,
    goToNewConfra,
    goToEditConfra,
    goToConfraRank
  }
}
