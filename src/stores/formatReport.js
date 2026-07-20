import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useFormatReportStore = defineStore('formatReport', () => {
  const formats = ref([])
  const formatSummary = ref([
    {
      idGathering: 1,
      gatheringName: 'DIRETORIA',
      idFormat: 1,
      formatName: 'Commander',
      rounds: 3
    },
    {
      idGathering: 1,
      gatheringName: 'DIRETORIA',
      idFormat: 2,
      formatName: 'Conquest',
      rounds: 3
    },
    {
      idGathering: 1,
      gatheringName: 'DIRETORIA',
      idFormat: 3,
      formatName: 'Tiny Leader',
      rounds: 2
    }
  ])

  function getByGathering(idGathering) {
    formats.value = formatSummary.value.filter(f => f.idGathering === idGathering)
    return formats.value
  }

  return { formats, formatSummary, getByGathering }
})
