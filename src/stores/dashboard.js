import { defineStore } from 'pinia'
import { api } from 'boot/axios'
import { ref } from 'vue'

export const useDashboardStore = defineStore('dashboard', () => {
  const path = '/dashboard'
  const confraResult = ref(null)
  const confraResults = ref([])
  const confraSummary = ref(null)

  async function getConfraResults(idGathering) {
    try {
      const res = await api.get(`${path}/result/${idGathering}`)
      confraResults.value = res.data
      return confraResults.value
    } catch (err) {
      return err
    }
  }

  async function getConfraResultByPlayer(idGathering, idPlayer) {
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

  return {
    confraResult,
    confraResults,
    confraSummary,
    getConfraResults,
    getConfraResultByPlayer,
    getConfraSummary
  }
})
