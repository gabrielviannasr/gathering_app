import { defineStore } from 'pinia'
import { api } from 'boot/axios'
import { ref } from 'vue'

export const useTransactionStore = defineStore('transaction', () => {
  const path = '/transaction'
  const transactions = ref([])

  // const transactions = ref([
  //   {
  //     id: 163,
  //     idGathering: 1,
  //     idEvent: 1,
  //     idPlayer: 7,
  //     idTransactionType: 1,
  //     createdAt: '2025-11-09T03:38:30.377Z',
  //     amount: -20.0,
  //     description: 'Evento Commander'
  //   },
  //   {
  //     id: 164,
  //     idGathering: 1,
  //     idEvent: 1,
  //     idPlayer: 7,
  //     idTransactionType: 2,
  //     createdAt: '2025-11-09T03:38:30.377Z',
  //     amount: 50.0,
  //     description: '1º Lugar - Commander'
  //   },
  //   {
  //     id: 165,
  //     idGathering: 1,
  //     idEvent: 1,
  //     idPlayer: 6,
  //     idTransactionType: 1,
  //     createdAt: '2025-11-09T03:38:30.377Z',
  //     amount: -20.0,
  //     description: 'Evento Commander'
  //   },
  //   {
  //     id: 166,
  //     idGathering: 1,
  //     idEvent: 1,
  //     idPlayer: 6,
  //     idTransactionType: 2,
  //     createdAt: '2025-11-09T03:38:30.377Z',
  //     amount: 30.0,
  //     description: '2º Lugar - Commander'
  //   },
  //   {
  //     id: 167,
  //     idGathering: 1,
  //     idEvent: 1,
  //     idPlayer: 2,
  //     idTransactionType: 1,
  //     createdAt: '2025-11-09T03:38:30.377Z',
  //     amount: -20.0,
  //     description: 'Evento Commander'
  //   },
  //   {
  //     id: 168,
  //     idGathering: 1,
  //     idEvent: 1,
  //     idPlayer: 2,
  //     idTransactionType: 2,
  //     createdAt: '2025-11-09T03:38:30.377Z',
  //     amount: -5.0,
  //     description: '3º Lugar - Commander'
  //   },
  //   {
  //     id: 169,
  //     idGathering: 1,
  //     idEvent: 1,
  //     idPlayer: 8,
  //     idTransactionType: 1,
  //     createdAt: '2025-11-09T03:38:30.377Z',
  //     amount: -20.0,
  //     description: 'Evento Commander'
  //   },
  //   {
  //     id: 170,
  //     idGathering: 1,
  //     idEvent: 1,
  //     idPlayer: 8,
  //     idTransactionType: 2,
  //     createdAt: '2025-11-09T03:38:30.377Z',
  //     amount: -15.0,
  //     description: '4º Lugar - Commander'
  //   },
  //   {
  //     id: 171,
  //     idGathering: 1,
  //     idEvent: 1,
  //     idPlayer: 1,
  //     idTransactionType: 1,
  //     createdAt: '2025-11-09T03:38:30.377Z',
  //     amount: -20.0,
  //     description: 'Evento Commander'
  //   },
  //   {
  //     id: 172,
  //     idGathering: 1,
  //     idEvent: 1,
  //     idPlayer: 1,
  //     idTransactionType: 2,
  //     createdAt: '2025-11-09T03:38:30.377Z',
  //     amount: -25.0,
  //     description: '5º Lugar - Commander'
  //   },
  //   {
  //     id: 173,
  //     idGathering: 1,
  //     idEvent: 1,
  //     idPlayer: 5,
  //     idTransactionType: 1,
  //     createdAt: '2025-11-09T03:38:30.377Z',
  //     amount: -20.0,
  //     description: 'Evento Commander'
  //   },
  //   {
  //     id: 174,
  //     idGathering: 1,
  //     idEvent: 1,
  //     idPlayer: 5,
  //     idTransactionType: 2,
  //     createdAt: '2025-11-09T03:38:30.377Z',
  //     amount: -35.0,
  //     description: '6º Lugar - Commander'
  //   },
  //   {
  //     id: 175,
  //     idGathering: 1,
  //     idEvent: 1,
  //     idPlayer: 3,
  //     idTransactionType: 1,
  //     createdAt: '2025-11-09T03:38:30.377Z',
  //     amount: -20.0,
  //     description: 'Evento Commander'
  //   },
  //   {
  //     id: 176,
  //     idGathering: 1,
  //     idEvent: 1,
  //     idPlayer: 3,
  //     idTransactionType: 2,
  //     createdAt: '2025-11-09T03:38:30.377Z',
  //     amount: 0.0,
  //     description: '7º Lugar - Commander'
  //   },
  //   {
  //     id: 177,
  //     idGathering: 1,
  //     idEvent: 1,
  //     idPlayer: 4,
  //     idTransactionType: 1,
  //     createdAt: '2025-11-09T03:38:30.377Z',
  //     amount: -20.0,
  //     description: 'Evento Commander'
  //   },
  //   {
  //     id: 178,
  //     idGathering: 1,
  //     idEvent: 1,
  //     idPlayer: 4,
  //     idTransactionType: 2,
  //     createdAt: '2025-11-09T03:38:30.377Z',
  //     amount: 0.0,
  //     description: '7º Lugar - Commander'
  //   },
  //   {
  //     id: 66,
  //     idGathering: 1,
  //     idEvent: null,
  //     idPlayer: 1,
  //     idTransactionType: 3,
  //     createdAt: '2025-11-11T20:35:10.959Z',
  //     amount: 100.0,
  //     description: null
  //   }
  // ])

  async function getTransactionsPage(params) {
    try {
      const res = await api.get(`${path}/page`, { params })
      this.transactions = res.data
      return this.transactions
    } catch (err) {
      return err
    }
  }

  const getByPlayer = idPlayer => transactions.value.filter(t => t.idPlayer === idPlayer)

  const getById = id => transactions.value.find(t => t.id === Number(id))

  function add(transaction) {
    transaction.id = Date.now()
    transactions.value.push(transaction)
  }

  function update(transaction) {
    const index = transactions.value.findIndex(t => t.id === transaction.id)
    if (index >= 0) transactions.value[index] = transaction
  }

  function remove(id) {
    const index = transactions.value.findIndex(t => t.id === id)
    if (index !== -1) {
      transactions.value.splice(index, 1)
    }
  }

  return {
    transactions,
    getTransactionsPage,
    getByPlayer,
    getById,
    add,
    update,
    remove
  }
})
