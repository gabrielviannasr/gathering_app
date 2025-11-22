import { useRouter } from 'vue-router'

export function useRoundNavigator() {
  const router = useRouter()

  // lista de eventos com rodadas
  const goToRoundEvents = () => router.push({ name: 'rodadas-eventos' })

  // lista de rodadas de um evento
  const goToRounds = idEvent => router.push({ name: 'rodadas', params: { idEvent } })

  // criar nova rodada
  const goToNewRound = idEvent => router.push({ name: 'rodadas-new', params: { idEvent } })

  // editar rodada existente
  const goToEditRound = (idEvent, round) =>
    router.push({
      name: 'rodadas-edit',
      params: { idEvent, round }
    })

  return {
    goToRoundEvents,
    goToRounds,
    goToNewRound,
    goToEditRound
  }
}
