<template>
  <q-card bordored class="q-pa-md form-card">
    <div class="form-section-title">Rank do Jogador</div>

    <div class="rank-table q-mt-md">
      <!-- Jogador -->
      <div class="row item-row">
        <div class="col-6 label">Jogador</div>
        <div class="col-6 value text-bold">{{ result.player?.name }}</div>
      </div>

      <!-- Rank -->
      <div class="row item-row highlight items-center">
        <div class="col-6 label">Rank</div>

        <div class="col-6 value text-bold row items-center justify-end">
          <q-icon
            v-if="result.rank <= 3"
            name="emoji_events"
            size="32px"
            class="q-mr-sm"
            :style="`color: ${rankMedalColor(result.rank)}`"
          />

          <div class="round-number-circle">
            {{ result.rank }}
          </div>
        </div>
      </div>

      <!-- Vitórias -->
      <div class="row item-row items-center justify-between">
        <div class="col-6 label">Vitórias</div>
        <div class="round-number-circle-gray">
          {{ result.wins }}
        </div>
      </div>

      <!-- Rodadas -->
      <div class="row item-row items-center justify-between">
        <div class="col-6 label">Rodadas</div>
        <div class="round-number-circle-gray">
          {{ result.rounds }}
        </div>
      </div>

      <!-- Eventos (só confra usa) -->
      <div v-if="result.events !== undefined" class="row item-row items-center justify-between">
        <div class="col-6 label">Eventos</div>
        <div class="round-number-circle-gray">
          {{ result.events }}
        </div>
      </div>

      <!-- Positivo -->
      <div class="row item-row">
        <div class="col-6 label">Positivo</div>
        <div class="col-6 value text-positive">{{ formatCurrency(result.positive) }}</div>
      </div>

      <!-- Negativo -->
      <div class="row item-row">
        <div class="col-6 label">Negativo</div>
        <div class="col-6 value text-negative">{{ formatCurrency(result.negative) }}</div>
      </div>

      <!-- Saldo Rankeado -->
      <div class="row item-row">
        <div class="col-6 label">Saldo Rankeado</div>
        <div class="col-6 value">{{ formatCurrency(result.rankBalance) }}</div>
      </div>

      <!-- Pote dos derrotados -->
      <div class="row item-row">
        <div class="col-6 label">Pote dos Derrotados</div>
        <div class="col-6 value">{{ formatCurrency(result.loserPot ?? 0) }}</div>
      </div>

      <!-- Saldo Final -->
      <div class="row item-row final-row">
        <div class="col-6 final-label">Saldo Final</div>
        <div class="col-6 final-value">
          {{ formatCurrency(result.finalBalance ?? result.rankBalance) }}
        </div>
      </div>
    </div>
  </q-card>
</template>

<script setup>
  import { formatCurrency } from 'src/utils/number'

  defineProps({
    result: { type: Object, required: true }
  })

  function rankMedalColor(position) {
    return (
      {
        1: '#FFD700', // Ouro
        2: '#C0C0C0', // Prata
        3: '#CD7F32' // Bronze
      }[position] || '#000000'
    )
  }
</script>

<style scoped>
  .rank-table {
    margin-top: 4px;
  }
  .item-row {
    padding: 12px 4px;
    border-bottom: 1px solid #eee;
  }
  .item-row:last-child {
    border-bottom: none;
  }
  .label {
    font-size: 14px;
    color: #555;
  }
  .value {
    font-size: 14px;
    text-align: right;
  }
  .final-row {
    background: #f5e8ff;
    border-radius: 8px;
    margin-top: 6px;
  }
  .final-label {
    font-size: 20px;
    font-weight: 700;
    color: #7f00ff;
  }
  .final-value {
    font-size: 20px;
    font-weight: 700;
    color: #7f00ff;
    text-align: right;
  }
  .text-positive {
    color: green;
  }
  .text-negative {
    color: red;
  }
</style>
