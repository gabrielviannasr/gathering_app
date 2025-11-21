<template>
  <q-page class="page-bg">
    <!-- CARD DO EVENTO -->
    <div class="q-pa-md">
      <EventHeaderCard :event="event" class="q-pa-md" />
    </div>

    <!-- CARD DO RANK -->
    <div class="q-pa-md">
      <q-card class="q-pa-md form-card">
        <!-- TÍTULO DA SESSÃO -->
        <div class="form-section-title">Detalhes do Rank</div>

        <!-- TABELA DE DETALHES -->
        <div class="rank-table">
          <div class="row item-row">
            <div class="col-6 label">Jogador</div>
            <div class="col-6 value">{{ player.name }}</div>
          </div>

          <!-- Rank com ícone -->
          <div class="row item-row highlight items-center">
            <div class="col-6 label">Rank</div>
            <div class="col-6 value text-bold row items-center justify-end">
              <!-- :name="rankMedal(rank.rank)" -->
              <q-icon
                name="emoji_events"
                size="32px"
                class="q-mr-sm"
                :style="`color: ${rankMedalColor(rank.rank)}`"
                v-if="rank.rank <= 3"
              />
              <!-- <span class="rank-large">{{ rank.rank }}</span> -->
              <!-- CÍRCULO COM NÚMERO DO RANK -->
              <div class="round-number-circle">
                {{ rank.rank }}
              </div>
            </div>
          </div>

          <!-- Vitórias  -->
          <div class="row item-row items-center justify-between">
            <div class="col-6 label">Vitórias</div>
            <!-- <div class="col-6 value">{{ rank.wins }}</div> -->
            <div class="round-number-circle-gray">
              {{ rank.wins }}
            </div>
          </div>

          <!-- Rodadas -->
          <div class="row item-row items-center justify-between">
            <div class="col-6 label">Rodadas</div>
            <!-- <div class="col-6 value">{{ rank.rounds }}</div> -->
            <div class="round-number-circle-gray">
              {{ rank.rounds }}
            </div>
          </div>

          <!-- Positivo -->
          <div class="row item-row">
            <div class="col-6 label">Positivo</div>
            <div class="col-6 value text-positive">R$ {{ formatCurrency(rank.positive) }}</div>
          </div>

          <!-- Negativo -->
          <div class="row item-row">
            <div class="col-6 label">Negativo</div>
            <div class="col-6 value text-negative">R$ {{ formatCurrency(rank.negative) }}</div>
          </div>

          <!-- Saldo Rankeado -->
          <div class="row item-row">
            <div class="col-6 label">Saldo Rankeado</div>
            <div class="col-6 value">R$ {{ formatCurrency(rank.rankBalance) }}</div>
          </div>

          <!-- Pote dos Derrotados -->
          <div class="row item-row">
            <div class="col-6 label">Pote dos Derrotados</div>
            <div class="col-6 value">R$ {{ formatCurrency(rank.loserPot) }}</div>
          </div>

          <!-- Saldo Final (DESTAQUE) -->
          <div class="row item-row final-row">
            <div class="col-6 label">Saldo Final</div>
            <div class="col-6 value final-value">R$ {{ formatCurrency(rank.finalBalance) }}</div>
          </div>
        </div>
      </q-card>
    </div>
  </q-page>
</template>

<script setup>
  import EventHeaderCard from 'src/components/events/EventHeaderCard.vue'
  import { ref } from 'vue'

  // MOCKUP (substituir depois pela chamada API/route params)
  const event = ref({
    idFormat: 1,
    format: { id: 1, name: 'Commander' },
    date: '2025-01-14',
    players: 8,
    rounds: 8
  })

  const player = ref({
    id: 7,
    name: 'Tobias Souza'
  })

  const rank = ref({
    idEvent: 1,
    idPlayer: 7,
    rank: 1,
    wins: 2,
    rounds: 4,
    positive: 90.0,
    negative: 40.0,
    rankBalance: 50.0,
    loserPot: 0.0,
    finalBalance: 50.0
  })

  function formatCurrency(v) {
    return v.toFixed(2).replace('.', ',')
  }

  // ícones de medalhas
  // eslint-disable-next-line no-unused-vars
  function rankMedal(position) {
    return (
      {
        1: 'emoji_events',
        2: 'military_award', // fallback
        3: 'military_tech'
      }[position] || ''
    )
  }

  function rankMedalColor(position) {
    return (
      {
        1: '#FFD700', // ouro
        2: '#C0C0C0', // prata
        3: '#CD7F32' // bronze
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

  .rank-large {
    font-size: 20px;
    font-weight: 800;
  }

  .final-row {
    background: #f5e8ff;
    border-radius: 8px;
    margin-top: 6px;
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
