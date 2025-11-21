<template>
  <EventListBase @open="openRank" />
</template>

<script setup>
  import EventListBase from 'src/components/events/EventListBase.vue'
  import { useRouter } from 'vue-router'
  const router = useRouter()

  function openRank(item) {
    router.push({ name: 'rank', params: { idEvent: item.id } })
  }
</script>
