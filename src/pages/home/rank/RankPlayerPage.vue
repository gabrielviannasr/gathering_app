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
  import { useConfraStore } from 'src/stores/confra'
  import { useRankConfraStore } from 'src/stores/rankConfra'

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
  const confraStore = useConfraStore()
  const rankConfraStore = useRankConfraStore()

  /* DATA */
  const event = computed(() => eventStore.event)
  const confra = computed(() => confraStore.confra)
  const rankData = computed(() => {
    return mode.value === 'event' ? resultStore.result : rankConfraStore.rank
  })
  const headerData = computed(() => {
    return mode.value === 'event' ? eventStore.event : confraStore.confra
  })

  /* ---------------- LOAD ---------------- */
  onMounted(load)

  async function load() {
    if (mode.value === 'event') {
      await eventStore.getEvent(idEvent)

      if (!event.value) {
        console.warn('EVENT NOT FOUND:', idEvent)
        router.back()
        return
      }

      await resultStore.getResultsByPlayer(idEvent, idPlayer)
    } else {
      await confraStore.getConfraSummary(idGathering)

      if (!confra.value) {
        console.warn('CONFRA NOT FOUND:', idGathering)
        router.back()
        return
      }
      await rankConfraStore.getRankByPlayer(idGathering, idPlayer)
    }
  }
</script>
