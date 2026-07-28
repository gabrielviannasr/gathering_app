<!-- src/components/reports/WinrateChartCard.vue -->
<template>
  <q-card class="q-pa-md form-card">
    <!-- TITLE -->
    <div class="text-h6 text-bold q-mb-md">Winrate (%)</div>

    <!-- CHART -->
    <canvas ref="canvasRef" height="300"></canvas>
  </q-card>
</template>

<script setup>
  import Chart from 'chart.js/auto'

  /* VUE */
  import { onMounted, onBeforeUnmount, ref, watch } from 'vue'

  /* PROPS */
  // [{ playerName: 'Tobias', winrate: 50 }, ...]
  const props = defineProps({
    winrateData: { type: Array, required: true }
  })

  /* REFS */
  const canvasRef = ref(null)
  let chartInstance = null

  /* LIFECYCLE */
  onMounted(renderChart)

  onBeforeUnmount(() => chartInstance?.destroy())

  watch(() => props.winrateData, renderChart)

  /* FUNCTIONS */
  function renderChart() {
    if (!canvasRef.value) return

    if (chartInstance) {
      chartInstance.destroy()
    }

    chartInstance = new Chart(canvasRef.value, {
      type: 'bar',
      data: {
        labels: props.winrateData.map(item => item.playerName),
        datasets: [
          {
            label: 'Winrate (%)',
            data: props.winrateData.map(item => item.winrate),
            borderWidth: 1
          }
        ]
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        scales: {
          x: { beginAtZero: true, max: 100 }
        }
      }
    })
  }
</script>
