<template>
  <q-page v-if="gatheringSummary && result" class="page-bg">
    <!-- HEADER DINÂMICO -->
    <div class="q-pa-md">
      <EventCard :showArrow="false" :event="event" v-if="isEvent && event" />

      <GatheringCard v-else :gathering="gatheringSummary" :showArrow="false" />
    </div>

    <!-- RANK HEADER -->
    <div class="q-pa-md">
      <RankHeaderCard
        :title="isEvent ? 'Rank do Jogador no Evento' : 'Rank do Jogador na Confra'"
      />
    </div>

    <div style="position: absolute; left: -10000px; top: 0; width: 100%">
      <PlayerRankImage
        ref="rankRef"
        :event="event"
        :gathering="gatheringSummary"
        :result="result"
        :title="isEvent ? 'Rank do Jogador no Evento' : 'Rank do Jogador na Confra'"
      />
    </div>

    <!-- BOTÕES DE AÇÃO -->
    <div class="row q-col-gutter-sm q-pa-md">
      <div class="col-12">
        <q-btn
          push
          no-caps
          rounded
          label="Compartilhar Rank"
          icon="share"
          class="add-btn full-width"
          @click="shareRank"
        />
      </div>
    </div>

    <!-- RANK DETAIL -->
    <div class="q-pa-md">
      <RankDetailCard :result="result" />
    </div>
  </q-page>
</template>

<script setup>
  /* VUE */
  import { computed, onMounted, ref } from 'vue'
  import { useRoute, useRouter } from 'vue-router'

  /* STORES */
  import { useEventStore } from 'src/stores/event'
  import { useGatheringStore } from 'src/stores/gathering'
  import { useResultStore } from 'src/stores/result'
  import { useDashboardStore } from 'src/stores/dashboard'

  /* CONSTANTS */
  import { ROUTES } from 'src/router/routes.enum.js'

  /* COMPONENTS */
  import EventCard from 'src/components/events/EventCard.vue'
  import GatheringCard from 'src/components/gatherings/GatheringCard.vue'
  import PlayerRankImage from 'src/components/share/PlayerRankImage.vue'
  import RankDetailCard from 'src/components/ranks/RankDetailCard.vue'
  import RankHeaderCard from 'src/components/ranks/RankHeaderCard.vue'

  /* UTILITIES */
  import { dataUrlToFile, generateImage, shareImage } from 'src/utils'

  /* ROUTES */
  const route = useRoute()
  const router = useRouter()

  /* PARAMS */
  const idEvent = Number(route.params.idEvent)
  const idGathering = Number(route.params.idGathering)
  const idPlayer = Number(route.params.idPlayer)

  /* STORES */
  const dashboardStore = useDashboardStore()
  const eventStore = useEventStore()
  const gatheringStore = useGatheringStore()
  const resultStore = useResultStore()

  /* COMPUTED */
  const isEvent = computed(() => {
    return route.name === ROUTES.RANK_EVENTO_JOGADOR
  })
  const event = computed(() => eventStore.event)
  const gathering = computed(() => gatheringStore.gatheringSelected)
  // const gatheringResult = computed(() => dashboardStore.gatheringResult)
  const gatheringSelected = computed(() => gatheringStore.gatheringSelected)
  const gatheringSummary = computed(() => dashboardStore.gatheringSummary)
  // const result = computed(() => resultStore.result)
  const result = computed(() => {
    return isEvent.value ? resultStore.result : dashboardStore.gatheringResult
  })

  const rankRef = ref(null)

  /* LIFECYCLE */
  onMounted(async () => {
    await dashboardStore.getGatheringSummary(gatheringSelected.value.id)

    if (!gatheringSummary.value) {
      console.warn('GATHERING SUMMARY NOT FOUND:', gatheringSelected.value.id)
      router.back()
      return
    }

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
      await dashboardStore.getGatheringResult(idGathering, idPlayer)
    }
  }

  async function shareRank() {
    const dataUrl = await generateImage(rankRef)

    const filename = isEvent.value
      ? `evento-${event.value.id}-rank.png`
      : `confra-${gathering.value.id}-rank.png`

    const title = isEvent.value ? 'Rank do Evento' : 'Rank da Confra'

    const file = dataUrlToFile(dataUrl, filename)

    await shareImage(file, title)
  }
</script>
