import { boot } from 'quasar/wrappers'
import { useGatheringStore } from 'src/stores/gathering'

export default boot(() => {
  const gatheringStore = useGatheringStore()
  gatheringStore.loadGathering()
})
