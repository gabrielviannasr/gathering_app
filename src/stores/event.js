import { defineStore } from 'pinia'
import { api } from 'boot/axios'
import { ref } from 'vue'

export const useEventStore = defineStore('event', () => {
  const path = '/event'

  const event = ref(null)
  const events = ref([])

  async function getEvent(id) {
    const res = await api.get(`${path}/${id}`)
    event.value = res.data
    return event.value
  }

  async function getEvents(params) {
    const res = await api.get(`${path}`, { params })
    events.value = res.data
    return events.value
  }

  async function getEventsPage(params) {
    const res = await api.get(`${path}/page`, { params })
    events.value = res.data
    return events.value
  }

  async function createEvent(data) {
    const res = await api.post(`${path}`, data)
    return res.data
  }

  async function updateEvent(id, data) {
    const res = await api.put(`${path}/${id}`, data)
    return res.data
  }

  return {
    event,
    events,

    getEvent,
    getEvents,
    getEventsPage,

    createEvent,
    updateEvent
  }
})
