import { boot } from 'quasar/wrappers'
import { useConfraStore } from 'src/stores/confra'

export default boot(() => {
  const confraStore = useConfraStore()
  confraStore.loadConfra()
})
