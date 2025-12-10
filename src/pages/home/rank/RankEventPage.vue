<template>
  <q-page class="page-bg">
    <!-- CARD DO EVENTO -->
    <div class="q-pa-md">
      <!-- <EventHeaderCard :event="event" /> -->
      <EventCard :event="event" asHeader />
    </div>

    <!-- CARD DE INSCRIÇÃO -->
    <div class="q-pa-md">
      <EventBodyCard :event="event" />
    </div>

    <!-- CARD DE FILTRO -->
    <div class="q-pa-md">
      <q-card class="q-pa-md form-card">
        <div class="form-section-title">Filtros</div>

        <GlobalInput
          label="Buscar por nome do jogador..."
          v-model="filters.search"
          placeholder="Digite o nome..."
        >
          <template #prepend>
            <q-icon name="search" />
          </template>
        </GlobalInput>
      </q-card>
    </div>

    <!-- LISTA -->
    <div class="q-pa-md q-gutter-md">
      <q-card
        v-for="item in filteredRank"
        :key="item.rank + '-' + item.idPlayer"
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
              {{ resolvePlayer(item.idPlayer) }}
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
      <div class="q-mt-md">
        <q-pagination v-model="page" :max="maxPages" max-pages="5" />
      </div>
    </div>
  </q-page>
</template>

<script setup>
  import { ref, computed, onMounted } from 'vue'
  import { useRoute } from 'vue-router'

  // import EventHeaderCard from 'src/components/events/EventHeaderCard.vue'
  import EventCard from 'src/components/events/EventCard.vue'
  import EventBodyCard from 'src/components/events/EventBodyCard.vue'
  import GlobalInput from 'src/components/ui/GlobalInput.vue'

  import { useRankNavigator } from 'src/composables/navigation'
  import { useEventStore } from 'src/stores/event'
  import { usePlayerStore } from 'src/stores/player'
  import { useRankStore } from 'src/stores/rank'

  /* ROUTES */
  const route = useRoute()
  const idEvent = Number(route.params.idEvent)

  /* STORES */
  const { goToRankEventPlayer } = useRankNavigator()
  const eventStore = useEventStore()
  const playerStore = usePlayerStore()
  const rankStore = useRankStore()

  /* EVENT */
  const event = computed(() => eventStore.getEvent(idEvent))

  /* RANK */
  const rank = computed(() => rankStore.getRankByEvent(idEvent))

  /* LOAD */
  onMounted(() => {})

  /* resolve nome do jogador */
  function resolvePlayer(id) {
    return playerStore.players.find(p => p.id === id)?.name || '—'
  }

  /* FILTRO */
  const filters = ref({ search: '' })

  const filteredRank = computed(() => {
    const query = filters.value.search.toLowerCase()

    return rank.value.filter(item => resolvePlayer(item.idPlayer).toLowerCase().includes(query))
  })

  /* página única */
  const page = ref(1)
  const maxPages = 1

  function openRankPlayer(item) {
    goToRankEventPlayer(item.idEvent, item.idPlayer)
  }
</script>
