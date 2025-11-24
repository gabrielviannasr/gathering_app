<template>
  <q-page class="page-bg">
    <!-- CARD DO EVENTO -->
    <div class="q-pa-md">
      <EventHeaderCard :event="event" class="q-pa-md" />
    </div>

    <!-- BOTÃO ADICIONAR -->
    <div class="q-pa-md">
      <q-btn class="add-btn full-width" rounded unelevated no-caps @click="openAddForm">
        <q-icon name="add" class="q-mr-sm" />
        Adicionar Rodada
      </q-btn>
    </div>

    <!-- LISTA DE RODADAS -->
    <div class="q-pa-md q-gutter-md">
      <q-card
        v-for="round in rounds"
        :key="round.round"
        class="list-card q-pa-md"
        clickable
        @click="open(round)"
      >
        <!-- WRAPPER PARA GARANTIR O CÍRCULO -->
        <div class="row items-center no-wrap">
          <!-- NÚMERO DA RODADA → círculo gradiente -->
          <div class="round-number-circle q-mr-md">
            {{ round.round }}
          </div>

          <!-- INFO -->
          <div class="col">
            <!-- Formato • Jogadores -->
            <div class="text-caption q-mt-xs">
              Formato: {{ event.format.name }} • {{ round.players }} jogadores
            </div>

            <!-- Vencedor -->
            <div class="text-subtitle2 q-mt-xs">
              <template v-if="round.idPlayerWinner">
                Vencedor:
                <span class="text-bold text-primary">
                  {{ resolveWinner(round.idPlayerWinner) }}
                </span>
              </template>
              <template v-else>
                <span class="text-caption">Sem vencedor</span>
              </template>
            </div>

            <!-- STATUS -->
            <q-badge
              class="q-mt-sm"
              :color="round.canceled ? 'negative' : 'positive'"
              align="middle"
            >
              {{ round.canceled ? 'Cancelada' : 'Ativa' }}
            </q-badge>
          </div>

          <!-- SETA -->
          <div class="q-ml-auto">
            <q-icon name="chevron_right" size="22px" />
          </div>
        </div>
      </q-card>

      <!-- PAGINAÇÃO -->
      <div class="q-mt-md">
        <q-pagination v-model="page" :max="maxPages" max-pages="5" />
      </div>
    </div>

    <!-- BOTÃO FINALIZAR EVENTO -->
    <div class="q-pa-md">
      <q-btn class="add-btn full-width" rounded unelevated no-caps @click="finalizarEvento">
        <q-icon name="emoji_events" class="q-mr-sm" />
        Finalizar Evento
      </q-btn>
    </div>
  </q-page>
</template>

<script setup>
  import EventHeaderCard from 'src/components/events/EventHeaderCard.vue'
  import { ref } from 'vue'
  import { date } from 'quasar'
  import { useRoundNavigator } from 'src/composables/navigation'

  const { goToNewRound, goToEditRound } = useRoundNavigator()

  // MOCK EVENT
  const event = ref({
    id: 1,
    idFormat: null,
    format: { id: 2, name: 'Conquest', type: { id: 1, name: 'Cartas' } },
    date: '2025-01-21',
    players: 8,
    rounds: 8
  })

  // PLAYERS
  const players = [
    { id: 1, name: 'Anderson Dias' },
    { id: 2, name: 'Arthur Leal' },
    { id: 3, name: 'Cindomar Ferreira' },
    { id: 4, name: 'Gabriel Vianna' },
    { id: 5, name: 'Jean Benevides' },
    { id: 6, name: 'Jhonny Dias' },
    { id: 7, name: 'Tobias Souza' },
    { id: 8, name: 'Valmir Vicente' }
  ]

  // ROUNDS
  const rounds = ref([
    { idPlayerWinner: 5, idFormat: 2, round: 1, players: 6, canceled: false },
    { idPlayerWinner: 7, idFormat: 2, round: 2, players: 6, canceled: false },
    { idPlayerWinner: 8, idFormat: 2, round: 3, players: 6, canceled: false },
    { idPlayerWinner: 1, idFormat: 2, round: 4, players: 6, canceled: false },
    { idPlayerWinner: 7, idFormat: 2, round: 5, players: 6, canceled: false },
    { idPlayerWinner: 6, idFormat: 2, round: 6, players: 6, canceled: false },
    { idPlayerWinner: 2, idFormat: 2, round: 7, players: 6, canceled: false },
    { idPlayerWinner: 6, idFormat: 2, round: 8, players: 6, canceled: false }
  ])

  const page = ref(1)
  const maxPages = 2

  // eslint-disable-next-line no-unused-vars
  function formatDate(d) {
    return date.formatDate(d, 'DD [de] MMM [de] YYYY', {
      monthsShort: [
        'jan',
        'fev',
        'mar',
        'abr',
        'mai',
        'jun',
        'jul',
        'ago',
        'set',
        'out',
        'nov',
        'dez'
      ]
    })
  }

  function resolveWinner(id) {
    return players.find(p => p.id === id)?.name || 'Desconhecido'
  }

  function openAddForm() {
    console.log('Adicionar rodada')
    goToNewRound(event.value.id)
  }

  function open(item) {
    console.log('Abrir rodada', item)
    goToEditRound(event.value.id, item.round)
  }

  function finalizarEvento() {
    console.log('Finalizar evento clicado → calcular distribuição de potes e saldo final')
  }
</script>
