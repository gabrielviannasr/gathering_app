import { useRouter } from 'vue-router'

export function useEventNavigator() {
  const router = useRouter()

  const goToEvents = () => router.push({ name: 'eventos' })
  const goToNewEvent = () => router.push({ name: 'eventos-new' })
  const goToEditEvent = id => router.push({ name: 'eventos-edit', params: { id } })

  return {
    goToEvents,
    goToNewEvent,
    goToEditEvent
  }
}
