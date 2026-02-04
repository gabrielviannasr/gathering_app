<template>
  <PlayerListBase
    :players="playerStore.players"
    :filters="filters"
    showAddButton
    :showWalletInfo="false"
    @add="onAdd"
    @select="openPlayer"
  />
</template>

<script setup>
  import PlayerListBase from 'src/components/players/PlayerListBase.vue'
  import { ref, onMounted, watch } from 'vue'
  import { usePlayerNavigator } from 'src/composables/navigation'
  import { usePlayerStore } from 'src/stores/player'

  const { goToPlayerNew, goToPlayerEdit } = usePlayerNavigator()
  const playerStore = usePlayerStore()

  const filters = ref({ name: '' })

  // carregar ao abrir
  onMounted(load)

  // recarregar ao mudar filtro
  watch(filters, load, { deep: true })

  async function load() {
    await playerStore.getPlayers(filters.value)
  }

  function onAdd() {
    goToPlayerNew()
  }

  function openPlayer(player) {
    goToPlayerEdit(player.id)
  }
</script>
