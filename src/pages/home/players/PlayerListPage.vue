<template>
  <q-page class="page-bg">
    <div class="q-pa-md q-gutter-md">
      <!-- ===== FILTROS ===== -->
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

      <PlayerListBase :players="players" @select="openPlayer" />

      <!-- PAGINAÇÃO -->
      <div class="q-mt-md">
        <q-pagination v-model="page" :max="maxPages" max-pages="5" />
      </div>
    </div>
  </q-page>
</template>

<script setup>
  import GlobalInput from 'src/components/ui/GlobalInput.vue'
  import PlayerListBase from 'src/components/players/PlayerListBase.vue'
  import { computed, onMounted, ref, watch } from 'vue'
  import { usePlayerNavigator } from 'src/composables/navigation'
  import { usePlayerStore } from 'src/stores/player'

  /* NAVIGATION */
  const { goToPlayerNew, goToPlayerEdit } = usePlayerNavigator()

  /* STORES */
  const playerStore = usePlayerStore()

  /* ITEMS */
  const players = computed(() => playerStore.players?.content || [])

  /* FILTERS */
  const filters = ref({ name: '' })

  /* PAGINATION */
  const page = ref(1)
  const perPage = 4
  const maxPages = computed(() => playerStore.players?.totalPages || 1)

  /* ---------------- LOAD ---------------- */
  onMounted(load)

  watch(
    filters,
    () => {
      page.value = 1
      load()
    },
    { deep: true }
  )

  watch(page, () => {
    load()
  })

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
