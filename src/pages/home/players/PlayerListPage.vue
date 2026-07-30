<template>
  <q-page class="page-bg">
    <!-- FILTROS -->
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

        <!-- Botão Adicionar -->
        <div class="q-mt-sm">
          <q-btn class="add-btn full-width" no-caps rounded unelevated @click="onAdd">
            <q-icon name="add" class="q-mr-sm" />
            Adicionar Jogador
          </q-btn>
        </div>
      </q-card>
    </div>

    <!-- LISTA -->
    <div class="q-pa-md q-gutter-md">
      <PlayerCard
        v-for="player in players"
        :key="player.id"
        :player="player"
        class="list-card"
        @click="openPlayer(player)"
      />

      <!-- PAGINAÇÃO -->
      <q-pagination v-model="page" :max="maxPages" max-pages="5" />
    </div>
  </q-page>
</template>

<script setup>
  /* COMPONENTS */
  import GlobalInput from 'src/components/ui/GlobalInput.vue'
  import PlayerCard from 'src/components/players/PlayerCard.vue'

  /* VUE */
  import { computed, onMounted, ref, watch } from 'vue'

  /* STORES */
  import { usePlayerStore } from 'src/stores/player'

  /* COMPOSABLES */
  import { usePlayerNavigator } from 'src/composables/navigation'

  /* COMPOSABLES */
  const { goToPlayerNew, goToPlayerEdit } = usePlayerNavigator()

  /* STORES */
  const playerStore = usePlayerStore()

  /* COMPUTED */
  const players = computed(() => playerStore.players?.content || [])

  /* FILTERS */
  const filters = ref({ name: '' })

  /* PAGINATION */
  const page = ref(1)
  const perPage = 10
  const maxPages = computed(() => playerStore.players?.totalPages || 1)

  /* LIFECYCLE */
  onMounted(load)

  watch(page, load)

  watch(
    filters,
    () => {
      if (page.value !== 1) {
        page.value = 1
      } else {
        load()
      }
    },
    { deep: true }
  )

  /* FUNCTIONS */
  async function load() {
    await playerStore.getPlayersPage({
      ...filters.value,
      page: page.value - 1,
      size: perPage
    })
  }

  function onAdd() {
    goToPlayerNew()
  }

  function openPlayer(player) {
    goToPlayerEdit(player.id)
  }
</script>
