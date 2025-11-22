import { useRouter } from 'vue-router'

export function useRankNavigator() {
  const router = useRouter()

  const goToRankEvents = () => router.push({ name: 'rank-eventos' })

  const goToRankEvent = idEvent => router.push({ name: 'rank', params: { idEvent } })

  const goToRankPlayer = (idEvent, idPlayer) =>
    router.push({
      name: 'rank-jogador',
      params: { idEvent, idPlayer }
    })

  return {
    goToRankEvents,
    goToRankEvent,
    goToRankPlayer
  }
}
