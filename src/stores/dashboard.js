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
    const res = await api.get(`${path}/format/${idGathering}`)
    gatheringFormats.value = res.data
    return gatheringFormats.value
  }

  async function getGatheringResults(idGathering) {
    const res = await api.get(`${path}/result/${idGathering}`)
    gatheringResults.value = res.data
    return gatheringResults.value
  }

  async function getGatheringResult(idGathering, idPlayer) {
    const res = await api.get(`${path}/result/${idGathering}/player/${idPlayer}`)
    gatheringResult.value = res.data
    return gatheringResult.value
  }

  async function getGatheringSummary(idGathering) {
    try {
      const res = await api.get(`${path}/summary/${idGathering}`)
      gatheringSummary.value = res.data
    } catch {
      gatheringSummary.value = null
    }
    return gatheringSummary.value
  }

  async function getWallets(idGathering) {
    const res = await api.get(`${path}/wallet/${idGathering}`)
    wallets.value = res.data
    return wallets.value
  }

  async function getWallet(idGathering, idPlayer) {
    const res = await api.get(`${path}/wallet/${idGathering}/player/${idPlayer}`)
    wallet.value = res.data
    return wallet.value
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
