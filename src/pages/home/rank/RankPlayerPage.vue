<template>
  <q-page v-if="headerData && rankData" class="page-bg">
    <!-- HEADER DINÂMICO -->
    <div class="q-pa-md">
      <EventCard :showArrow="false" :event="headerData" v-if="mode === 'event'" />

      <GatheringSummaryCard v-else :gatheringSummary="headerData" />
    </div>

    <!-- RANK DETAIL -->
    <div class="q-pa-md">
      <RankDetailCard :data="rankData" />
    </div>
  </q-page>
</template>

<script setup>
  /* COMPONENTS */
  import EventCard from 'src/components/events/EventCard.vue'
  import GatheringSummaryCard from 'src/components/gatherings/GatheringSummaryCard.vue'
  import RankDetailCard from 'src/components/ranks/RankDetailCard.vue'

  /* VUE */
  import { computed, onMounted } from 'vue'
  import { useRoute, useRouter } from 'vue-router'

  /* STORES */
  import { useEventStore } from 'src/stores/event'
  import { useResultStore } from 'src/stores/result'
  import { useDashboardStore } from 'src/stores/dashboard'

  /* ROUTES */
  const route = useRoute()
  const router = useRouter()

  /* PARAMS */
  const idEvent = Number(route.params.idEvent)
  const idGathering = Number(route.params.idGathering)
  const idPlayer = Number(route.params.idPlayer)

  const mode = computed(() => {
    return route.name === 'rank-confra-jogador' ? 'confra' : 'event'
  })

  /* STORES */
  const eventStore = useEventStore()
  const resultStore = useResultStore()
  const dashboardStore = useDashboardStore()

  /* COMPUTED */
  const event = computed(() => eventStore.event)
  const gatheringSummary = computed(() => dashboardStore.gatheringSummary)
  const rankData = computed(() => {
    return mode.value === 'event' ? resultStore.result : dashboardStore.gatheringResult
  })
  const headerData = computed(() => {
    return mode.value === 'event' ? eventStore.event : dashboardStore.gatheringSummary
  })

  /* LIFECYCLE */
  onMounted(async () => {
    await load()
  })

  /* FUNCTIONS */
  async function load() {
    if (mode.value === 'event') {
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
