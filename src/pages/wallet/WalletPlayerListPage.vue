<template>
  <PlayerListBase
    :players="players"
    :filters="filters"
    :wallets="walletStore.walletsByPlayer"
    :showWalletInfo="true"
    @select="openWalletPlayer"
  />
</template>

<script setup>
  import PlayerListBase from 'src/components/players/PlayerListBase.vue'
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { useWalletStore } from 'src/stores/wallet'

  const walletStore = useWalletStore()

  const router = useRouter()

  const filters = ref({ name: '' })

  const players = [
    { id: 1, name: 'Anderson Dias' },
    { id: 2, name: 'Arthur Leal' },
    { id: 3, name: 'Cindomar Ferreira' },
    { id: 4, name: 'Gabriel Vianna' },
    { id: 5, name: 'Jean Benevides' },
    { id: 6, name: 'Jhonny Dias' },
    { id: 7, name: 'Tobias Souza' },
    { id: 8, name: 'Valmir Vicente' }
  ]

  function openWalletPlayer(player) {
    router.push({ name: 'carteira-jogador', params: { idPlayer: player.id } })
  }
</script>
