// src/stores/useConfraStore.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useConfraStore = defineStore('confra', () => {
  // Lista de confras cadastradas
  const confras = ref([
    { id: 1, name: 'DIRETORIA', year: 2024 },
    { id: 2, name: 'DIRETORIA 2.0', year: 2025 }
  ])

  // Resumo (mock da view vw_gathering_summary)
  const confraSummary = ref([
    {
      idGathering: 1,
      gatheringName: 'DIRETORIA',
      year: 2024,
      events: 1,
      players: 8,
      rounds: 8,
      loserPot: 120.0,
      confraPot: 160.0,
      prize: 360.0
    }
  ])

  // Confra ativa (selecionada)
  const selectedConfra = ref({ id: null, name: null, year: null })

  function setConfra(confra) {
    selectedConfra.value = confra
  }

  /* ------------------------------------------
     Retorna uma confra da lista base
  ------------------------------------------ */
  function getConfraById(id) {
    return confras.value.find(c => c.id === id) || null
  }

  /* ------------------------------------------
     Retorna o resumo da confra:
     - Se existir no confraSummary → retorna
     - Se não existir → gera fallback com zeros
  ------------------------------------------ */
  function getConfraCard(idGathering) {
    // tenta encontrar na view de resumo
    const summary = confraSummary.value.find(s => s.idGathering === idGathering)

    if (summary) return summary

    // fallback: busca apenas nome/ano
    const base = getConfraById(idGathering)

    // se nem a confra existir, retorna algo neutro
    if (!base) {
      return {
        idGathering,
        gatheringName: '—',
        events: 0,
        players: 0,
        rounds: 0,
        loserPot: 0.0,
        confraPot: 0.0,
        prize: 0.0
      }
    }

    // confra existe, mas não tem resumo → retorna tudo 0
    return {
      idGathering: idGathering,
      gatheringName: base.name,
      events: 0,
      players: 0,
      rounds: 0,
      loserPot: 0.0,
      confraPot: 0.0,
      prize: 0.0
    }
  }

  return {
    confras,
    selectedConfra,
    setConfra,
    getConfraById,
    getConfraCard
  }
})
