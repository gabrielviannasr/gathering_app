<template>
  <q-page class="page-bg" v-if="gatheringSummary">
    <!-- CARD DA CONFRA -->
    <div class="q-pa-md">
      <GatheringHeaderCard :gatheringSummary="gatheringSummary" />
    </div>

    <!-- CARD DOS POTES -->
    <div class="q-pa-md">
      <GatheringBodyCard :gatheringSummary="gatheringSummary" />
    </div>

    <!-- LISTA DE EVENTOS -->
    <div class="q-pa-md q-gutter-md" v-if="events.length > 0">
      <EventCard
        v-for="item in events"
        :key="item.id"
        :event="item"
        showPots
        @open="openEvent(item)"
      />
    </div>
  </q-page>
</template>

<script setup>
  import GatheringBodyCard from 'src/components/gatherings/GatheringBodyCard.vue'
  import GatheringHeaderCard from 'src/components/gatherings/GatheringHeaderCard.vue'
  import EventCard from 'src/components/events/EventCard.vue'

  import { computed, onMounted } from 'vue'
  import { useRoute } from 'vue-router'

  import { useRoundNavigator } from 'src/composables/navigation'
  import { useDashboardStore } from 'src/stores/dashboard'
  import { useEventStore } from 'src/stores/event'

  /* NAVIGATION */
  const { goToRounds } = useRoundNavigator()

  const route = useRoute()
  const idGathering = Number(route.params.id)

  /* STORES */
  const dashboardStore = useDashboardStore()
  const eventStore = useEventStore()

  /* COMPUTED */
  const gatheringSummary = computed(() => dashboardStore.gatheringSummary)
  const events = computed(() => eventStore.events)

  /* ---------------- LOAD ---------------- */
  onMounted(async () => {
    await load()
  })

  async function load() {
    await dashboardStore.getGatheringSummary(idGathering)
    await eventStore.getEvents({ idGathering: idGathering })
  }

  function openEvent(event) {
    goToRounds(event.id)
  }
</script>
