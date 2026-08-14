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
        <GatheringCard :gathering="gatheringSummary" :showArrow="false" />
      </div>

      <!-- CARD DO GRÁFICO -->
      <div class="q-pa-md">
        <WinrateChartCard :winrateData="winrateData" v-if="winrateData" />
      </div>
    </template>
  </q-page>
</template>

<script setup>
  /* VUE */
  import { computed, onMounted } from 'vue'
  import { useRoute, useRouter } from 'vue-router'

  /* STORES */
  import { useDashboardStore } from 'src/stores/dashboard'

  /* COMPONENTS */
  import EmptyStateCard from 'src/components/ui/EmptyStateCard.vue'
  import GatheringCard from 'src/components/gatherings/GatheringCard.vue'
  import WinrateChartCard from 'src/components/reports/WinrateChartCard.vue'

  /* ROUTES */
  const route = useRoute()
  const router = useRouter()

  /* PARAMS */
  const idGathering = Number(route.params.id)

  /* STORES */
  const dashboardStore = useDashboardStore()

  /* COMPUTED */
  const gatheringSummary = computed(() => dashboardStore.gatheringSummary)
  const gatheringResults = computed(() => dashboardStore.gatheringResults ?? [])

  const winrateData = computed(() =>
    gatheringResults.value.map(result => ({
      playerName: result.player.name,
      winrate: result.rounds > 0 ? Number(((result.wins / result.rounds) * 100).toFixed(2)) : 0
    }))
  )

  /* LIFECYCLE */
  onMounted(async () => {
    await load()
  })

  /* FUNCTIONS */
  async function load() {
    await dashboardStore.getGatheringSummary(idGathering)

    if (!gatheringSummary.value) {
      return
    }

    await dashboardStore.getGatheringResults(idGathering)
  }
</script>
