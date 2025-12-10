import { useRouter } from 'vue-router'

export function useRankNavigator() {
  const router = useRouter()

  // --- EVENTOS ---
  const goToRankEvents = () => router.push({ name: 'rank-eventos' })

  const goToRankEvent = idEvent =>
    router.push({
      name: 'rank-evento',
      params: { idEvent }
    })

  const goToRankEventPlayer = (idEvent, idPlayer) =>
    router.push({
      name: 'rank-evento-jogador',
      params: { idEvent, idPlayer }
    })

  // --- CONFRAS ---
  const goToRankConfra = idGathering =>
    router.push({
      name: 'rank-confra',
      params: { idGathering }
    })

  const goToRankConfraPlayer = (idGathering, idPlayer) =>
    router.push({
      name: 'rank-confra-jogador',
      params: { idGathering, idPlayer }
    })

  const goToConfraWinrate = idGathering =>
    router.push({ name: 'rank-confra-winrate', params: { idGathering } })

  return {
    // eventos
    goToRankEvents,
    goToRankEvent,
    goToRankEventPlayer,

    // confras
    goToRankConfra,
    goToRankConfraPlayer,
    goToConfraWinrate
  }
}
