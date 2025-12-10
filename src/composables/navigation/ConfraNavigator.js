import { useRouter } from 'vue-router'
import { ROUTES } from 'src/router/routes.enum'

export function useConfraNavigator() {
  const router = useRouter()

  return {
    goToConfras: () => router.push({ name: ROUTES.CONFRAS }),
    goToConfraNew: () => router.push({ name: ROUTES.CONFRAS_NEW }),
    goToConfraEdit: id => router.push({ name: ROUTES.CONFRAS_EDIT, params: { id } }),

    goToConfraFormats: id => router.push({ name: ROUTES.CONFRAS_FORMATS, params: { id } }),
    goToConfraPots: id => router.push({ name: ROUTES.CONFRAS_POTS, params: { id } }),
    goToConfraWinrate: id => router.push({ name: ROUTES.CONFRAS_WINRATE, params: { id } })
  }
}
