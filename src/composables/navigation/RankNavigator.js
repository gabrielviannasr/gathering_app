import { useRouter } from 'vue-router'
import { ROUTES } from 'src/router/routes.enum'

export function useRankNavigator() {
  const router = useRouter()

  return {
    // Eventos
    goToRankEvents: () => router.push({ name: ROUTES.RANK_EVENTOS }),
    goToRankEvent: idEvent => router.push({ name: ROUTES.RANK_EVENTO, params: { idEvent } }),
    goToRankEventPlayer: (idEvent, idPlayer) =>
      router.push({ name: ROUTES.RANK_EVENTO_JOGADOR, params: { idEvent, idPlayer } }),

    // Confras
    goToRankConfra: idGathering =>
      router.push({ name: ROUTES.RANK_CONFRA, params: { idGathering } }),
    goToRankConfraPlayer: (idGathering, idPlayer) =>
      router.push({ name: ROUTES.RANK_CONFRA_JOGADOR, params: { idGathering, idPlayer } })
  }
}
