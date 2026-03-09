// src/stores/useConfraStore.ts
import { defineStore } from 'pinia'
import { api } from 'boot/axios'
import { ref } from 'vue'
import { LocalStorage } from 'quasar'

export const useConfraStore = defineStore('confra', () => {
  const selectedConfra = ref({ id: null, name: null, year: null })
  const confra = ref(null)
  const confras = ref([
    // { id: 1, name: 'DIRETORIA', year: 2024 },
    // { id: 2, name: 'DIRETORIA 2.0', year: 2025 }
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

  /* ------------------------------------------
     Retorna uma confra da lista base
  ------------------------------------------ */
  // function getConfraById(id) {
  //   return confras.value.find(c => c.id === id) || null
  // }

  /* ------------------------------------------
     Retorna o resumo da confra:
     - Se existir no confraSummary → retorna
     - Se não existir → gera fallback com zeros
  ------------------------------------------ */
  function getConfraSummary(idGathering) {
    // tenta encontrar na view de resumo
    const summary = confraSummary.value.find(s => s.idGathering === idGathering)

    if (summary) return summary

    // fallback: busca apenas nome/ano
    const base = getConfra(idGathering)

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

  async function getConfras(params) {
    try {
      const res = await api.get(`/gathering`, { params })
      this.confras = res.data
      return this.confras
    } catch (err) {
      return err
    }
  }

  async function getConfra(id) {
    // return confras.value.find(p => p.id === id)
    try {
      const res = await api.get(`/gathering/${id}`)
      this.confra = res.data
      return this.confra
    } catch (err) {
      return err
    }
  }

  async function createConfra(data) {
    const res = await api.post('/gathering', data)
    return res.data
  }

  async function updateConfra(id, data) {
    const res = await api.put(`/gathering/${id}`, data)
    return res.data
  }

  return {
    confra,
    confras,
    selectedConfra,
    setConfra,
    loadConfra,
    // getConfraById,
    getConfra,
    getConfras,
    createConfra,
    updateConfra,
    getConfraSummary
  }
})
