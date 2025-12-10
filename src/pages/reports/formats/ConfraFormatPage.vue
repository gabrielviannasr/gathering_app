<template>
  <q-page class="page-bg">
    <!-- CONFRA HEADER -->
    <div class="q-pa-md">
      <ConfraHeaderCard :confraSummary="confraSummary" />
    </div>

    <!-- GRÁFICO -->
    <div class="q-pa-md">
      <FormatChartCard :data="formatList" />
    </div>
  </q-page>
</template>

<script setup>
  import { computed } from 'vue'
  import { useRoute } from 'vue-router'

  import ConfraHeaderCard from 'src/components/confras/ConfraHeaderCard.vue'
  import FormatChartCard from 'src/components/formats/FormatChartCard.vue'

  import { useConfraStore } from 'src/stores/confra'
  import { useFormatReportStore } from 'src/stores/formatReport'

  const route = useRoute()
  const idGathering = Number(route.params.id)

  const confraStore = useConfraStore()
  const formatReportStore = useFormatReportStore()

  const confraSummary = computed(() => confraStore.getConfraSummary(idGathering))

  const formatList = computed(() => formatReportStore.getByGathering(idGathering))
</script>
