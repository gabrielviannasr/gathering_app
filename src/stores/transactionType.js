import { TransactionType } from 'src/constants/transaction-type'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTransactionTypeStore = defineStore('transactionType', () => {
  const types = ref([
    { id: TransactionType.REGISTRATION, name: 'Inscrição', icon: 'local_activity' },
    { id: TransactionType.RESULT, name: 'Resultado', icon: 'emoji_events' },
    { id: TransactionType.DEPOSIT, name: 'Depósito', icon: 'arrow_upward' },
    { id: TransactionType.WITHDRAW, name: 'Saque', icon: 'arrow_downward' }
  ])

  function getWalletTypes() {
    return types.value.filter(
      t => t.id === TransactionType.DEPOSIT || t.id === TransactionType.WITHDRAW
    )
  }

  function getType(id) {
    return types.value.find(type => type.id === id)
  }

  return {
    types,
    getType,
    getWalletTypes
  }
})
