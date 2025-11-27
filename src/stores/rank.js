// src/stores/rank.js
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useRankStore = defineStore('rank', () => {
  // MOCKUP → será substituído pela API futuramente
  const rank = ref([
    { idEvent: 1, idPlayer: 7, rank: 1, wins: 2, rounds: 4 },
    { idEvent: 1, idPlayer: 6, rank: 2, wins: 2, rounds: 6 },
    { idEvent: 1, idPlayer: 2, rank: 3, wins: 1, rounds: 5 },
    { idEvent: 1, idPlayer: 8, rank: 4, wins: 1, rounds: 6 },
    { idEvent: 1, idPlayer: 1, rank: 5, wins: 1, rounds: 7 },
    { idEvent: 1, idPlayer: 5, rank: 6, wins: 1, rounds: 8 },
    { idEvent: 1, idPlayer: 3, rank: 7, wins: 0, rounds: 6 },
    { idEvent: 1, idPlayer: 4, rank: 7, wins: 0, rounds: 6 }
  ])

  function getRankByEvent(idEvent) {
    return rank.value.filter(r => r.idEvent === idEvent)
  }

  return {
    rank,
    getRankByEvent
  }
})
