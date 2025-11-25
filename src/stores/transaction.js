import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTransactionStore = defineStore('transaction', () => {
  const transactions = ref([
    {
      id: 163,
      idGathering: 1,
      idEvent: 2,
      idPlayer: 7,
      idTransactionType: 1,
      createdAt: '2025-11-09T03:38:30.377Z',
      amount: -20.0,
      description: 'Evento Commander'
    },
    {
      id: 164,
      idGathering: 1,
      idEvent: 2,
      idPlayer: 7,
      idTransactionType: 2,
      createdAt: '2025-11-09T03:38:30.377Z',
      amount: 50.0,
      description: '1º Lugar - Commander'
    },
    {
      id: 165,
      idGathering: 1,
      idEvent: 2,
      idPlayer: 6,
      idTransactionType: 1,
      createdAt: '2025-11-09T03:38:30.377Z',
      amount: -20.0,
      description: 'Evento Commander'
    },
    {
      id: 166,
      idGathering: 1,
      idEvent: 2,
      idPlayer: 6,
      idTransactionType: 2,
      createdAt: '2025-11-09T03:38:30.377Z',
      amount: 30.0,
      description: '2º Lugar - Commander'
    },
    {
      id: 167,
      idGathering: 1,
      idEvent: 2,
      idPlayer: 2,
      idTransactionType: 1,
      createdAt: '2025-11-09T03:38:30.377Z',
      amount: -20.0,
      description: 'Evento Commander'
    },
    {
      id: 168,
      idGathering: 1,
      idEvent: 2,
      idPlayer: 2,
      idTransactionType: 2,
      createdAt: '2025-11-09T03:38:30.377Z',
      amount: -5.0,
      description: '3º Lugar - Commander'
    },
    {
      id: 169,
      idGathering: 1,
      idEvent: 2,
      idPlayer: 8,
      idTransactionType: 1,
      createdAt: '2025-11-09T03:38:30.377Z',
      amount: -20.0,
      description: 'Evento Commander'
    },
    {
      id: 170,
      idGathering: 1,
      idEvent: 2,
      idPlayer: 8,
      idTransactionType: 2,
      createdAt: '2025-11-09T03:38:30.377Z',
      amount: -15.0,
      description: '4º Lugar - Commander'
    },
    {
      id: 171,
      idGathering: 1,
      idEvent: 2,
      idPlayer: 1,
      idTransactionType: 1,
      createdAt: '2025-11-09T03:38:30.377Z',
      amount: -20.0,
      description: 'Evento Commander'
    },
    {
      id: 172,
      idGathering: 1,
      idEvent: 2,
      idPlayer: 1,
      idTransactionType: 2,
      createdAt: '2025-11-09T03:38:30.377Z',
      amount: -25.0,
      description: '5º Lugar - Commander'
    },
    {
      id: 173,
      idGathering: 1,
      idEvent: 2,
      idPlayer: 5,
      idTransactionType: 1,
      createdAt: '2025-11-09T03:38:30.377Z',
      amount: -20.0,
      description: 'Evento Commander'
    },
    {
      id: 174,
      idGathering: 1,
      idEvent: 2,
      idPlayer: 5,
      idTransactionType: 2,
      createdAt: '2025-11-09T03:38:30.377Z',
      amount: -35.0,
      description: '6º Lugar - Commander'
    },
    {
      id: 175,
      idGathering: 1,
      idEvent: 2,
      idPlayer: 3,
      idTransactionType: 1,
      createdAt: '2025-11-09T03:38:30.377Z',
      amount: -20.0,
      description: 'Evento Commander'
    },
    {
      id: 176,
      idGathering: 1,
      idEvent: 2,
      idPlayer: 3,
      idTransactionType: 2,
      createdAt: '2025-11-09T03:38:30.377Z',
      amount: 0.0,
      description: '7º Lugar - Commander'
    },
    {
      id: 177,
      idGathering: 1,
      idEvent: 2,
      idPlayer: 4,
      idTransactionType: 1,
      createdAt: '2025-11-09T03:38:30.377Z',
      amount: -20.0,
      description: 'Evento Commander'
    },
    {
      id: 178,
      idGathering: 1,
      idEvent: 2,
      idPlayer: 4,
      idTransactionType: 2,
      createdAt: '2025-11-09T03:38:30.377Z',
      amount: 0.0,
      description: '7º Lugar - Commander'
    },
    {
      id: 66,
      idGathering: 1,
      idEvent: null,
      idPlayer: 1,
      idTransactionType: 3,
      createdAt: '2025-11-11T20:35:10.959Z',
      amount: 100.0,
      description: null
    }
  ])

  return {
    transactions
  }
})
