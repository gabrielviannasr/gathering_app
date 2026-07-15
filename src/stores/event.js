import { defineStore } from 'pinia'
import { api } from 'boot/axios'
import { ref } from 'vue'

export const useEventStore = defineStore('event', () => {
  const path = '/event'
  const event = ref(null)
  const events = ref([])

  async function getEvent(id) {
    try {
      const res = await api.get(`${path}/${id}`)
      this.event = res.data
      return this.event
    } catch (err) {
      return err
    }
  }

  async function getEvents(params) {
    try {
      const res = await api.get(`${path}`, { params })
      this.events = res.data
      return this.events
    } catch (err) {
      return err
    }
  }

  async function getEventsPage(params) {
    try {
      const res = await api.get(`${path}/page`, { params })
      this.events = res.data
      return this.events
    } catch (err) {
      return err
    }
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
