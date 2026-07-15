<template>
  <!-- LISTA -->
  <PlayerCard
    v-for="player in props.players"
    :key="player.id"
    :player="player"
    :wallet="props.wallets[player.id]"
    :showWalletInfo="props.showWalletInfo"
    @click="emit('select', player)"
    class="list-card"
  />
</template>

<script setup>
  import PlayerCard from 'src/components/players/PlayerCard.vue'

  const props = defineProps({
    players: { type: Array, required: true },
    showWalletInfo: { type: Boolean, default: false }, // <-- NOVO
    wallets: { type: Object, default: () => ({}) } // <-- wallet opcional
  })

  const emit = defineEmits(['select'])
</script>
