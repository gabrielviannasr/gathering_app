import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTransactionTypeStore = defineStore('transactionType', () => {
  const types = ref([
    { id: 1, name: 'Inscrição', icon: 'local_activity' },
    { id: 2, name: 'Resultado', icon: 'emoji_events' },
    { id: 3, name: 'Depósito', icon: 'arrow_upward' },
    { id: 4, name: 'Saque', icon: 'arrow_downward' }
  ])

  function getType(id) {
    return types.value.find(t => t.id === id)
  }

  function getWalletTypes() {
    return types.value.filter(t => t.id === 3 || t.id === 4)
  }

  return {
    types,
    getType,
    getWalletTypes
  }
})
