<template>
  <q-page class="page-bg">
    <!-- CONFRA HEADER -->
    <div class="q-pa-md">
      <GatheringSummaryCard :gatheringSummary="gatheringSummary" v-if="gatheringSummary" />
    </div>

    <!-- GRÁFICO -->
    <div class="q-pa-md">
      <FormatChartCard :data="gatheringFormats" v-if="gatheringFormats" />
    </div>
  </q-page>
</template>

<script setup>
  import GatheringSummaryCard from 'src/components/gatherings/GatheringSummaryCard.vue'
  import FormatChartCard from 'src/components/formats/FormatChartCard.vue'

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
  const gatheringFormats = computed(() => dashboardStore.gatheringFormats)

  /* ---------------- LOAD ---------------- */
  onMounted(async () => {
    await load()
  })

  async function load() {
    await dashboardStore.getGatheringSummary(idGathering)
    await dashboardStore.getGatheringFormats(idGathering)
  }
</script>
