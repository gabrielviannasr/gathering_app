import { defineStore } from 'pinia'
import { api } from 'boot/axios'
import { ref } from 'vue'

export const useResultStore = defineStore('result', () => {
  const path = '/result'
  const result = ref(null)
  const results = ref([])

  async function getResults(idEvent) {
    try {
      const res = await api.get(`${path}/${idEvent}`)
      results.value = res.data
      return results.value
    } catch (err) {
      return err
    }
  }

  async function getResultsByPlayer(idEvent, idPlayer) {
    try {
      const res = await api.get(`${path}/${idEvent}/player/${idPlayer}`)
      result.value = res.data
      return result.value
    } catch (err) {
      return err
    }
  }

  return {
    result,
    results,
    getResults,
    getResultsByPlayer
  }
})
