import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTransactionStore = defineStore('transaction', () => {
  const transactions = ref([
    {
      id: 163,
      id_gathering: 1,
      id_event: 1,
      id_player: 7,
      id_transaction_type: 1,
      created_at: '2025-11-09T03:38:30.377Z',
      amount: -20.0,
      description: 'Evento Commander'
    },
    {
      id: 164,
      id_gathering: 1,
      id_event: 1,
      id_player: 7,
      id_transaction_type: 2,
      created_at: '2025-11-09T03:38:30.377Z',
      amount: 50.0,
      description: '1º Lugar - Commander'
    },
    {
      id: 165,
      id_gathering: 1,
      id_event: 1,
      id_player: 6,
      id_transaction_type: 1,
      created_at: '2025-11-09T03:38:30.377Z',
      amount: -20.0,
      description: 'Evento Commander'
    },
    // ... (continue com todas as transações mock)
    {
      id: 66,
      id_gathering: 1,
      id_event: null,
      id_player: 1,
      id_transaction_type: 3,
      created_at: '2025-11-11T20:35:10.959Z',
      amount: 100.0,
      description: null
    }
  ])

  return {
    transactions
  }
})
