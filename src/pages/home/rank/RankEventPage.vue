<template>
  <q-page class="page-bg" v-if="gatheringSummary && event">
    <!-- CARD DO EVENTO -->
    <div class="q-pa-md">
      <EventCard :event="event" @click="openEvent(event)" />
    </div>

    <!-- CARD DE INSCRIÇÃO -->
    <div class="q-pa-md">
      <EventFeeCard :event="event" />
    </div>

    <!-- CARD DOS POTES -->
    <div class="q-pa-md">
      <PotSummaryCard :pots="event" />
    </div>

    <!-- left: -10000px não esconde o elemento do DOM, só o posiciona muito para a esquerda. -->
    <div style="position: absolute; left: -10000px; top: 0; width: 100%">
      <EventImage ref="eventRef" :event="event" :gathering="gatheringSummary" />
    </div>

    <div style="position: absolute; left: -10000px; top: 0; width: 100%">
      <RankImage
        ref="rankRef"
        :event="event"
        :gathering="gatheringSummary"
        :results="results"
        title="Rank do Evento"
      />
    </div>

    <!-- BOTÕES DE AÇÃO -->
    <div class="row q-col-gutter-sm q-pa-md">
      <div class="col-6">
        <q-btn
          push
          no-caps
          rounded
          label="Compartilhar Evento"
          icon="share"
          class="add-btn full-width"
          @click="shareEvent"
        />
      </div>

      <div class="col-6">
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

    <!-- CARD DE FILTRO -->
    <div class="q-pa-md">
      <q-card class="q-pa-md form-card">
        <!-- Title -->
        <div class="form-section-title">Filtros</div>

        <div class="row q-col-gutter-sm q-mt-sm">
          <!-- Nome -->
          <div class="col">
            <GlobalInput label="Nome" v-model="filters.name" debounce="300">
              <template #prepend>
                <q-icon name="search" />
              </template>
            </GlobalInput>
          </div>
        </div>
      </q-card>
    </div>

    <!-- CARD DE RANK HEADER -->
    <div class="q-pa-md">
      <RankHeaderCard title="Rank do Evento" />
    </div>

    <!-- LISTA -->
    <div class="q-pa-md q-gutter-md">
      <RankCard
        v-for="result in filteredResults"
        :key="result.idPlayer"
        :result="result"
        class="list-card"
        @click="openResult(result)"
      />

      <!-- PAGINAÇÃO -->
      <!-- <q-pagination v-model="page" :max="maxPages" max-pages="5" /> -->
    </div>
  </q-page>
</template>

<script setup>
  /* COMPONENTS */
  import EventCard from 'src/components/events/EventCard.vue'
  import EventFeeCard from 'src/components/events/EventFeeCard.vue'
  import EventImage from 'src/components/share/EventImage.vue'
  import GlobalInput from 'src/components/ui/GlobalInput.vue'
  import PotSummaryCard from 'src/components/pots/PotSummaryCard.vue'
  import RankCard from 'src/components/ranks/RankCard.vue'
  import RankHeaderCard from 'src/components/ranks/RankHeaderCard.vue'
  import RankImage from 'src/components/share/RankImage.vue'

  /* VUE */
  import { computed, onMounted, ref } from 'vue'
  import { useRoute, useRouter } from 'vue-router'

  /* STORES */
  import { useEventStore } from 'src/stores/event'
  import { useDashboardStore } from 'src/stores/dashboard'
  import { useGatheringStore } from 'src/stores/gathering'
  import { useResultStore } from 'src/stores/result'

  /* COMPOSABLES */
  import { useEventNavigator } from 'src/composables/navigation'
  import { useRankNavigator } from 'src/composables/navigation'

  /* UTILITIES */
  import { dataUrlToFile, generateImage, shareImage } from 'src/utils'

  /* COMPOSABLES */
  const { goToEventEdit } = useEventNavigator()
  const { goToRankEventPlayer } = useRankNavigator()

  /* ROUTES */
  const route = useRoute()
  const router = useRouter()

  /* PARAMS */
  const idEvent = Number(route.params.idEvent)

  /* STORES */
  const dashboardStore = useDashboardStore()
  const eventStore = useEventStore()
  const gatheringStore = useGatheringStore()
  const resultStore = useResultStore()

  /* COMPUTED */
  const event = computed(() => eventStore.event)
  const gatheringSelected = computed(() => gatheringStore.gatheringSelected)
  const gatheringSummary = computed(() => dashboardStore.gatheringSummary)
  const results = computed(() => resultStore.results ?? [])

  const eventRef = ref(null)
  const rankRef = ref(null)

  /* FILTERS */
  const filters = ref({ name: '' })

  const filteredResults = computed(() => {
    const name = filters.value.name.trim().toLowerCase()

    if (!name) {
      return results.value
    }

    return results.value.filter(item => item.player.name.toLowerCase().includes(name))
  })

  /* LIFECYCLE */
  onMounted(async () => {
    await dashboardStore.getGatheringSummary(gatheringSelected.value.id)

    if (!gatheringSummary.value) {
      console.warn('GATHERING SUMMARY NOT FOUND:', gatheringSelected.value.id)
      router.back()
      return
    }

    await eventStore.getEvent(idEvent)

    if (!event.value) {
      console.warn('EVENT NOT FOUND:', idEvent)
      router.back()
      return
    }

    await load()
  })

  /* FUNCTIONS */
  async function load() {
    await resultStore.getResults(idEvent)
  }

  function openResult(result) {
    goToRankEventPlayer(result.idEvent, result.idPlayer)
  }

  function openEvent(event) {
    goToEventEdit(event.id)
  }

  async function shareEvent() {
    const dataUrl = await generateImage(eventRef)

    const file = dataUrlToFile(dataUrl, `evento-${event.value.id}.png`)

    await shareImage(file, 'Evento')
  }

  async function shareRank() {
    const dataUrl = await generateImage(rankRef)

    const file = dataUrlToFile(dataUrl, `evento-${event.value.id}-rank.png`)

    await shareImage(file, 'Rank do Evento')
  }
</script>
