import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useFormatTypeStore = defineStore('formatType', () => {
  const types = ref([
    { id: 1, label: 'Cartas', icon: 'style' },
    { id: 2, label: 'Diversos', icon: 'lightbulb' },
    { id: 3, label: 'Eletrônicos', icon: 'sports_esports' },
    { id: 4, label: 'Papel e Caneta', icon: 'assignment' },
    { id: 5, label: 'Tabuleiro', icon: 'casino' }
  ])

  function getType(id) {
    return types.value.find(t => t.id === id)
  }

  return { types, getType }
})
