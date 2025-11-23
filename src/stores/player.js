import { defineStore } from 'pinia'
import { ref } from 'vue'

export const usePlayerStore = defineStore('player', () => {
  const players = ref([
    { id: 1, name: 'Anderson Dias' },
    { id: 2, name: 'Arthur Leal' },
    { id: 3, name: 'Cindomar Ferreira' },
    { id: 4, name: 'Gabriel Vianna' },
    { id: 5, name: 'Jean Benevides' },
    { id: 6, name: 'Jhonny Dias' },
    { id: 7, name: 'Tobias Souza' },
    { id: 8, name: 'Valmir Vicente' }
  ])

  function getPlayer(id) {
    return players.value.find(p => p.id === id)
  }

  return {
    players,
    getPlayer
  }
})
