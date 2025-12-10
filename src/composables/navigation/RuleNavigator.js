import { useRouter } from 'vue-router'
import { ROUTES } from 'src/router/routes.enum'

export function useRuleNavigator() {
  const router = useRouter()

  return {
    goToRules: () => router.push({ name: ROUTES.RULES })
  }
}
