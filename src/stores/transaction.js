import { defineStore } from 'pinia'
import { api } from 'boot/axios'
import { ref } from 'vue'

export const useTransactionStore = defineStore('transaction', () => {
  const path = '/transaction'
  const transaction = ref(null)
  const transactions = ref([])

  async function getTransaction(id) {
    const res = await api.get(`${path}/${id}`)
    transaction.value = res.data
    return transaction.value
  }

  async function getTransactionsPage(params) {
    const res = await api.get(`${path}/page`, { params })
    transactions.value = res.data
    return transactions.value
  }

  async function createTransaction(data) {
    const res = await api.post(`${path}`, data)
    return res.data
  }

  async function updateTransaction(id, data) {
    const res = await api.put(`${path}/${id}`, data)
    return res.data
  }

  async function deleteTransaction(id) {
    const res = await api.delete(`${path}/${id}`)
    return res.data
  }

  return {
    transaction,
    transactions,
    getTransaction,
    getTransactionsPage,
    createTransaction,
    updateTransaction,
    deleteTransaction
  }
})
