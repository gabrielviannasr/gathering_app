import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useWalletStore = defineStore('wallet', () => {
  const wallets = ref([
    {
      idGathering: 1,
      gatheringName: 'DIRETORIA',
      idPlayer: 1,
      playerName: 'Anderson Dias',
      wallet: 55.0,
      events: 1
    },
    {
      idGathering: 1,
      gatheringName: 'DIRETORIA',
      idPlayer: 2,
      playerName: 'Arthur Leal',
      wallet: -25.0,
      events: 1
    },
    {
      idGathering: 1,
      gatheringName: 'DIRETORIA',
      idPlayer: 3,
      playerName: 'Cindomar Ferreira',
      wallet: -20.0,
      events: 1
    },
    {
      idGathering: 1,
      gatheringName: 'DIRETORIA',
      idPlayer: 4,
      playerName: 'Gabriel Vianna',
      wallet: -20.0,
      events: 1
    },
    {
      idGathering: 1,
      gatheringName: 'DIRETORIA',
      idPlayer: 5,
      playerName: 'Jean Benevides',
      events: 1,
      wallet: -55.0
    },
    {
      idGathering: 1,
      gatheringName: 'DIRETORIA',
      idPlayer: 6,
      playerName: 'Jhonny Dias',
      events: 1,
      wallet: 10.0
    },
    {
      idGathering: 1,
      gatheringName: 'DIRETORIA',
      idPlayer: 7,
      playerName: 'Tobias Souza',
      events: 1,
      wallet: 30.0
    },
    {
      idGathering: 1,
      gatheringName: 'DIRETORIA',
      idPlayer: 8,
      playerName: 'Valmir Vicente',
      events: 1,
      wallet: -35.0
    }
  ])

  function getWallet(idPlayer) {
    return wallets.value.find(w => w.idPlayer === idPlayer)
  }

  return {
    wallets,
    getWallet
  }
})
