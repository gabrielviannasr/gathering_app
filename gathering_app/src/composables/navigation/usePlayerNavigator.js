import { useRouter } from 'vue-router'

export function usePlayerNavigator() {
  const router = useRouter()

  const goToPlayers = () => router.push({ name: 'jogadores' })
  const goToNewPlayer = () => router.push({ name: 'jogadores-new' })
  const goToEditPlayer = id => router.push({ name: 'jogadores-edit', params: { id } })

  return {
    goToPlayers,
    goToNewPlayer,
    goToEditPlayer
  }
}
