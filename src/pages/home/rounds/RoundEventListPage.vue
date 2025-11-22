<template>
  <EventListBase @open="openRounds" />
</template>

<script setup>
  import EventListBase from 'src/components/events/EventListBase.vue'
  import { useRoundNavigator } from 'src/composables/navigation'

  const { goToRounds } = useRoundNavigator()

  function openRounds(item) {
    goToRounds(item.id)
  }
</script>
