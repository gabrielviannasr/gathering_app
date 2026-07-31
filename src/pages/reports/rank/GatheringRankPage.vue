<template>
  <q-page class="page-bg">
    <template v-if="!gatheringSummary">
      <div class="q-pa-md q-gutter-md">
        <!-- CARD NOT FOUND -->
        <EmptyStateCard type="gathering" />

        <!-- Botão Voltar -->
        <div>
          <q-btn
            push
            no-caps
            rounded
            class="full-width"
            label="Voltar"
            color="primary"
            @click="router.back()"
          />
        </div>
      </div>
    </template>

    <template v-else>
      <!-- CARD DA CONFRA -->
      <div class="q-pa-md">
        <GatheringSummaryCard :gatheringSummary="gatheringSummary" />
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
    </template>
  </q-page>
</template>

<script setup>
  /* COMPONENTS */
  import EmptyStateCard from 'src/components/ui/EmptyStateCard.vue'
  import GatheringSummaryCard from 'src/components/gatherings/GatheringSummaryCard.vue'
  import GlobalInput from 'src/components/ui/GlobalInput.vue'
  import RankCard from 'src/components/ranks/RankCard.vue'

  /* VUE */
  import { computed, onMounted, ref } from 'vue'
  import { useRoute, useRouter } from 'vue-router'

  /* STORES */
  import { useDashboardStore } from 'src/stores/dashboard'

  /* COMPOSABLES */
  import { useRankNavigator } from 'src/composables/navigation'

  /* COMPOSABLES */
  const { goToRankGatheringPlayer } = useRankNavigator()

  /* ROUTES */
  const route = useRoute()
  const router = useRouter()

  /* PARAMS */
  const idGathering = Number(route.params.idGathering)

  /* STORES */
  const dashboardStore = useDashboardStore()

  /* COMPUTED */
  const gatheringSummary = computed(() => dashboardStore.gatheringSummary)
  const results = computed(() => dashboardStore.gatheringResults ?? [])

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
    await load()
  })

  /* FUNCTIONS */
  async function load() {
    await dashboardStore.getGatheringSummary(idGathering)

    if (!gatheringSummary.value) {
      router.back()
      return
    }

    await dashboardStore.getGatheringResults(idGathering)
  }

  function openResult(result) {
    goToRankGatheringPlayer(idGathering, result.idPlayer)
  }
</script>
