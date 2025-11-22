import { useRouter } from 'vue-router'

export function useRankNavigator() {
  const router = useRouter()

  function goToRankEvents() {
    router.push({ name: 'rank-eventos' })
  }

  function goToRankEvent(idEvent) {
    router.push({ name: 'rank', params: { idEvent } })
  }

  function goToRankPlayer(idEvent, idPlayer) {
    router.push({
      name: 'rank-player',
      params: { idEvent, idPlayer }
    })
  }

  return {
    goToRankEvents,
    goToRankEvent,
    goToRankPlayer
  }
}
