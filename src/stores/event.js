import { defineStore } from 'pinia'
import { api } from 'boot/axios'
import { ref } from 'vue'

export const useEventStore = defineStore('event', () => {
  const event = ref(null)
  const events = ref([
    // {
    //   id: 1,
    //   idGathering: 1,
    //   idFormat: 2,
    //   format: {
    //     id: 2,
    //     name: 'Conquest',
    //     idFormatType: 1,
    //     type: {
    //       id: 1,
    //       label: 'Cartas',
    //       icon: 'style'
    //     }
    //   },
    //   createdAt: '2025-11-09T03:38:30.377Z',
    //   players: 8,
    //   rounds: 8,
    //   confraFee: 20.0,
    //   roundFee: 10.0,
    //   loserPot: 120.0,
    //   confraPot: 160.0,
    //   prize: 360.0,
    //   fees: [
    //     {
    //       id: 1,
    //       idEvent: 1,
    //       players: 5,
    //       prize: 40,
    //       loserPot: 10
    //     },
    //     {
    //       id: 2,
    //       idEvent: 1,
    //       players: 6,
    //       prize: 45,
    //       loserPot: 15
    //     }
    //   ]
    // }
  ])

  async function getEvent(id) {
    // return events.value.find(e => e.id === id) || null
    try {
      const res = await api.get(`/event/${id}`)
      this.event = res.data
      return this.event
    } catch (err) {
      return err
    }
  }

  async function getEvents(params) {
    try {
      const res = await api.get(`/event`, { params })
      this.events = res.data
      return this.events
    } catch (err) {
      return err
    }
  }

  async function createEvent(data) {
    const res = await api.post('/event', data)
    return res.data
  }

  async function updateEvent(id, data) {
    const res = await api.put(`/event/${id}`, data)
    return res.data
  }

  function getEventsByGathering(idGathering) {
    return events.value.filter(e => e.idGathering === idGathering)
  }

  return {
    event,
    events,
    getEvent,
    getEvents,
    getEventsByGathering,
    createEvent,
    updateEvent
  }
})
