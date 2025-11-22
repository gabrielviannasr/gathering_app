<template>
  <EventListBase @open="openRank" />
</template>

<script setup>
  import EventListBase from 'src/components/events/EventListBase.vue'
  import { useRankNavigator } from 'src/composables/navigation'

  const { goToRankEvent } = useRankNavigator()

  function openRank(item) {
    goToRankEvent(item.id)
  }
</script>
