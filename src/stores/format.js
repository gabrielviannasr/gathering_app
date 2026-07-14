import { defineStore } from 'pinia'
import { api } from 'boot/axios'
import { ref } from 'vue'

export const useFormatStore = defineStore('format', () => {
  const path = '/format'
  const format = ref(null)
  const formats = ref([
    //   { id: 1, name: 'Commander', lifeCount: 40, idFormatType: 1 },
    //   { id: 2, name: 'Conquest', lifeCount: 30, idFormatType: 1 },
    //   { id: 3, name: 'Tiny Leader', lifeCount: 30, idFormatType: 1 },
    //   { id: 4, name: 'Detetive', lifeCount: 0, idFormatType: 5 },
    //   { id: 5, name: 'Gartic', lifeCount: 0, idFormatType: 3 },
    //   { id: 6, name: 'Porrinha', lifeCount: 0, idFormatType: 2 },
    //   { id: 7, name: 'Stop', lifeCount: 0, idFormatType: 4 }
  ])

  async function getFormats(params) {
    try {
      const res = await api.get(`${path}/page`, { params })
      this.formats = res.data
      return this.formats
    } catch (err) {
      return err
    }
  }

  async function getFormat(id) {
    // return formats.value.find(p => p.id === id)
    try {
      const res = await api.get(`${path}/${id}`)
      this.format = res.data
      return this.format
    } catch (err) {
      return err
    }
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
    createFormat,
    updateFormat
  }
})
