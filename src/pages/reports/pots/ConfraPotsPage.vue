<template>
  <q-page class="page-bg">
    <!-- CARD DA CONFRA -->
    <div class="q-pa-md">
      <ConfraHeaderCard :confraSummary="confraSummary" />
    </div>

    <!-- CARD DOS POTES -->
    <div class="q-pa-md">
      <ConfraBodyCard :confraSummary="confraSummary" />
    </div>

    <!-- LISTA DE EVENTOS -->
    <div class="q-pa-md q-gutter-md">
      <EventCard
        v-for="event in eventList"
        :key="event.id"
        :event="event"
        showPots
        @open="openEvent(event)"
      />
    </div>
  </q-page>
</template>

<script setup>
  import { computed } from 'vue'
  import { useRoute } from 'vue-router'

  import ConfraBodyCard from 'src/components/confras/ConfraBodyCard.vue'
  import ConfraHeaderCard from 'src/components/confras/ConfraHeaderCard.vue'
  import EventCard from 'src/components/events/EventCard.vue'

  import { useConfraStore } from 'src/stores/confra'
  import { useEventStore } from 'src/stores/event'
  import { useRoundNavigator } from 'src/composables/navigation'

  /* ROUTES */
  const route = useRoute()
  const idGathering = Number(route.params.id)

  /* STORES */
  const confraStore = useConfraStore()
  const eventStore = useEventStore()
  const { goToRounds } = useRoundNavigator()

  /* CONFRA CARD */
  const confraSummary = computed(() => confraStore.getConfraSummary(idGathering))

  /* LISTA DE EVENTOS */
  const eventList = computed(() => eventStore.getEventsByGathering(idGathering))

  /* NAVEGAÇÃO */
  function openEvent(event) {
    goToRounds(event.id)
  }
</script>
