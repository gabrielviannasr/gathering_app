import { useRouter } from 'vue-router'
import { ROUTES } from 'src/router/routes.enum'

export function useEventNavigator() {
  const router = useRouter()

  return {
    goToEvents: () => router.push({ name: ROUTES.EVENTOS }),
    goToEventNew: () => router.push({ name: ROUTES.EVENTOS_NEW }),
    goToEventEdit: id => router.push({ name: ROUTES.EVENTOS_EDIT, params: { id } })
  }
}
