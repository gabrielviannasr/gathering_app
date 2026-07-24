<template>
  <q-page class="page-bg">
    <!-- CONFRA HEADER -->
    <div class="q-pa-md">
      <ConfraHeaderCard :confraSummary="confraSummary" v-if="confraSummary" />
    </div>

    <!-- GRÁFICO -->
    <div class="q-pa-md">
      <FormatChartCard :data="confraFormats" v-if="confraFormats" />
    </div>
  </q-page>
</template>

<script setup>
  import ConfraHeaderCard from 'src/components/confras/ConfraHeaderCard.vue'
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
  const confraSummary = computed(() => dashboardStore.confraSummary)
  const confraFormats = computed(() => dashboardStore.confraFormats)

  /* ---------------- LOAD ---------------- */
  onMounted(async () => {
    await load()
  })

  async function load() {
    await dashboardStore.getConfraSummary(idGathering)
    await dashboardStore.getConfraFormats(idGathering)
  }
</script>
