import { defineStore } from 'pinia'
import { api } from 'boot/axios'
import { ref } from 'vue'

export const useFormatStore = defineStore('format', () => {
  const path = '/format'

  const format = ref(null)
  const formats = ref([])

  async function getFormat(id) {
    const res = await api.get(`${path}/${id}`)
    format.value = res.data
    return format.value
  }

  async function getFormats(params) {
    const res = await api.get(`${path}`, { params })
    formats.value = res.data
    return formats.value
  }

  async function getFormatsPage(params) {
    const res = await api.get(`${path}/page`, { params })
    formats.value = res.data
    return formats.value
  }

  async function createFormat(data) {
    const res = await api.post(`${path}`, data)
    return res.data
  }

  async function updateFormat(id, data) {
    const res = await api.put(`${path}/${id}`, data)
    return res.data
  }

  return {
    format,
    formats,

    getFormat,
    getFormats,
    getFormatsPage,

    createFormat,
    updateFormat
  }
})
