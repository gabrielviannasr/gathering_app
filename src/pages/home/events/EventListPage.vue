<template>
  <EventListBase showAddButton @add="onAdd" @open="openEvent" />
</template>

<script setup>
  import EventListBase from 'src/components/events/EventListBase.vue'
  import { ref, onMounted, watch } from 'vue'
  import { useEventNavigator } from 'src/composables/navigation'
  import { useEventStore } from 'src/stores/event'
  import { useFormatStore } from 'src/stores/format'

  const { goToEventNew, goToEditEvent } = useEventNavigator()
  const eventStore = useEventStore()
  const formatStore = useFormatStore()

  const filters = ref({ name: '' })

  // carregar ao abrir
  onMounted(load)

  // recarregar ao mudar filtro
  watch(filters, load, { deep: true })

  async function load() {
    await eventStore.getEvents(filters.value)
    await formatStore.getFormats()
  }

  function onAdd() {
    console.log('Adicionar evento')
    goToEventNew()
  }

  function openEvent(item) {
    console.log('Abrir evento', item)
    goToEditEvent(item.id)
  }
</script>
