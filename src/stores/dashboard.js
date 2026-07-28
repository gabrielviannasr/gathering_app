import { defineStore } from 'pinia'
import { api } from 'boot/axios'
import { ref } from 'vue'

export const useDashboardStore = defineStore('dashboard', () => {
  const path = '/dashboard'
  const gatheringFormats = ref([])
  const gatheringResult = ref(null)
  const gatheringResults = ref([])
  const gatheringSummary = ref(null)
  const wallet = ref(null)
  const wallets = ref([])

  async function getGatheringFormats(idGathering) {
    try {
      const res = await api.get(`${path}/format/${idGathering}`)
      gatheringFormats.value = res.data
      return gatheringFormats.value
    } catch (err) {
      return err
    }
  }

  async function getGatheringResults(idGathering) {
    try {
      const res = await api.get(`${path}/result/${idGathering}`)
      gatheringResults.value = res.data
      return gatheringResults.value
    } catch (err) {
      return err
    }
  }

  async function getGatheringResult(idGathering, idPlayer) {
    try {
      const res = await api.get(`${path}/result/${idGathering}/player/${idPlayer}`)
      gatheringResult.value = res.data
      return gatheringResult.value
    } catch (err) {
      return err
    }
  }

  async function getGatheringSummary(idGathering) {
    try {
      const res = await api.get(`${path}/summary/${idGathering}`)
      gatheringSummary.value = res.data
      return gatheringSummary.value
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
    gatheringFormats,
    gatheringResult,
    gatheringResults,
    gatheringSummary,
    wallets,
    wallet,
    getGatheringFormats,
    getGatheringResults,
    getGatheringResult,
    getGatheringSummary,
    getWallets,
    getWallet
  }
})
