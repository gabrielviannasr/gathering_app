<template>
  <q-page class="page-bg" v-if="event">
    <!-- CARD DO EVENTO -->
    <div class="q-pa-md">
      <EventCard :event="event" @open="openEvent(event)" />
    </div>

    <!-- CARD DE INSCRIÇÃO -->
    <div class="q-pa-md">
      <EventBodyCard :event="event" />
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
      <q-card
        v-for="item in filteredResults"
        :key="item.id"
        class="list-card q-pa-sm"
        clickable
        @click="openRankPlayer(item)"
      >
        <!-- WRAPPER -->
        <div class="row items-center no-wrap">
          <!-- CÍRCULO COM NÚMERO DO RANK -->
          <div class="round-number-circle q-mr-md">
            {{ item.rank }}
          </div>

          <!-- INFO -->
          <div class="col">
            <div class="text-subtitle2 text-bold">
              {{ item?.player?.name || '—' }}
            </div>

            <div class="text-caption q-mt-xs row items-center">
              <q-icon name="emoji_events" size="16px" class="q-mr-xs" style="color: #fe9a00" />

              {{ item.wins }} vitórias • {{ item.rounds }} rodadas
            </div>
          </div>

          <!-- SETA -->
          <div class="q-ml-auto">
            <q-icon name="chevron_right" size="22px" />
          </div>
        </div>
      </q-card>

      <!-- PAGINAÇÃO -->
      <!-- <div class="q-mt-md">
        <q-pagination v-model="page" :max="maxPages" max-pages="5" />
      </div> -->
    </div>
  </q-page>
</template>

<script setup>
  // import EventHeaderCard from 'src/components/events/EventHeaderCard.vue'
  import EventCard from 'src/components/events/EventCard.vue'
  import EventBodyCard from 'src/components/events/EventBodyCard.vue'
  import GlobalInput from 'src/components/ui/GlobalInput.vue'
  import PotSummaryCard from 'src/components/pots/PotSummaryCard.vue'

  /* VUE + PINIA */
  import { computed, onMounted, ref } from 'vue'
  import { useRoute, useRouter } from 'vue-router'

  import { useEventStore } from 'src/stores/event'
  import { useResultStore } from 'src/stores/result'

  import { useEventNavigator } from 'src/composables/navigation'
  import { useRankNavigator } from 'src/composables/navigation'

  /* NAVIGATION */
  const { goToEventEdit } = useEventNavigator()
  const { goToRankEventPlayer } = useRankNavigator()

  const route = useRoute()
  const router = useRouter()
  const idEvent = Number(route.params.idEvent)

  /* STORES */
  const eventStore = useEventStore()
  const resultStore = useResultStore()

  /* COMPUTED */
  const event = computed(() => eventStore.event)
  // const results = computed(() => resultStore.results?.content || [])
  // const results = computed(() => resultStore.results || [])

  /* FILTERS */
  const filters = ref({ name: '' })

  const filteredResults = computed(() => {
    const name = filters.value.name.trim().toLowerCase()

    if (!name) {
      return resultStore.results
    }

    return resultStore.results.filter(item => item.player.name.toLowerCase().includes(name))
  })

  /* ---------------- LOAD ---------------- */
  onMounted(async () => {
    await eventStore.getEvent(idEvent)
    await load()

    if (!event.value) {
      console.warn('EVENT NOT FOUND:', idEvent)
      router.back()
      return
    }
  })

  async function load() {
    await resultStore.getResults(idEvent)
  }

  /* página única */
  // const page = ref(1)
  // const maxPages = 1

  function openRankPlayer(item) {
    goToRankEventPlayer(item.idEvent, item.idPlayer)
  }

  function openEvent(event) {
    goToEventEdit(event.id)
  }
</script>
