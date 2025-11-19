import { defineStore } from 'pinia'

import { api } from 'boot/axios'

const URI = '/gathering'

export const gatheringStore = defineStore('gathering', {
  state: () => ({
    current: {
      id: null,
      name: null,
      year: null,
      idPlayer: null,
      player: {
        username: null,
      },
    },
    /** @type {{ id: number, player: { username: string }, name: string, year: number, idPlayer: number }[]} */
    list: [],
    /** @type {{ id: number, username: string, eventsBalance: number, transactionsBalance: number, finalBalance: number }[]} */
    dashboard: [],
  }),

  getters: {
    gathering: (state) => state.current,
    gatherings: (state) => state.list,
  },

  actions: {
    async getList(payload) {
      try {
        const config = {
          params: payload,
        }
        const response = await api.get(URI, config)
        console.log('response', response)
        this.list = response.data
        return response.data
      } catch (error) {
        throw new Error(error)
      }
    },

    async getPage(payload) {
      try {
        const config = {
          params: payload,
        }
        const response = await api.get(`${URI}/page`, config)
        console.log('response', response)
        this.list = response.data
        return response.data
      } catch (error) {
        throw new Error(error)
      }
    },

    async getById(payload) {
      try {
        const response = await api.get(`${URI}/${payload.id}`)
        console.log('response', response)
        this.current = response.data
        return response.data
      } catch (error) {
        throw new Error(error)
      }
    },

    async save(payload) {
      try {
        const response = await api.post(URI, payload)
        console.log('response', response)
        this.current = response.data
        return response.data
      } catch (error) {
        throw new Error(error)
      }
    },

    async update(payload) {
      try {
        const config = {
          params: { id: payload.id },
        }
        const response = await api.put(URI, payload, config)
        console.log('response', response)
        this.current = response.data
        return response.data
      } catch (error) {
        throw new Error(error)
      }
    },

    async getDashboard(payload) {
      try {
        const response = await api.get(`${URI}/${payload.id}/dashboard`)
        console.log('response', response)
        this.dashboard = response.data
        return response.data
      } catch (error) {
        throw new Error(error)
      }
    },
  },
})
