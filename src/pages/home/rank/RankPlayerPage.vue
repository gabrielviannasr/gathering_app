<template>
  <q-page v-if="result || gatheringResult" class="page-bg">
    <!-- HEADER DINÂMICO -->
    <div class="q-pa-md">
      <EventCard :showArrow="false" :event="event" v-if="isEvent" />

      <GatheringSummaryCard v-else :gatheringSummary="gatheringSummary" />
    </div>

    <!-- RANK DETAIL -->
    <div class="q-pa-md">
      <RankDetailCard :data="isEvent ? result : gatheringResult" />
    </div>
  </q-page>
</template>

<script setup>
  /* VUE */
  import { computed, onMounted } from 'vue'
  import { useRoute, useRouter } from 'vue-router'

  /* STORES */
  import { useEventStore } from 'src/stores/event'
  import { useResultStore } from 'src/stores/result'
  import { useDashboardStore } from 'src/stores/dashboard'

  /* CONSTANTS */
  import { ROUTES } from 'src/router/routes.enum.js'

  /* COMPONENTS */
  import EventCard from 'src/components/events/EventCard.vue'
  import GatheringSummaryCard from 'src/components/gatherings/GatheringSummaryCard.vue'
  import RankDetailCard from 'src/components/ranks/RankDetailCard.vue'

  /* ROUTES */
  const route = useRoute()
  const router = useRouter()

  /* PARAMS */
  const idEvent = Number(route.params.idEvent)
  const idGathering = Number(route.params.idGathering)
  const idPlayer = Number(route.params.idPlayer)

  /* STORES */
  const eventStore = useEventStore()
  const resultStore = useResultStore()
  const dashboardStore = useDashboardStore()

  /* COMPUTED */
  const event = computed(() => eventStore.event)
  const gatheringResult = computed(() => dashboardStore.gatheringResult)
  const gatheringSummary = computed(() => dashboardStore.gatheringSummary)
  const result = computed(() => resultStore.result)

  const isEvent = computed(() => {
    return route.name === ROUTES.RANK_EVENTO_JOGADOR
  })

  /* LIFECYCLE */
  onMounted(async () => {
    await load()
  })

  /* FUNCTIONS */
  async function load() {
    if (isEvent.value) {
      await eventStore.getEvent(idEvent)

      if (!event.value) {
        console.warn('EVENT NOT FOUND:', idEvent)
        router.back()
        return
      }

      await resultStore.getResult(idEvent, idPlayer)
    } else {
      await dashboardStore.getGatheringSummary(idGathering)

      if (!gatheringSummary.value) {
        console.warn('GATHERING SUMMARY NOT FOUND:', idGathering)
        router.back()
        return
      }
      await dashboardStore.getGatheringResult(idGathering, idPlayer)
    }
  }
</script>
