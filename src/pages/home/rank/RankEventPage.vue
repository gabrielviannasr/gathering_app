<template>
  <q-page class="page-bg" v-if="event">
    <EventCashClosingImage ref="cashClosingRef" :event="event" />

    <q-btn label="Testar" @click="testImage" />

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
  import EventCashClosingImage from 'src/components/share/EventCashClosingImage.vue'
  import EventCard from 'src/components/events/EventCard.vue'
  import EventFeeCard from 'src/components/events/EventFeeCard.vue'
  import GlobalInput from 'src/components/ui/GlobalInput.vue'
  import PotSummaryCard from 'src/components/pots/PotSummaryCard.vue'
  import RankCard from 'src/components/ranks/RankCard.vue'

  /* VUE */
  import { computed, onMounted, ref } from 'vue'
  import { useRoute, useRouter } from 'vue-router'

  /* STORES */
  import { useEventStore } from 'src/stores/event'
  import { useResultStore } from 'src/stores/result'

  /* COMPOSABLES */
  import { useEventNavigator } from 'src/composables/navigation'
  import { useRankNavigator } from 'src/composables/navigation'

  /* COMPOSABLES */
  const { goToEventEdit } = useEventNavigator()
  const { goToRankEventPlayer } = useRankNavigator()

  /* UTILITIES */
  import { generateCashClosingImage } from 'src/utils'

  /* ROUTES */
  const route = useRoute()
  const router = useRouter()

  /* PARAMS */
  const idEvent = Number(route.params.idEvent)

  /* STORES */
  const eventStore = useEventStore()
  const resultStore = useResultStore()

  /* COMPUTED */
  const event = computed(() => eventStore.event)
  const results = computed(() => resultStore.results ?? [])

  const cashClosingRef = ref(null)

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

  async function testImage() {
    //   console.log(cashClosingRef.value)
    //   console.log(cashClosingRef.value?.$el)
    const dataUrl = await generateCashClosingImage(cashClosingRef)

    const newWindow = window.open()
    newWindow.document.write(`<img src="${dataUrl}" />`)
  }
</script>
