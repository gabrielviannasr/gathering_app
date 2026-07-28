<template>
  <q-page class="page-bg">
    <!-- Header da Confra -->
    <div class="q-pa-md">
      <GatheringHeaderCard :gatheringSummary="gatheringSummary" v-if="gatheringSummary" />
    </div>

    <!-- Gráfico de Winrate -->
    <div class="q-pa-md">
      <WinrateChartCard :winrateData="winrateData" v-if="winrateData" />
    </div>
  </q-page>
</template>

<script setup>
  import GatheringHeaderCard from 'src/components/gatherings/GatheringHeaderCard.vue'
  import WinrateChartCard from 'src/components/reports/WinrateChartCard.vue'

  import { computed, onMounted } from 'vue'
  import { useRoute } from 'vue-router'

  import { useDashboardStore } from 'src/stores/dashboard'

  /* NAVIGATION */
  const route = useRoute()
  const idGathering = Number(route.params.id)

  /* STORES */
  const dashboardStore = useDashboardStore()

  /* COMPUTED */
  const gatheringSummary = computed(() => dashboardStore.gatheringSummary)

  const winrateData = computed(() =>
    dashboardStore.gatheringResults.map(r => ({
      playerName: r.player.name,
      winrate: r.rounds > 0 ? Number(((r.wins / r.rounds) * 100).toFixed(2)) : 0
    }))
  )

  // const winrateData = computed(() =>
  //   dashboardStore.getGatheringResults(idGathering).map(r => ({
  //     playerName: r.playerName,
  //     winrate: r.rounds > 0 ? Number(((r.wins / r.rounds) * 100).toFixed(2)) : 0
  //   }))
  // )

  /* ---------------- LOAD ---------------- */
  onMounted(async () => {
    await load()
  })

  async function load() {
    await dashboardStore.getGatheringSummary(idGathering)
    await dashboardStore.getGatheringResults(idGathering)
  }
</script>
