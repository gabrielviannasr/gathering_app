import { useRouter } from 'vue-router'

export function usePlayerNavigator() {
  const router = useRouter()

  const goToPlayers = () => router.push({ name: 'jogadores' })
  const goToPlayerNew = () => router.push({ name: 'jogadores-new' })
  const goToPlayerEdit = id => router.push({ name: 'jogadores-edit', params: { id } })

  return {
    goToPlayers,
    goToPlayerNew,
    goToPlayerEdit
  }
}
