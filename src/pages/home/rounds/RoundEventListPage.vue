<template>
  <EventListBase @open="openRounds" />
</template>

<script setup>
  import EventListBase from 'src/components/events/EventListBase.vue'
  import { useRoundNavigator } from 'src/composables/navigation'
  import { onMounted } from 'vue'
  import { useConfraStore } from 'src/stores/confra'
  import { useEventStore } from 'src/stores/event'
  import { useFormatStore } from 'src/stores/format'

  const { goToRounds } = useRoundNavigator()

  const confraStore = useConfraStore()
  const eventStore = useEventStore()
  const formatStore = useFormatStore()

  function openRounds(item) {
    goToRounds(item.id)
  }

  // carregar ao abrir
  onMounted(load)

  async function load() {
    await formatStore.getFormats()
    // se tiver confra selecionada, carrega os eventos dela
    if (confraStore.selectedConfra?.id) {
      await eventStore.getEvents({ idGathering: confraStore.selectedConfra?.id })
    }
  }
</script>
