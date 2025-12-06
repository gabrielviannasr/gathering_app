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

  const goToRankPlayerEvent = (idEvent, idPlayer) =>
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

  const goToRankPlayerConfra = (idGathering, idPlayer) =>
    router.push({
      name: 'rank-confra-jogador',
      params: { idGathering, idPlayer }
    })

  return {
    // eventos
    goToRankEvents,
    goToRankEvent,
    goToRankPlayerEvent,

    // confras
    goToRankConfra,
    goToRankPlayerConfra
  }
}
