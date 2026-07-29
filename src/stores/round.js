import { defineStore } from 'pinia'
import { api } from 'boot/axios'
import { ref } from 'vue'

export const useRoundStore = defineStore('round', () => {
  const path = idEvent => `/event/${idEvent}/round`
  const round = ref(null)
  const rounds = ref([])

  async function getRound(idEvent, roundNumber) {
    const res = await api.get(`${path(idEvent)}/${roundNumber}`)
    round.value = res.data
    return round.value
  }

  async function getRounds(idEvent, params) {
    try {
      const res = await api.get(`${path(idEvent)}`, { params })
      rounds.value = res.data
      return rounds.value
    } catch (err) {
      return err
    }
  }

  async function getRoundsPage(idEvent, params) {
    try {
      const res = await api.get(`${path(idEvent)}/page`, { params })
      rounds.value = res.data
      return rounds.value
    } catch (err) {
      return err
    }
  }

  async function createRound(idEvent, data) {
    const res = await api.post(path(idEvent), data)
    return res.data
  }

  async function updateRound(idEvent, round, data) {
    const res = await api.put(`${path(idEvent)}/${round}`, data)
    return res.data
  }

  return {
    round,
    rounds,
    getRound,
    getRounds,
    getRoundsPage,
    createRound,
    updateRound
  }
})
