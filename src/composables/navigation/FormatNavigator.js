import { useRouter } from 'vue-router'
import { ROUTES } from 'src/router/routes.enum'

export function useFormatNavigator() {
  const router = useRouter()

  return {
    goToFormats: () => router.push({ name: ROUTES.FORMATOS }),
    goToFormatNew: () => router.push({ name: ROUTES.FORMATOS_NEW }),
    goToFormatEdit: id => router.push({ name: ROUTES.FORMATOS_EDIT, params: { id } })
  }
}
