import { defineStore } from 'pinia'
import { api } from 'boot/axios'
import { ref } from 'vue'

export const usePlayerStore = defineStore('player', () => {
  const player = ref(null)
  const players = ref([
    // { id: 1, name: 'Anderson Dias' },
    // { id: 2, name: 'Arthur Leal' },
    // { id: 3, name: 'Cindomar Ferreira' },
    // { id: 4, name: 'Gabriel Vianna' },
    // { id: 5, name: 'Jean Benevides' },
    // { id: 6, name: 'Jhonny Dias' },
    // { id: 7, name: 'Tobias Souza' },
    // { id: 8, name: 'Valmir Vicente' }
  ])

  async function getPlayers(params) {
    try {
      const res = await api.get(`/player`, { params })
      this.players = res.data
      return this.players
    } catch (err) {
      return err
    }
  }

  async function getPlayer(id) {
    // return players.value.find(p => p.id === id)
    try {
      const res = await api.get(`/player/${id}`)
      this.player = res.data
      return this.player
    } catch (err) {
      return err
    }
  }

  async function createPlayer(data) {
    const res = await api.post('/player', data)
    return res.data
  }

  async function updatePlayer(id, data) {
    const res = await api.put(`/player/${id}`, data)
    return res.data
  }

  return {
    player,
    players,
    getPlayer,
    getPlayers,
    createPlayer,
    updatePlayer
  }
})
