<template>
  <q-page v-if="headerData && rankData" class="page-bg">
    <!-- HEADER DINÂMICO -->
    <div class="q-pa-md">
      <EventHeaderCard v-if="mode === 'event'" :event="headerData" />

      <ConfraHeaderCard v-else :confraSummary="headerData" />
    </div>

    <!-- PLAYER -->
    <!-- <div class="q-pa-md">
      <PlayerCard
        :wallet="{
          playerName: player?.name || player?.playerName,
          wallet: 0,
          events: rankData?.events ?? 1
        }"
        :showArrow="false"
      />
    </div> -->

    <!-- RANK DETAIL -->
    <div class="q-pa-md">
      <RankDetailCard :data="rankData" />
    </div>
  </q-page>
</template>

<script setup>
  import EventHeaderCard from 'src/components/events/EventHeaderCard.vue'
  import ConfraHeaderCard from 'src/components/confras/ConfraHeaderCard.vue'
  // import PlayerCard from 'src/components/players/PlayerCard.vue'
  import RankDetailCard from 'src/components/rank/RankDetailCard.vue'

  /* VUE + PINIA */
  import { computed, onMounted } from 'vue'
  import { useRoute, useRouter } from 'vue-router'

  import { useEventStore } from 'src/stores/event'
  import { useResultStore } from 'src/stores/result'
  import { useDashboardStore } from 'src/stores/dashboard'

  /* NAVIGATION */
  const route = useRoute()
  const router = useRouter()
  const idEvent = Number(route.params.idEvent)
  const idGathering = Number(route.params.idGathering)
  const idPlayer = Number(route.params.idPlayer)

  const mode = computed(() => {
    return route.name === 'rank-confra-jogador' ? 'confra' : 'event'
  })

  /* STORES */
  // const playerStore = usePlayerStore()
  const eventStore = useEventStore()
  const resultStore = useResultStore()
  const dashboardStore = useDashboardStore()

  /* COMPUTED */
  const event = computed(() => eventStore.event)
  const confraSummary = computed(() => dashboardStore.confraSummary)
  const rankData = computed(() => {
    return mode.value === 'event' ? resultStore.result : dashboardStore.confraResult
  })
  const headerData = computed(() => {
    return mode.value === 'event' ? eventStore.event : dashboardStore.confraSummary
  })

  /* ---------------- LOAD ---------------- */
  onMounted(async () => {
    await load()
  })

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
      await dashboardStore.getConfraSummary(idGathering)

      if (!confraSummary.value) {
        console.warn('CONFRA SUMMARY NOT FOUND:', idGathering)
        router.back()
        return
      }
      await dashboardStore.getConfraResult(idGathering, idPlayer)
    }
  }
</script>
