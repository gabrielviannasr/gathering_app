import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useEventStore = defineStore('event', () => {
  const events = ref([
    {
      id: 1,
      idGathering: 1,
      idFormat: 2,
      format: {
        id: 2,
        name: 'Conquest'
      },
      createdAt: '2025-11-09T03:38:30.377Z',
      players: 8,
      rounds: 8,
      confraFee: 20.0,
      roundFee: 10.0,
      loserPot: 120.0,
      confraPot: 160.0,
      prize: 360.0,
      fees: [
        {
          id: 1,
          idEvent: 1,
          players: 5,
          prizeFee: 40,
          loserFee: 10
        },
        {
          id: 2,
          idEvent: 1,
          players: 6,
          prizeFee: 45,
          loserFee: 15
        }
      ]
    }
  ])

  function getEvent(id) {
    return events.value.find(e => e.id === id) || null
  }

  return {
    events,
    getEvent
  }
})
