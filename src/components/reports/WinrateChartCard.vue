<!-- src/components/reports/WinrateChartCard.vue -->
<template>
  <q-card class="q-pa-md form-card">
    <div class="text-h6 text-bold q-mb-md">Winrate (%)</div>

    <canvas ref="canvasRef" height="300"></canvas>
  </q-card>
</template>

<script setup>
  import { onMounted, onBeforeUnmount, ref, watch } from 'vue'
  import Chart from 'chart.js/auto'

  const props = defineProps({
    winrateData: { type: Array, required: true }
    // [{ playerName: 'Tobias', winrate: 50 }, ...]
  })

  const canvasRef = ref(null)
  let chartInstance = null

  function renderChart() {
    if (!canvasRef.value) return

    if (chartInstance) {
      chartInstance.destroy()
    }

    chartInstance = new Chart(canvasRef.value, {
      type: 'bar',
      data: {
        labels: props.winrateData.map(d => d.playerName),
        datasets: [
          {
            label: 'Winrate (%)',
            data: props.winrateData.map(d => d.winrate),
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

  onMounted(renderChart)
  onBeforeUnmount(() => chartInstance?.destroy())

  // quando mudar o dataset (troca confra)
  watch(() => props.winrateData, renderChart)
</script>
