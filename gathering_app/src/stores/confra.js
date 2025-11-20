// src/stores/confra.js
import { defineStore, acceptHMRUpdate } from 'pinia'
import { ref } from 'vue'

export const useConfraStore = defineStore('confra', () => {
  // estado inicial mock
  const name = ref('DIRETORIA')
  const year = ref(2025)

  function setConfra(newName, newYear) {
    name.value = newName
    year.value = newYear
  }

  return { name, year, setConfra }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useConfraStore, import.meta.hot))
}
