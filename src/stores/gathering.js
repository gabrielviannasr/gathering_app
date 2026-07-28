import { defineStore } from 'pinia'
import { api } from 'boot/axios'
import { ref } from 'vue'
import { LocalStorage } from 'quasar'

export const useGatheringStore = defineStore('gathering', () => {
  const path = '/gathering'
  const gatheringSelected = ref({ id: null, name: null, year: null })
  const gathering = ref(null)
  const gatherings = ref([])
  const years = ref([])

  function setGathering(gathering) {
    gatheringSelected.value = gathering
    LocalStorage.set('gatheringSelected', gathering)
  }

  function loadGathering() {
    const saved = LocalStorage.getItem('gatheringSelected')
    if (saved) {
      gatheringSelected.value = saved
    }
  }

  async function getGatherings(params) {
    const res = await api.get(`${path}`, { params })
    gatherings.value = res.data
    return gatherings.value
  }

  async function getGatheringsPage(params) {
    const res = await api.get(`${path}/page`, { params })
    gatherings.value = res.data
    return gatherings.value
  }

  async function getGathering(id) {
    const res = await api.get(`${path}/${id}`)
    gathering.value = res.data
    return gathering.value
  }

  async function getYears() {
    const res = await api.get(`${path}/year`)
    years.value = res.data
    return years.value
  }

  async function createGathering(data) {
    const res = await api.post(`${path}`, data)
    return res.data
  }

  async function updateGathering(id, data) {
    const res = await api.put(`${path}/${id}`, data)
    return res.data
  }

  return {
    gathering,
    gatherings,
    gatheringSelected,
    years,

    getGathering,
    getGatherings,
    getGatheringsPage,
    getYears,

    createGathering,
    loadGathering,
    setGathering,
    updateGathering
  }
})
