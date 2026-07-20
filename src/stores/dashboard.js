import { defineStore } from 'pinia'
import { api } from 'boot/axios'
import { ref } from 'vue'

export const useDashboardStore = defineStore('dashboard', () => {
  const path = '/dashboard'
  const confraFormats = ref([])
  const confraResult = ref(null)
  const confraResults = ref([])
  const confraSummary = ref(null)
  const wallet = ref(null)
  const wallets = ref([])

  async function getConfraFormats(idGathering) {
    try {
      const res = await api.get(`${path}/format/${idGathering}`)
      confraFormats.value = res.data
      return confraFormats.value
    } catch (err) {
      return err
    }
  }

  async function getConfraResults(idGathering) {
    try {
      const res = await api.get(`${path}/result/${idGathering}`)
      confraResults.value = res.data
      return confraResults.value
    } catch (err) {
      return err
    }
  }

  async function getConfraResult(idGathering, idPlayer) {
    try {
      const res = await api.get(`${path}/result/${idGathering}/player/${idPlayer}`)
      confraResult.value = res.data
      return confraResult.value
    } catch (err) {
      return err
    }
  }

  async function getConfraSummary(idGathering) {
    try {
      const res = await api.get(`${path}/summary/${idGathering}`)
      confraSummary.value = res.data
      return confraSummary.value
    } catch (err) {
      return err
    }
  }

  async function getWallets(idGathering) {
    try {
      const res = await api.get(`${path}/wallet/${idGathering}`)
      wallets.value = res.data
      return wallets.value
    } catch (err) {
      return err
    }
  }

  async function getWallet(idGathering, idPlayer) {
    try {
      const res = await api.get(`${path}/wallet/${idGathering}/player/${idPlayer}`)
      wallet.value = res.data
      return wallet.value
    } catch (err) {
      return err
    }
  }

  return {
    confraFormats,
    confraResult,
    confraResults,
    confraSummary,
    wallets,
    wallet,
    getConfraFormats,
    getConfraResults,
    getConfraResult,
    getConfraSummary,
    getWallets,
    getWallet
  }
})
