<!-- src/pages/reports/winrate/ConfraWinratePage.vue -->
<template>
  <q-page class="page-bg">
    <!-- Header da Confra -->
    <div class="q-pa-md">
      <ConfraHeaderCard :confraSummary="confraSummary" />
    </div>

    <!-- Gráfico de Winrate -->
    <div class="q-pa-md">
      <WinrateChartCard :winrateData="winrateList" />
    </div>
  </q-page>
</template>

<script setup>
  import { computed } from 'vue'
  import { useRoute } from 'vue-router'

  import ConfraHeaderCard from 'src/components/confras/ConfraHeaderCard.vue'
  import WinrateChartCard from 'src/components/reports/WinrateChartCard.vue'

  import { useConfraStore } from 'src/stores/confra'
  import { useRankConfraStore } from 'src/stores/rankConfra'

  /* ROUTE */
  const route = useRoute()
  const idGathering = Number(route.params.idGathering)

  /* STORES */
  const confraStore = useConfraStore()
  const rankConfraStore = useRankConfraStore()

  /* CONFRA HEADER */
  const confraSummary = computed(() => confraStore.getConfraSummary(idGathering))

  /* WINRATE DATA */
  const winrateList = computed(() =>
    rankConfraStore.getRankByGathering(idGathering).map(r => ({
      playerName: r.playerName,
      winrate: r.rounds > 0 ? Number(((r.wins / r.rounds) * 100).toFixed(2)) : 0
    }))
  )
</script>
