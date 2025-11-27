import { useRouter } from 'vue-router'

export function useRuleNavigator() {
  const router = useRouter()

  const goToRules = () => router.push({ name: 'rules' })

  return {
    goToRules
  }
}
