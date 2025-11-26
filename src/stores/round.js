import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useRoundStore = defineStore('round', () => {
  const rounds = ref([
    {
      id: 1,
      idEvent: 1,
      idFormat: 1,
      idPlayerWinner: 5,
      createdAt: '2025-11-09T03:38:30.377Z',
      round: 1,
      players: 6,
      prize: 45.0,
      loserPot: 15.0,
      canceled: false
    },
    {
      id: 2,
      idEvent: 1,
      idFormat: 1,
      idPlayerWinner: 7,
      createdAt: '2025-11-09T03:38:30.377Z',
      round: 2,
      players: 6,
      prize: 45.0,
      loserPot: 15.0,
      canceled: false
    },
    {
      id: 3,
      idEvent: 1,
      idFormat: 1,
      idPlayerWinner: 8,
      createdAt: '2025-11-09T03:38:30.377Z',
      round: 3,
      players: 6,
      prize: 45.0,
      loserPot: 15.0,
      canceled: false
    },
    {
      id: 4,
      idEvent: 1,
      idFormat: 2,
      idPlayerWinner: 1,
      createdAt: '2025-11-09T03:38:30.377Z',
      round: 4,
      players: 6,
      prize: 45.0,
      loserPot: 15.0,
      canceled: false
    },
    {
      id: 5,
      idEvent: 1,
      idFormat: 2,
      idPlayerWinner: 7,
      createdAt: '2025-11-09T03:38:30.377Z',
      round: 5,
      players: 6,
      prize: 45.0,
      loserPot: 15.0,
      canceled: false
    },
    {
      id: 6,
      idEvent: 1,
      idFormat: 2,
      idPlayerWinner: 6,
      createdAt: '2025-11-09T03:38:30.377Z',
      round: 6,
      players: 6,
      prize: 45.0,
      loserPot: 15.0,
      canceled: false
    },
    {
      id: 7,
      idEvent: 1,
      idFormat: 3,
      idPlayerWinner: 2,
      createdAt: '2025-11-09T03:38:30.377Z',
      round: 7,
      players: 6,
      prize: 45.0,
      loserPot: 15.0,
      canceled: false
    },
    {
      id: 8,
      idEvent: 1,
      idFormat: 3,
      idPlayerWinner: 6,
      createdAt: '2025-11-09T03:38:30.377Z',
      round: 8,
      players: 6,
      prize: 45.0,
      loserPot: 15.0,
      canceled: false
    }
  ])

  // 🔍 Buscar um round pelo id
  function getRound(id) {
    return rounds.value.find(r => r.id === id) || null
  }

  // 🔍 Buscar round pela combinação (evento + número da rodada)
  function getRoundByNumber(idEvent, roundNumber) {
    return rounds.value.find(r => r.idEvent === idEvent && r.round === roundNumber) || null
  }

  // 🔍 Buscar todos os rounds de um evento
  function getRoundsByEvent(idEvent) {
    return rounds.value.filter(r => r.idEvent === idEvent)
  }

  // 📝 Futuro: adicionar round
  function addRound(round) {
    rounds.value.push(round)
  }

  // 📝 Futuro: editar round
  function updateRound(id, data) {
    const index = rounds.value.findIndex(r => r.id === id)
    if (index !== -1) {
      rounds.value[index] = { ...rounds.value[index], ...data }
    }
  }

  return {
    rounds,
    getRound,
    getRoundByNumber,
    getRoundsByEvent,
    addRound,
    updateRound
  }
})
