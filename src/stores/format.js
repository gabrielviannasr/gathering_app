import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useFormatStore = defineStore('format', () => {
  const formats = ref([
    { id: 1, name: 'Commander', lifeCount: 40, idFormatType: 1 },
    { id: 2, name: 'Conquest', lifeCount: 30, idFormatType: 1 },
    { id: 3, name: 'Tiny Leader', lifeCount: 30, idFormatType: 1 },
    { id: 4, name: 'Detetive', lifeCount: 0, idFormatType: 5 },
    { id: 5, name: 'Gartic', lifeCount: 0, idFormatType: 3 },
    { id: 6, name: 'Porrinha', lifeCount: 0, idFormatType: 2 },
    { id: 7, name: 'Stop', lifeCount: 0, idFormatType: 4 }
  ])

  function getFormat(id) {
    return formats.value.find(f => f.id === id)
  }

  return { formats, getFormat }
})
