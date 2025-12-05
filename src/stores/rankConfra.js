import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useRankConfraStore = defineStore('rankConfra', () => {
  const rankConfra = ref([
    // == SEU MOCK ==
    // cole aqui o mock fornecido no enunciado
    {
      idGathering: 1,
      gatheringName: 'DIRETORIA',
      idPlayer: 7,
      playerName: 'Tobias Souza',
      rank: 1,
      events: 1,
      wins: 2,
      rounds: 4,
      positive: 90.0,
      negative: 40.0,
      rankBalance: 50.0,
      loserPot: 0.0,
      confraPot: -20.0,
      finalBalance: 30.0
    },
    {
      idGathering: 1,
      gatheringName: 'DIRETORIA',
      idPlayer: 6,
      playerName: 'Jhonny Dias',
      rank: 2,
      events: 1,
      wins: 2,
      rounds: 6,
      positive: 90.0,
      negative: 60.0,
      rankBalance: 30.0,
      loserPot: 0.0,
      confraPot: -20.0,
      finalBalance: 10.0
    },
    {
      idGathering: 1,
      gatheringName: 'DIRETORIA',
      idPlayer: 2,
      playerName: 'Arthur Leal',
      rank: 3,
      events: 1,
      wins: 1,
      rounds: 5,
      positive: 45.0,
      negative: 50.0,
      rankBalance: -5.0,
      loserPot: 0.0,
      confraPot: -20.0,
      finalBalance: -25.0
    },
    {
      idGathering: 1,
      gatheringName: 'DIRETORIA',
      idPlayer: 8,
      playerName: 'Valmir Vicente',
      rank: 4,
      events: 1,
      wins: 1,
      rounds: 6,
      positive: 45.0,
      negative: 60.0,
      rankBalance: -15.0,
      loserPot: 0.0,
      confraPot: -20.0,
      finalBalance: -35.0
    },
    {
      idGathering: 1,
      gatheringName: 'DIRETORIA',
      idPlayer: 1,
      playerName: 'Anderson Dias',
      rank: 5,
      events: 1,
      wins: 1,
      rounds: 7,
      positive: 45.0,
      negative: 70.0,
      rankBalance: -25.0,
      loserPot: 0.0,
      confraPot: -20.0,
      finalBalance: -45.0
    },
    {
      idGathering: 1,
      gatheringName: 'DIRETORIA',
      idPlayer: 5,
      playerName: 'Jean Benevides',
      rank: 6,
      events: 1,
      wins: 1,
      rounds: 8,
      positive: 45.0,
      negative: 80.0,
      rankBalance: -35.0,
      loserPot: 0.0,
      confraPot: -20.0,
      finalBalance: -55.0
    },
    {
      idGathering: 1,
      gatheringName: 'DIRETORIA',
      idPlayer: 3,
      playerName: 'Cindomar Ferreira',
      rank: 7,
      events: 1,
      wins: 0,
      rounds: 6,
      positive: 0.0,
      negative: 60.0,
      rankBalance: -60.0,
      loserPot: 60.0,
      confraPot: -20.0,
      finalBalance: -20.0
    },
    {
      idGathering: 1,
      gatheringName: 'DIRETORIA',
      idPlayer: 4,
      playerName: 'Gabriel Vianna',
      rank: 7,
      events: 1,
      wins: 0,
      rounds: 6,
      positive: 0.0,
      negative: 60.0,
      rankBalance: -60.0,
      loserPot: 60.0,
      confraPot: -20.0,
      finalBalance: -20.0
    }
  ])

  function getRankByGathering(idGathering) {
    return rankConfra.value.filter(r => r.idGathering === idGathering)
  }

  return {
    rankConfra,
    getRankByGathering
  }
})
