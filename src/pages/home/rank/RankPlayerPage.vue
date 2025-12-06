<template>
  <q-page class="page-bg">
    <!-- HEADER DINÂMICO -->
    <div class="q-pa-md">
      <EventHeaderCard v-if="mode === 'event'" :event="headerData" />

      <ConfraHeaderCard v-else :confraSummary="headerData" />
    </div>

    <!-- PLAYER -->
    <div class="q-pa-md">
      <PlayerCard
        :wallet="{
          playerName: player?.name || player?.playerName,
          wallet: 0,
          events: rankData?.events ?? 1
        }"
        :showArrow="false"
      />
    </div>

    <!-- RANK DETAIL -->
    <div class="q-pa-md">
      <RankDetailCard :data="rankData" />
    </div>
  </q-page>
</template>

<script setup>
  import { computed } from 'vue'
  import { useRoute } from 'vue-router'

  import EventHeaderCard from 'src/components/events/EventHeaderCard.vue'
  import ConfraHeaderCard from 'src/components/confras/ConfraHeaderCard.vue'
  import PlayerCard from 'src/components/players/PlayerCard.vue'
  import RankDetailCard from 'src/components/rank/RankDetailCard.vue'

  import { usePlayerStore } from 'src/stores/player'
  import { useEventStore } from 'src/stores/event'
  import { useResultStore } from 'src/stores/result'
  import { useConfraStore } from 'src/stores/confra'
  import { useRankConfraStore } from 'src/stores/rankConfra'

  const route = useRoute()

  const mode = computed(() => {
    return route.name === 'confras-rank-player' ? 'confra' : 'event'
  })

  /* ============================
   EVENTO
============================ */
  const idEvent = Number(route.params.idEvent)

  /* ============================
   CONFRA
============================ */
  const idGathering = Number(route.params.id)
  const idPlayer = Number(route.params.idPlayer)

  /* STORES */
  const playerStore = usePlayerStore()
  const eventStore = useEventStore()
  const resultStore = useResultStore()
  const confraStore = useConfraStore()
  const rankConfraStore = useRankConfraStore()

  /* PLAYER */
  const player = computed(() => playerStore.getPlayer(idPlayer))

  /* HEADER DATA (evento ou confra) */
  const headerData = computed(() => {
    return mode.value === 'event'
      ? eventStore.getEvent(idEvent)
      : confraStore.getConfraSummary(idGathering)
  })

  /* RANK DATA */
  const rankData = computed(() => {
    return mode.value === 'event'
      ? resultStore.getResultByPlayer(idEvent, idPlayer)
      : rankConfraStore.getRankByPlayer(idGathering, idPlayer)
  })
</script>
