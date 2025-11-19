import { defineStore } from 'pinia'

import { api } from 'boot/axios'

const URI = '/player'

export const playerStore = defineStore('player', {
  state: () => ({
    current: {
      id: null,
      name: null,
      username: null,
      password: null,
      email: null,
      wallet: 0,
    },
    /** @type {{ id: number, name: text: username: text, password: text, email: text, wallet: number }[]} */
    list: [],
  }),

  getters: {
    player: (state) => state.current,
    players: (state) => state.list,
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
  },
})
