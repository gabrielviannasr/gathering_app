<template>
  <q-card class="q-pa-md form-card">
    <!-- Título -->
    <div class="text-h6 text-bold q-mb-md">Formatos Mais Jogados</div>

    <!-- Gráfico -->
    <div class="q-pa-md">
      <canvas ref="canvas" height="240"></canvas>
    </div>

    <!-- Legenda -->
    <div class="q-mt-md">
      <div v-for="item in data" :key="item.idFormat" class="row items-center q-my-xs">
        <div class="legend-color q-mr-sm" :style="{ background: getColor(item.idFormat) }" />
        <div class="text-subtitle2">{{ item.formatName }}</div>
        <div class="q-ml-auto text-caption text-bold">{{ item.rounds }} rodadas</div>
      </div>
    </div>
  </q-card>
</template>

<script setup>
  import { ref, onMounted, watch } from 'vue'
  import Chart from 'chart.js/auto'

  const props = defineProps({
    data: { type: Array, required: true }
  })

  /* ==========================
   REFERÊNCIA DO GRÁFICO
========================== */
  const canvas = ref(null)
  let chartInstance = null

  /* ==========================
   CORES
========================== */
  const palette = ['#A259FF', '#2979FF', '#00BCD4', '#4CAF50', '#FFC107', '#FF5252', '#8D6E63']

  function getColor(idFormat) {
    return palette[(idFormat - 1) % palette.length]
  }

  /* ==========================
   DESENHAR O GRÁFICO
========================== */
  function renderChart() {
    if (!canvas.value) return

    const ctx = canvas.value.getContext('2d')

    // destrói gráfico anterior se existir
    if (chartInstance) {
      chartInstance.destroy()
    }

    chartInstance = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: props.data.map(x => x.formatName),
        datasets: [
          {
            data: props.data.map(x => x.rounds),
            backgroundColor: props.data.map(x => getColor(x.idFormat))
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false }
        }
      }
    })
  }

  /* ==========================
   MONTAGEM + WATCH
========================== */
  onMounted(renderChart)

  watch(
    () => props.data,
    () => renderChart(),
    { deep: true }
  )
</script>

<style scoped>
  .legend-color {
    width: 14px;
    height: 14px;
    border-radius: 50%;
  }
</style>
