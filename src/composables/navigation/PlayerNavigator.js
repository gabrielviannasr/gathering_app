import { useRouter } from 'vue-router'
import { ROUTES } from 'src/router/routes.enum'

export function usePlayerNavigator() {
  const router = useRouter()

  return {
    goToPlayers: () => router.push({ name: ROUTES.JOGADORES }),
    goToPlayerNew: () => router.push({ name: ROUTES.JOGADORES_NEW }),
    goToPlayerEdit: id => router.push({ name: ROUTES.JOGADORES_EDIT, params: { id } })
  }
}
