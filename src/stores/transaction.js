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
    {
      id: 166,
      id_gathering: 1,
      id_event: 1,
      id_player: 6,
      id_transaction_type: 2,
      created_at: '2025-11-09T03:38:30.377Z',
      amount: 30.0,
      description: '2º Lugar - Commander'
    },
    {
      id: 167,
      id_gathering: 1,
      id_event: 1,
      id_player: 2,
      id_transaction_type: 1,
      created_at: '2025-11-09T03:38:30.377Z',
      amount: -20.0,
      description: 'Evento Commander'
    },
    {
      id: 168,
      id_gathering: 1,
      id_event: 1,
      id_player: 2,
      id_transaction_type: 2,
      created_at: '2025-11-09T03:38:30.377Z',
      amount: -5.0,
      description: '3º Lugar - Commander'
    },
    {
      id: 169,
      id_gathering: 1,
      id_event: 1,
      id_player: 8,
      id_transaction_type: 1,
      created_at: '2025-11-09T03:38:30.377Z',
      amount: -20.0,
      description: 'Evento Commander'
    },
    {
      id: 170,
      id_gathering: 1,
      id_event: 1,
      id_player: 8,
      id_transaction_type: 2,
      created_at: '2025-11-09T03:38:30.377Z',
      amount: -15.0,
      description: '4º Lugar - Commander'
    },
    {
      id: 171,
      id_gathering: 1,
      id_event: 1,
      id_player: 1,
      id_transaction_type: 1,
      created_at: '2025-11-09T03:38:30.377Z',
      amount: -20.0,
      description: 'Evento Commander'
    },
    {
      id: 172,
      id_gathering: 1,
      id_event: 1,
      id_player: 1,
      id_transaction_type: 2,
      created_at: '2025-11-09T03:38:30.377Z',
      amount: -25.0,
      description: '5º Lugar - Commander'
    },
    {
      id: 173,
      id_gathering: 1,
      id_event: 1,
      id_player: 5,
      id_transaction_type: 1,
      created_at: '2025-11-09T03:38:30.377Z',
      amount: -20.0,
      description: 'Evento Commander'
    },
    {
      id: 174,
      id_gathering: 1,
      id_event: 1,
      id_player: 5,
      id_transaction_type: 2,
      created_at: '2025-11-09T03:38:30.377Z',
      amount: -35.0,
      description: '6º Lugar - Commander'
    },
    {
      id: 175,
      id_gathering: 1,
      id_event: 1,
      id_player: 3,
      id_transaction_type: 1,
      created_at: '2025-11-09T03:38:30.377Z',
      amount: -20.0,
      description: 'Evento Commander'
    },
    {
      id: 176,
      id_gathering: 1,
      id_event: 1,
      id_player: 3,
      id_transaction_type: 2,
      created_at: '2025-11-09T03:38:30.377Z',
      amount: 0.0,
      description: '7º Lugar - Commander'
    },
    {
      id: 177,
      id_gathering: 1,
      id_event: 1,
      id_player: 4,
      id_transaction_type: 1,
      created_at: '2025-11-09T03:38:30.377Z',
      amount: -20.0,
      description: 'Evento Commander'
    },
    {
      id: 178,
      id_gathering: 1,
      id_event: 1,
      id_player: 4,
      id_transaction_type: 2,
      created_at: '2025-11-09T03:38:30.377Z',
      amount: 0.0,
      description: '7º Lugar - Commander'
    },
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
