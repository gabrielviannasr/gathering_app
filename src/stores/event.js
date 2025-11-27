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
        name: 'Conquest',
        idFormatType: 1,
        type: {
          id: 1,
          label: 'Cartas',
          icon: 'style'
        }
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
          prize: 40,
          loserPot: 10
        },
        {
          id: 2,
          idEvent: 1,
          players: 6,
          prize: 45,
          loserPot: 15
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
