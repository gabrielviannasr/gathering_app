import { defineStore } from 'pinia'
import { api } from 'boot/axios'
import { ref } from 'vue'
import { LocalStorage } from 'quasar'

export const useConfraStore = defineStore('confra', () => {
  const path = '/gathering'
  const selectedConfra = ref({ id: null, name: null, year: null })
  const confra = ref(null)
  const confras = ref([])
  const years = ref([])

  function setConfra(confra) {
    selectedConfra.value = confra
    LocalStorage.set('selectedConfra', confra)
  }

  function loadConfra() {
    const saved = LocalStorage.getItem('selectedConfra')
    if (saved) {
      selectedConfra.value = saved
    }
  }

  async function getConfras(params) {
    const res = await api.get(`${path}`, { params })
    confras.value = res.data
    return confras.value
  }

  async function getConfrasPage(params) {
    const res = await api.get(`${path}/page`, { params })
    confras.value = res.data
    return confras.value
  }

  async function getConfra(id) {
    const res = await api.get(`${path}/${id}`)
    confra.value = res.data
    return confra.value
  }

  async function getYears() {
    const res = await api.get(`${path}/year`)
    years.value = res.data
    return years.value
  }

  async function createConfra(data) {
    const res = await api.post(`${path}`, data)
    return res.data
  }

  async function updateConfra(id, data) {
    const res = await api.put(`${path}/${id}`, data)
    return res.data
  }

  return {
    confra,
    confras,
    selectedConfra,
    years,
    setConfra,
    loadConfra,
    getConfra,
    getConfras,
    getConfrasPage,
    getYears,
    createConfra,
    updateConfra
  }
})
