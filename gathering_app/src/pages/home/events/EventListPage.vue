<template>
  <EventListBase showAddButton @add="openAddForm" @open="openEvent" />
</template>

<script setup>
  import EventListBase from 'src/components/events/EventListBase.vue'
  import { useRouter } from 'vue-router'
  const router = useRouter()

  function openAddForm() {
    router.push({ name: 'event-form' })
  }

  function openEvent(item) {
    router.push({ name: 'event-form', params: { id: item.id } })
  }
</script>
