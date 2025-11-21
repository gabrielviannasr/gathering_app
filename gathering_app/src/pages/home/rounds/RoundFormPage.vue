<template>
  <q-page class="page-bg">
    <!-- EVENT HEADER -->
    <div class="q-pa-md">
      <EventHeaderCard :event="event" />
    </div>

    <!-- ROUND CARD -->
    <div class="q-pa-md">
      <q-card class="q-pa-md form-card">
        <div class="form-section-title">Rodada</div>

        <div class="row items-center justify-between q-mt-sm">
          <div class="text-subtitle2 text-bold">Rodada</div>
          <div class="round-number-circle">{{ round.round }}</div>
        </div>

        <div class="row items-center justify-between q-mt-md">
          <div class="text-subtitle2 text-bold">Vencedor</div>

          <div v-if="round.idPlayerWinner" class="winner-box q-pa-sm">
            {{ findPlayer(round.idPlayerWinner).name }}
          </div>
          <div v-else class="text-grey">Sem vencedor</div>
        </div>
      </q-card>
    </div>

    <!-- CONFIGURAÇÃO DA TAXA -->
    <div class="q-pa-md">
      <q-card class="q-pa-md form-card">
        <div class="form-section-title">Configuração da Taxa</div>

        <div class="row q-mt-md items-center justify-between">
          <div class="label">Jogadores</div>
          <!-- usa o círculo cinza global -->
          <div class="round-number-circle-grey">{{ config.players }}</div>
        </div>

        <div class="row q-mt-md items-center justify-between">
          <div class="label">Premiação</div>
          <div class="value">R$ {{ formatCurrency(config.prize) }}</div>
        </div>

        <div class="row q-mt-md items-center justify-between">
          <div class="label">Pote da Confra</div>
          <div class="value">R$ {{ formatCurrency(config.loserPot) }}</div>
        </div>
      </q-card>
    </div>

    <!-- FILTROS -->
    <div class="q-pa-md">
      <q-card class="q-pa-md form-card">
        <div class="form-section-title">Filtros</div>

        <GlobalInput
          rounded
          outlined
          dense
          placeholder="Pesquisar jogador..."
          v-model="search"
          class="q-mt-md"
        >
          <template #prepend>
            <q-icon name="search" />
          </template>
        </GlobalInput>

        <q-btn rounded unelevated class="add-btn q-mt-md" no-caps @click="onAddPlayer">
          <q-icon name="person_add" class="q-mr-sm" />
          Adicionar jogador
        </q-btn>
      </q-card>
    </div>

    <!-- LISTA DE JOGADORES (selecionáveis) -->
    <div class="q-pa-md q-gutter-md">
      <q-card
        v-for="p in displayedPlayers"
        :key="p.id"
        :class="['list-card q-pa-sm', { 'round-player-selected': selectedPlayerId === p.id }]"
        clickable
        @click="toggleSelect(p)"
      >
        <div class="row items-center no-wrap">
          <div class="col text-subtitle2">{{ p.name }}</div>

          <div class="q-ml-auto row items-center no-wrap">
            <!-- ícone de troféu se for o vencedor atual do round -->
            <q-icon
              v-if="round.idPlayerWinner === p.id"
              name="emoji_events"
              class="trophy-icon q-mr-sm"
              size="28px"
            />

            <!-- indicador de seleção (check) -->
            <q-icon v-if="selectedPlayerId === p.id" name="check_circle" color="primary" />
          </div>
        </div>
      </q-card>

      <!-- Paginação placeholder se necessário -->
      <div class="q-mt-md" v-if="maxPages > 1">
        <q-pagination v-model="page" :max="maxPages" max-pages="5" />
      </div>
    </div>

    <!-- AÇÕES -->
    <div class="q-pa-md">
      <q-btn
        rounded
        unelevated
        no-caps
        class="add-btn full-width q-mb-md"
        @click="defineWinner"
        :disable="!selectedPlayerId"
      >
        <q-icon name="emoji_events" class="q-mr-sm" /> Definir Vencedor
      </q-btn>

      <div class="row q-col-gutter-md">
        <div class="col">
          <q-btn
            rounded
            outline
            color="grey-8"
            label="Cancelar"
            class="full-width"
            no-caps
            @click="onCancel"
          />
        </div>

        <div class="col">
          <q-btn
            rounded
            unelevated
            class="gradient-btn full-width"
            label="Salvar"
            no-caps
            @click="onSave"
          />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
  import { ref, computed, onMounted } from 'vue'
  import { useRoute, useRouter } from 'vue-router'

  import EventHeaderCard from 'src/components/events/EventHeaderCard.vue'
  import GlobalInput from 'src/components/ui/GlobalInput.vue'

  const route = useRoute()
  const router = useRouter()

  // ----- base completa de jogadores (busca na base inteira) -----
  const allPlayers = ref([
    { id: 1, name: 'Anderson Dias' },
    { id: 2, name: 'Arthur Leal' },
    { id: 3, name: 'Cindomar Ferreira' },
    { id: 4, name: 'Gabriel Vianna' },
    { id: 5, name: 'Jean Benevides' },
    { id: 6, name: 'Jhonny Dias' },
    { id: 7, name: 'Tobias Souza' },
    { id: 8, name: 'Valmir Vicente' }
  ])

  // ----- determine novo ou editar via route param id (se existir) -----
  const isNew = ref(!route.params.id)

  // MOCK EVENT
  const event = ref({
    idFormat: 2,
    format: { id: 1, name: 'Conquest' },
    date: '2025-01-20',
    players: 8,
    rounds: 8
  })

  // ----- round (novo ou edição) -----
  const round = ref({
    id: null,
    round: 1,
    idPlayerWinner: null,
    players: 0,
    prize: 0,
    loserPot: 0
  })

  // ----- se editando, mocka a rodada com dados e jogadores -----
  const roundPlayers = ref([]) // jogadores que participam desta rodada (apresentados na lista)
  onMounted(() => {
    if (!isNew.value) {
      // edição: populamos com 6 jogadores (mockup)
      round.value = {
        id: 1,
        round: 1,
        idPlayerWinner: 5,
        players: 6,
        prize: 45.0,
        loserPot: 15.0
      }

      // os 6 primeiros do allPlayers por mock
      roundPlayers.value = allPlayers.value.slice(0, 6)
    } else {
      // novo: round começa vazio (sem jogadores)
      round.value = {
        id: null,
        round: 1,
        idPlayerWinner: null,
        players: 0,
        prize: 0,
        loserPot: 0
      }
      roundPlayers.value = []
    }
  })

  // config de taxa (mostrada no card)
  const config = ref({
    players: 6,
    prize: 45.0,
    loserPot: 15.0
  })

  // busca / seleção
  const search = ref('')
  const page = ref(1)
  const maxPages = 1

  const displayedPlayers = computed(() => {
    // se há texto na busca, pesquisar na base completa (allPlayers)
    if (search.value && search.value.trim().length > 0) {
      return allPlayers.value.filter(p => p.name.toLowerCase().includes(search.value.toLowerCase()))
    }
    // se não pesquisar, mostrar os jogadores do round (edição) ou vazio (novo)
    return roundPlayers.value
  })

  // seleção (clicar apenas seleciona)
  const selectedPlayerId = ref(null)

  function toggleSelect(player) {
    if (selectedPlayerId.value === player.id) selectedPlayerId.value = null
    else selectedPlayerId.value = player.id
  }

  // find helper
  function findPlayer(id) {
    return allPlayers.value.find(p => p.id === id) || { id: null, name: '—' }
  }

  // definir vencedor (aplica ao round)
  function defineWinner() {
    if (!selectedPlayerId.value) return
    round.value.idPlayerWinner = selectedPlayerId.value
    // opcional: mostrar toast
    // Notify.create({ type: 'positive', message: 'Vencedor definido' })
  }

  // adicionar jogador (placeholder)
  function onAddPlayer() {
    // aqui você pode abrir modal para adicionar jogador à rodada
    console.log('Adicionar jogador (placeholder)')
  }

  // cancelar / salvar (placeholders)
  function onCancel() {
    router.back()
  }

  function onSave() {
    // montagem do payload
    const payload = {
      ...round.value,
      players: config.value.players,
      prize: config.value.prize,
      loserPot: config.value.loserPot
    }
    console.log('Salvar round payload', payload)
    // futuramente: chamada HTTP
    router.back()
  }

  // util
  function formatCurrency(v) {
    return Number(v).toFixed(2).replace('.', ',')
  }
</script>

<style scoped>
  /* reaproveita classes globais (round-number-circle, etc) */
  /* selection highlight */
  .round-player-selected {
    border: 2px solid #7f00ff;
    background: #f6ebff;
    border-radius: 8px;
    transition: 0.12s;
  }

  /* trophy icon through css (style-based) */
  .trophy-icon {
    color: #fe9a00 !important;
    font-size: 28px !important;
  }

  /* gradient save button (local fallback) */
  .gradient-btn {
    background: linear-gradient(135deg, #7f00ff, #3c6ef3);
    color: white;
    font-weight: 600;
  }

  /* winner box */
  .winner-box {
    background: #e6fbe6;
    border: 1px solid #9be39b;
    color: #267326;
    border-radius: 8px;
    font-weight: 600;
  }

  /* ensure the round-number circle is stable */
  .round-number-circle {
    width: 42px;
    height: 42px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    color: white;
    font-weight: bold;
    font-size: 18px;
    background: linear-gradient(135deg, #7f00ff, #3c6ef3);
  }

  /* assume this exists globally, but safe fallback */
  .round-number-circle-grey {
    width: 42px;
    height: 42px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    color: #333;
    font-weight: 700;
    background: #ececec;
    flex-shrink: 0;
  }
</style>
