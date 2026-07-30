<template>
  <q-page class="page-bg" v-if="gatheringSummary">
    <!-- CARD DA CONFRA -->
    <div class="q-pa-md">
      <GatheringSummaryCard :gatheringSummary="gatheringSummary" />
    </div>

    <!-- CARD DOS POTES -->
    <div class="q-pa-md">
      <PotSummaryCard :pots="gatheringSummary" />
    </div>

    <!-- LISTA -->
    <div class="q-pa-md q-gutter-md" v-if="events.length > 0">
      <EventCard
        v-for="event in events"
        :key="event.id"
        :event="event"
        class="list-card"
        @click="openEvent(event)"
      />
    </div>
  </q-page>
</template>

<script setup>
  /* VUE */
  import { computed, onMounted } from 'vue'
  import { useRoute, useRouter } from 'vue-router'

  /* STORES */
  import { useDashboardStore } from 'src/stores/dashboard'
  import { useEventStore } from 'src/stores/event'

  /* COMPOSABLES */
  import { useRankNavigator } from 'src/composables/navigation'

  /* COMPONENTS */
  import EventCard from 'src/components/events/EventCard.vue'
  import GatheringSummaryCard from 'src/components/gatherings/GatheringSummaryCard.vue'
  import PotSummaryCard from 'src/components/pots/PotSummaryCard.vue'

  /* COMPOSABLES */
  const { goToRankEvent } = useRankNavigator()

  /* ROUTES */
  const route = useRoute()
  const router = useRouter()

  /* PARAMS */
  const idGathering = Number(route.params.id)

  /* STORES */
  const dashboardStore = useDashboardStore()
  const eventStore = useEventStore()

  /* COMPUTED */
  const gatheringSummary = computed(() => dashboardStore.gatheringSummary)
  const events = computed(() => eventStore.events ?? [])

  /* LIFECYCLE */
  onMounted(async () => {
    await load()
  })

  /* FUNCTIONS */
  async function load() {
    await dashboardStore.getGatheringSummary(idGathering)

    if (!gatheringSummary.value) {
      console.warn('GATHERING SUMMARY NOT FOUND:', idGathering)
      router.back()
      return
    }

    await eventStore.getEvents({ idGathering })
  }

  function openEvent(event) {
    goToRankEvent(event.id)
  }
</script>
