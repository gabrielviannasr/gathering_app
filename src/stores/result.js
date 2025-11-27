// src/stores/result.js
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useResultStore = defineStore('result', () => {
  // MOCKUP → será substituído pela API futuramente
  const result = ref([
    {
      id: 81,
      idEvent: 1,
      idPlayer: 7,
      rank: 1,
      wins: 2,
      rounds: 4,
      positive: 90.0,
      negative: 40.0,
      rankBalance: 50.0,
      loserPot: 0.0,
      finalBalance: 50.0
    },
    {
      id: 82,
      idEvent: 1,
      idPlayer: 6,
      rank: 2,
      wins: 2,
      rounds: 6,
      positive: 90.0,
      negative: 60.0,
      rankBalance: 30.0,
      loserPot: 0.0,
      finalBalance: 30.0
    },
    {
      id: 83,
      idEvent: 1,
      idPlayer: 2,
      rank: 3,
      wins: 1,
      rounds: 5,
      positive: 45.0,
      negative: 50.0,
      rankBalance: -5.0,
      loserPot: 0.0,
      finalBalance: -5.0
    },
    {
      id: 84,
      idEvent: 1,
      idPlayer: 8,
      rank: 4,
      wins: 1,
      rounds: 6,
      positive: 45.0,
      negative: 60.0,
      rankBalance: -15.0,
      loserPot: 0.0,
      finalBalance: -15.0
    },
    {
      id: 85,
      idEvent: 1,
      idPlayer: 1,
      rank: 5,
      wins: 1,
      rounds: 7,
      positive: 45.0,
      negative: 70.0,
      rankBalance: -25.0,
      loserPot: 0.0,
      finalBalance: -25.0
    },
    {
      id: 86,
      idEvent: 1,
      idPlayer: 5,
      rank: 6,
      wins: 1,
      rounds: 8,
      positive: 45.0,
      negative: 80.0,
      rankBalance: -35.0,
      loserPot: 0.0,
      finalBalance: -35.0
    },
    {
      id: 87,
      idEvent: 1,
      idPlayer: 3,
      rank: 7,
      wins: 0,
      rounds: 6,
      positive: 0.0,
      negative: 60.0,
      rankBalance: -60.0,
      loserPot: 60.0,
      finalBalance: 0.0
    },
    {
      id: 88,
      idEvent: 1,
      idPlayer: 4,
      rank: 7,
      wins: 0,
      rounds: 6,
      positive: 0.0,
      negative: 60.0,
      rankBalance: -60.0,
      loserPot: 60.0,
      finalBalance: 0.0
    }
  ])

  function getResultByEvent(idEvent) {
    return result.value.filter(r => r.idEvent === idEvent)
  }

  return {
    result,
    getResultByEvent
  }
})
