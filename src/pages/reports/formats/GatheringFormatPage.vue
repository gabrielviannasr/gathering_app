<template>
  <q-page class="page-bg" v-if="gatheringSummary">
    <!-- CARD DA CONFRA -->
    <div class="q-pa-md">
      <GatheringSummaryCard :gatheringSummary="gatheringSummary" />
    </div>

    <!-- CARD DO GRÁFICO -->
    <div class="q-pa-md">
      <FormatChartCard :data="gatheringFormats" />
    </div>
  </q-page>
</template>

<script setup>
  /* COMPONENTS */
  import FormatChartCard from 'src/components/formats/FormatChartCard.vue'
  import GatheringSummaryCard from 'src/components/gatherings/GatheringSummaryCard.vue'

  /* VUE */
  import { computed, onMounted } from 'vue'
  import { useRoute, useRouter } from 'vue-router'

  /* STORES */
  import { useDashboardStore } from 'src/stores/dashboard'

  /* ROUTES */
  const route = useRoute()
  const router = useRouter()

  /* PARAMS */
  const idGathering = Number(route.params.id)

  /* STORES */
  const dashboardStore = useDashboardStore()

  /* COMPUTED */
  const gatheringSummary = computed(() => dashboardStore.gatheringSummary ?? [])
  const gatheringFormats = computed(() => dashboardStore.gatheringFormats)

  /* LIFECYCLE */
  onMounted(async () => {
    await load()
  })

  /* FUNCTIONS */
  async function load() {
    await dashboardStore.getGatheringSummary(idGathering)

    if (!gatheringSummary.value) {
      console.warn('GATHERING SUMMARY NOT FOUND:', idGathering)
      router.back()
      return
    }

    await dashboardStore.getGatheringFormats(idGathering)
  }
</script>
