import { useRouter } from 'vue-router'

export function useRankNavigator() {
  const router = useRouter()

  // --- EVENTOS ---
  const goToRankEvents = () => router.push({ name: 'rank-eventos' })

  const goToRankEvent = idEvent =>
    router.push({
      name: 'rank',
      params: { idEvent }
    })

  const goToRankPlayerEvent = (idEvent, idPlayer) =>
    router.push({
      name: 'rank-jogador',
      params: { idEvent, idPlayer }
    })

  // --- CONFRAS ---
  const goToRankConfra = idGathering =>
    router.push({
      name: 'confras-rank',
      params: { id: idGathering }
    })

  const goToRankPlayerConfra = (idGathering, idPlayer) =>
    router.push({
      name: 'confras-rank-player',
      params: { id: idGathering, idPlayer }
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
