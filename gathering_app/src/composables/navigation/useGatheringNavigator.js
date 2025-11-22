import { useRouter } from 'vue-router'

export function useGatheringNavigator() {
  const router = useRouter()

  const goToGatherings = () => router.push({ name: 'confras' })
  const goToNewGathering = () => router.push({ name: 'confras-new' })
  const goToEditGathering = id => router.push({ name: 'confras-edit', params: { id } })

  return {
    goToGatherings,
    goToNewGathering,
    goToEditGathering
  }
}
