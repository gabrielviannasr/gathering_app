<template>
  <PlayerListBase
    :players="players"
    :filters="filters"
    showAddButton
    :showWalletInfo="false"
    @add="onAdd"
    @select="openPlayer"
  />
</template>

<script setup>
  import PlayerListBase from 'src/components/players/PlayerListBase.vue'
  // eslint-disable-next-line no-unused-vars
  import { ref, computed } from 'vue'
  import { usePlayerNavigator } from 'src/composables/navigation'

  const { goToNewPlayer, goToEditPlayer } = usePlayerNavigator()

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

  function onAdd() {
    goToNewPlayer()
  }

  function openPlayer(player) {
    goToEditPlayer(player.id)
  }
</script>
