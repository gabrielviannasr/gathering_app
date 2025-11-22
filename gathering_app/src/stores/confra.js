// src/stores/useConfraStore.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useConfraStore = defineStore('confra', () => {
  const confras = ref([
    { id: 1, name: 'L.I.M.P.A.', year: 2023 },
    { id: 2, name: 'DIRETORIA', year: 2024 },
    { id: 3, name: 'DIRETORIA 2.0', year: 2025 }
  ])

  // confra ativa
  const selectedConfra = ref(confras.value[0])

  function setConfra(confra) {
    console.log('setConfra', confra)
    selectedConfra.value = confra
  }

  return {
    confras,
    selectedConfra,
    setConfra
  }
})
