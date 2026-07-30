<template>
  <q-page class="page-bg">
    <!-- CARD DA CONFRA -->
    <div class="q-pa-md">
      <GatheringSummaryCard :gatheringSummary="gatheringSummary" v-if="gatheringSummary" />
    </div>

    <!-- CARD DO GRÁFICO -->
    <div class="q-pa-md">
      <WinrateChartCard :winrateData="winrateData" v-if="winrateData" />
    </div>
  </q-page>
</template>

<script setup>
  /* VUE */
  import { computed, onMounted } from 'vue'
  import { useRoute } from 'vue-router'

  /* STORES */
  import { useDashboardStore } from 'src/stores/dashboard'

  /* COMPONENTS */
  import GatheringSummaryCard from 'src/components/gatherings/GatheringSummaryCard.vue'
  import WinrateChartCard from 'src/components/reports/WinrateChartCard.vue'

  /* ROUTES */
  const route = useRoute()

  /* PARAMS */
  const idGathering = Number(route.params.id)

  /* STORES */
  const dashboardStore = useDashboardStore()

  /* COMPUTED */
  const gatheringSummary = computed(() => dashboardStore.gatheringSummary)

  const winrateData = computed(() =>
    dashboardStore.gatheringResults.map(result => ({
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
    await dashboardStore.getGatheringResults(idGathering)
  }
</script>
