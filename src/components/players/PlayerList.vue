<template>
  <!-- LISTA -->
  <PlayerCard
    v-for="player in props.players"
    :key="player.id"
    :player="player"
    @click="emit('select', player)"
    class="list-card"
  />
</template>

<script setup>
  import PlayerCard from 'src/components/players/PlayerCard.vue'

  const props = defineProps({
    players: { type: Array, required: true }
  })

  const emit = defineEmits(['select'])
</script>
