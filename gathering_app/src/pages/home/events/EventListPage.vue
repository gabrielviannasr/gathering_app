<template>
  <EventListBase showAddButton @add="openAddForm" @open="openEvent" />
</template>

<script setup>
  import EventListBase from 'src/components/events/EventListBase.vue'
  import { useRouter } from 'vue-router'
  const router = useRouter()

  function openAddForm() {
    router.push({ name: 'eventos-new' })
  }

  function openEvent(item) {
    router.push({ name: 'eventos-edit', params: { id: item.id } })
  }
</script>
