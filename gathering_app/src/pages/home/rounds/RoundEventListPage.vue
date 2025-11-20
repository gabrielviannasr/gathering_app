<template>
  <EventListBase @open="openRounds" />
</template>

<script setup>
  import EventListBase from 'src/components/events/EventListBase.vue'
  import { useRouter } from 'vue-router'
  const router = useRouter()

  function openRounds(item) {
    router.push({ name: 'round-list', params: { idEvent: item.id } })
  }
</script>
