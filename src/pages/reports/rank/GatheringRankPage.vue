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

      <div style="position: absolute; left: -10000px; top: 0; width: 100%">
        <RankImage ref="rankRef" :gathering="gathering" :results="results" title="Rank da Confra" />
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
        <RankHeaderCard title="Rank da Confra" />
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
  import RankHeaderCard from 'src/components/ranks/RankHeaderCard.vue'
  import RankImage from 'src/components/share/RankImage.vue'

  /* VUE */
  import { computed, onMounted, ref } from 'vue'
  import { useRoute, useRouter } from 'vue-router'

  /* STORES */
  import { useDashboardStore } from 'src/stores/dashboard'
  import { useGatheringStore } from 'src/stores/gathering'

  /* COMPOSABLES */
  import { useRankNavigator } from 'src/composables/navigation'

  /* UTILITIES */
  import { dataUrlToFile, generateImage, shareImage } from 'src/utils'

  /* COMPOSABLES */
  const { goToRankGatheringPlayer } = useRankNavigator()

  /* ROUTES */
  const route = useRoute()
  const router = useRouter()

  /* PARAMS */
  const idGathering = Number(route.params.idGathering)

  /* STORES */
  const dashboardStore = useDashboardStore()
  const gatheringStore = useGatheringStore()

  /* COMPUTED */
  const gathering = computed(() => gatheringStore.gatheringSelected)
  const gatheringSummary = computed(() => dashboardStore.gatheringSummary)
  const results = computed(() => dashboardStore.gatheringResults ?? [])

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

  async function shareRank() {
    const dataUrl = await generateImage(rankRef)

    const file = dataUrlToFile(dataUrl, `confra-${gathering.value.id}-rank.png`)

    await shareImage(file, 'Rank da Confra')
  }
</script>
