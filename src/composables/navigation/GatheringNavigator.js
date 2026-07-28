import { useRouter } from 'vue-router'
import { ROUTES } from 'src/router/routes.enum'

export function useGatheringNavigator() {
  const router = useRouter()

  return {
    goToGatherings: () => router.push({ name: ROUTES.CONFRAS }),
    goToGatheringNew: () => router.push({ name: ROUTES.CONFRAS_NEW }),
    goToGatheringEdit: id => router.push({ name: ROUTES.CONFRAS_EDIT, params: { id } }),

    goToGatheringFormats: id => router.push({ name: ROUTES.CONFRAS_FORMATS, params: { id } }),
    goToGatheringPots: id => router.push({ name: ROUTES.CONFRAS_POTS, params: { id } }),
    goToGatheringWinrate: id => router.push({ name: ROUTES.CONFRAS_WINRATE, params: { id } })
  }
}
