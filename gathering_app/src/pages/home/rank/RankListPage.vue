<template>
  <q-page class="page-bg">
    <!-- CARD DO EVENTO -->
    <div class="q-pa-md">
      <q-card class="q-pa-md form-card row items-center">
        <div class="icon-circle q-mr-md">
          <q-icon name="style" color="white" size="28px" />
        </div>

        <div class="col">
          <!-- Nome do formato -->
          <template v-if="event.idFormat && event.format">
            <div class="text-subtitle1 text-bold">{{ event.format.name }}</div>
          </template>
          <template v-else>
            <div class="text-caption text-grey">Sem formato</div>
          </template>

          <!-- Data -->
          <div class="text-caption text-grey">
            {{ formatDateShort(event.date) }}
          </div>

          <!-- Jogadores e rodadas -->
          <div class="text-caption q-mt-xs">
            {{ event.players }} jogadores • {{ event.rounds }} rodadas
          </div>
        </div>
      </q-card>
    </div>

    <!-- CARD DE FILTRO -->
    <div class="q-pa-md">
      <q-card class="q-pa-md form-card">
        <div class="form-section-title">Filtros</div>

        <GlobalInput
          label="Buscar por nome do jogador..."
          v-model="filters.search"
          placeholder="Digite o nome..."
        >
          <template #prepend>
            <q-icon name="search" />
          </template>
        </GlobalInput>
      </q-card>
    </div>

    <!-- LISTA -->
    <div class="q-pa-md q-gutter-md">
      <q-card
        v-for="item in filteredRank"
        :key="item.rank + '-' + item.idPlayer"
        class="list-card q-pa-sm"
        clickable
        @click="openRankDetail(item)"
      >
        <!-- WRAPPER -->
        <div class="row items-center no-wrap">
          <!-- CÍRCULO COM NÚMERO DO RANK -->
          <div class="round-number-circle q-mr-md">
            {{ item.rank }}
          </div>

          <!-- INFO -->
          <div class="col">
            <div class="text-subtitle2 text-bold">
              {{ resolvePlayer(item.idPlayer) }}
            </div>

            <div class="text-caption q-mt-xs row items-center">
              <q-icon name="emoji_events" size="16px" class="q-mr-xs" style="color: #fe9a00" />

              {{ item.wins }} vitórias • {{ item.rounds }} rodadas
            </div>
          </div>

          <!-- SETA -->
          <div class="q-ml-auto">
            <q-icon name="chevron_right" size="22px" />
          </div>
        </div>
      </q-card>

      <!-- Paginação -->
      <div class="q-mt-md">
        <q-pagination v-model="page" :max="maxPages" max-pages="5" />
      </div>
    </div>
  </q-page>
</template>

<script setup>
  import GlobalInput from 'src/components/ui/GlobalInput.vue'
  import { ref, computed } from 'vue'
  import { formatDateShort } from 'src/utils/date'

  // EVENTO MOCK
  const event = {
    id: 2,
    idFormat: 2,
    format: { id: 2, name: 'Conquest' },
    date: '2025-01-21',
    players: 8,
    rounds: 8
  }

  // RANK RESULT MOCK
  const rank = ref([
    { idEvent: 1, idPlayer: 7, rank: 1, wins: 2, rounds: 4 },
    { idEvent: 1, idPlayer: 6, rank: 2, wins: 2, rounds: 6 },
    { idEvent: 1, idPlayer: 2, rank: 3, wins: 1, rounds: 5 },
    { idEvent: 1, idPlayer: 8, rank: 4, wins: 1, rounds: 6 },
    { idEvent: 1, idPlayer: 1, rank: 5, wins: 1, rounds: 7 },
    { idEvent: 1, idPlayer: 5, rank: 6, wins: 1, rounds: 8 },
    { idEvent: 1, idPlayer: 3, rank: 7, wins: 0, rounds: 6 },
    { idEvent: 1, idPlayer: 4, rank: 7, wins: 0, rounds: 6 }
  ])

  // PLAYERS MOCK
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

  function resolvePlayer(id) {
    return players.find(p => p.id === id)?.name || '—'
  }

  // FILTROS
  const filters = ref({
    search: ''
  })

  const filteredRank = computed(() => {
    return rank.value.filter(item =>
      resolvePlayer(item.idPlayer).toLowerCase().includes(filters.value.search.toLowerCase())
    )
  })

  // PAGINAÇÃO MOCK
  const page = ref(1)
  const maxPages = 1

  function openRankDetail(item) {
    console.log('Abrir rank detail:', item)
  }
</script>
