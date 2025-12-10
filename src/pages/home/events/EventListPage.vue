<template>
  <EventListBase showAddButton @add="openAddForm" @open="openEvent" />
</template>

<script setup>
  import EventListBase from 'src/components/events/EventListBase.vue'
  import { useEventNavigator } from 'src/composables/navigation'

  const { goToEventNew, goToEditEvent } = useEventNavigator()

  function openAddForm() {
    console.log('Adicionar evento')
    goToEventNew()
  }

  function openEvent(item) {
    console.log('Abrir evento', item)
    goToEditEvent(item.id)
  }
</script>
