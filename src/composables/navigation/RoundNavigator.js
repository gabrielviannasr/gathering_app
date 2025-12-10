import { useRouter } from 'vue-router'
import { ROUTES } from 'src/router/routes.enum'

export function useRoundNavigator() {
  const router = useRouter()

  return {
    goToRoundEvents: () => router.push({ name: ROUTES.RODADAS_EVENTOS }),
    goToRounds: idEvent => router.push({ name: ROUTES.RODADAS, params: { idEvent } }),
    goToRoundNew: idEvent => router.push({ name: ROUTES.RODADAS_NEW, params: { idEvent } }),
    goToRoundEdit: (idEvent, round) =>
      router.push({ name: ROUTES.RODADAS_EDIT, params: { idEvent, round } })
  }
}
