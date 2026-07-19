<!-- src/pages/reports/winrate/ConfraWinratePage.vue -->
<template>
  <q-page class="page-bg">
    <!-- Header da Confra -->
    <div class="q-pa-md">
      <ConfraHeaderCard :confraSummary="confraSummary" v-if="confraSummary" />
    </div>

    <!-- Gráfico de Winrate -->
    <div class="q-pa-md">
      <WinrateChartCard :winrateData="winrateData" v-if="winrateData" />
    </div>
  </q-page>
</template>

<script setup>
  import ConfraHeaderCard from 'src/components/confras/ConfraHeaderCard.vue'
  import WinrateChartCard from 'src/components/reports/WinrateChartCard.vue'

  import { computed, onMounted } from 'vue'
  import { useRoute } from 'vue-router'

  import { useDashboardStore } from 'src/stores/dashboard'

  /* NAVIGATION */
  const route = useRoute()
  const idGathering = Number(route.params.id)

  /* STORES */
  const dashboardStore = useDashboardStore()

  /* DATA */
  const confraSummary = computed(() => dashboardStore.confraSummary)

  const winrateData = computed(() =>
    dashboardStore.confraResults.map(r => ({
      playerName: r.player.name,
      winrate: r.rounds > 0 ? Number(((r.wins / r.rounds) * 100).toFixed(2)) : 0
    }))
  )

  // const winrateData = computed(() =>
  //   dashboardStore.getConfraResults(idGathering).map(r => ({
  //     playerName: r.playerName,
  //     winrate: r.rounds > 0 ? Number(((r.wins / r.rounds) * 100).toFixed(2)) : 0
  //   }))
  // )

  /* ---------------- LOAD ---------------- */
  onMounted(async () => {
    await load()
  })

  async function load() {
    await dashboardStore.getConfraSummary(idGathering)
    await dashboardStore.getConfraResults(idGathering)
  }
</script>
