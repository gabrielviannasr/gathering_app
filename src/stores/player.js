import { defineStore } from 'pinia'
import { api } from 'boot/axios'
import { ref } from 'vue'

export const usePlayerStore = defineStore('player', () => {
  const path = '/player'

  const player = ref(null)
  const players = ref([])

  async function getPlayer(id) {
    const res = await api.get(`${path}/${id}`)
    player.value = res.data
    return player.value
  }

  async function getPlayers(params) {
    const res = await api.get(`${path}`, { params })
    players.value = res.data
    return players.value
  }

  async function getPlayersPage(params) {
    const res = await api.get(`${path}/page`, { params })
    players.value = res.data
    return players.value
  }

  async function createPlayer(data) {
    const res = await api.post(`${path}`, data)
    return res.data
  }

  async function updatePlayer(id, data) {
    const res = await api.put(`${path}/${id}`, data)
    return res.data
  }

  return {
    player,
    players,

    getPlayer,
    getPlayers,
    getPlayersPage,

    createPlayer,
    updatePlayer
  }
})
