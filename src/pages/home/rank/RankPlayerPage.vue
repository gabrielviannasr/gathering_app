<template>
  <q-page class="page-bg">
    <!-- CARD DO EVENTO -->
    <div class="q-pa-md">
      <EventHeaderCard :event="event" />
    </div>

    <!-- CARD DO RANK -->
    <div class="q-pa-md">
      <q-card class="q-pa-md form-card">
        <!-- TÍTULO DA SESSÃO -->
        <div class="form-section-title">Rank do Jogador</div>

        <!-- TABELA DE DETALHES -->
        <div class="rank-table">
          <div class="row item-row">
            <div class="col-6 label">Jogador</div>
            <div class="col-6 value text-bold">{{ player.name }}</div>
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
            <div class="col-6 value">R$ {{ formatCurrency(result?.loserPot ?? 0) }}</div>
          </div>

          <!-- Saldo Final (DESTAQUE) -->
          <div class="row item-row final-row">
            <div class="col-6 label">Saldo Final</div>
            <div class="col-6 value final-value">
              R$ {{ formatCurrency(result?.finalBalance ?? rank.rankBalance) }}
            </div>
          </div>
        </div>
      </q-card>
    </div>
  </q-page>
</template>

<script setup>
  import { computed, onMounted } from 'vue'
  import { useRoute } from 'vue-router'

  import EventHeaderCard from 'src/components/events/EventHeaderCard.vue'

  import { useEventStore } from 'src/stores/event'
  import { usePlayerStore } from 'src/stores/player'
  import { useRankStore } from 'src/stores/rank'
  import { useResultStore } from 'src/stores/result'

  /* ROUTE PARAMS */
  const route = useRoute()
  const idEvent = Number(route.params.idEvent)
  const idPlayer = Number(route.params.idPlayer)
  console.log('idEvent', idEvent)
  console.log('idPlayer', idPlayer)

  /* STORES */
  const eventStore = useEventStore()
  const playerStore = usePlayerStore()
  const rankStore = useRankStore()
  const resultStore = useResultStore()

  /* EVENT */
  const event = computed(() => eventStore.getEvent(idEvent))

  /* PLAYER */
  const player = computed(() => playerStore.getPlayer(idPlayer))

  /* RANK */
  const rank = computed(() => rankStore.getRankByPlayer(idEvent, idPlayer))
  console.log('rank', rank.value)

  /* RESULT */
  const result = computed(() => resultStore.getResultByPlayer(idEvent, idPlayer))
  console.log('result', result.value)

  /* LOAD */
  onMounted(() => {})

  /* HELPERS */
  function formatCurrency(v) {
    const n = Number(v)
    if (isNaN(n)) return '0,00'
    return n.toFixed(2).replace('.', ',')
  }

  function rankMedalColor(position) {
    return (
      {
        1: '#FFD700',
        2: '#C0C0C0',
        3: '#CD7F32'
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
