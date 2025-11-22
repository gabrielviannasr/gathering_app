<template>
  <q-page class="page-bg">
    <!-- ========================== -->
    <!-- CARD DO EVENTO (component) -->
    <!-- ========================== -->
    <div class="q-pa-md">
      <EventHeaderCard :event="event" />
    </div>

    <!-- ========================== -->
    <!-- CARD DO ROUND (Número + Vencedor) -->
    <!-- ========================== -->
    <div class="q-pa-md">
      <q-card class="q-pa-md form-card">
        <!-- Título + Número da rodada -->
        <div class="row items-center justify-between">
          <div class="form-section-title">Rodada</div>
          <div class="round-number-circle">
            {{ round.round }}
          </div>
        </div>

        <!-- Linha do vencedor -->
        <div class="row items-center justify-between q-mt-md">
          <div class="text-subtitle2 text-bold">Vencedor</div>

          <!-- Com vencedor -->
          <div v-if="round.idPlayerWinner" class="winner-box q-pa-sm">
            {{ findPlayer(round.idPlayerWinner).name }}
          </div>

          <!-- Sem vencedor -->
          <div v-else class="text-grey">Sem vencedor</div>
        </div>

        <!-- STATUS -->
        <div class="row items-center justify-between q-mt-md">
          <div class="text-subtitle2 text-bold">Status</div>

          <q-badge
            :color="round.canceled ? 'negative' : 'positive'"
            class="q-px-md q-py-xs text-bold"
            rounded
          >
            {{ round.canceled ? 'Cancelada' : 'Ativa' }}
          </q-badge>
        </div>

        <!-- Toggle continua (opcional) -->
        <div class="row justify-end q-mt-sm">
          <q-toggle
            v-model="round.canceled"
            size="md"
            color="negative"
            :label="round.canceled ? 'Ativar rodada' : 'Cancelar rodada'"
            class="text-bold"
          />
        </div>
      </q-card>
    </div>

    <!-- ========================== -->
    <!-- CARD DA CONFIGURAÇÃO DA TAXA -->
    <!-- ========================== -->
    <div class="q-pa-md">
      <q-card class="q-pa-md form-card q-mt-md">
        <div class="form-section-title">Configuração da Rodada</div>

        <div class="q-mt-sm">
          <!-- Jogadores -->
          <div class="row items-center justify-between q-mb-sm">
            <div class="label">Jogadores</div>
            <div class="round-number-circle-gray">{{ activeConfig?.players }}</div>
          </div>

          <!-- Premiação -->
          <div class="row items-center justify-between q-mb-sm">
            <div class="label">Premiação</div>
            <div class="value text-right">R$ {{ formatCurrency(activeConfig?.prize) }}</div>
          </div>

          <!-- Pote dos derrotados -->
          <div class="row items-center justify-between q-mt-md">
            <div class="label">Pote dos Derrotados</div>
            <div class="value text-right">R$ {{ formatCurrency(activeConfig?.loserPot) }}</div>
          </div>
        </div>
      </q-card>
    </div>

    <!-- ========================== -->
    <!-- LISTA DE JOGADORES DA RODADA -->
    <!-- ========================== -->
    <div class="q-pa-md">
      <q-card class="q-pa-md form-card">
        <div class="form-section-title">Jogadores da Rodada</div>

        <!-- Lista -->
        <div v-if="roundPlayers.length > 0" class="q-mt-sm q-gutter-sm">
          <q-card
            v-for="player in roundPlayers"
            :key="player.id"
            class="list-card q-pa-sm"
            :class="{
              'round-player-selected': selectedPlayer?.id === player.id
            }"
            clickable
            @click="onSelectPlayer(player)"
          >
            <div class="row items-center no-wrap">
              <!-- Avatar círculo -->
              <div class="avatar-circle q-mr-md">
                <div class="avatar-text">{{ initials(player.name) }}</div>
              </div>

              <div class="col">
                <div class="text-subtitle2 text-bold">
                  {{ player.name }}
                </div>
              </div>

              <!-- Ícone do vencedor -->
              <q-icon
                v-if="round.idPlayerWinner === player.id"
                name="emoji_events"
                class="trophy-icon q-mr-md"
                size="26px"
              />

              <!-- Botão remover -->
              <q-btn
                round
                dense
                flat
                color="negative"
                icon="delete"
                @click.stop="removePlayer(player)"
              />
            </div>
          </q-card>
        </div>

        <div v-else class="text-grey q-mt-sm">Nenhum jogador na rodada.</div>

        <!-- BOTÃO DEFINIR VENCEDOR — LOGO APÓS A LISTA -->
        <div class="q-mt-md">
          <q-btn
            rounded
            no-caps
            class="add-btn full-width"
            icon="emoji_events"
            label="Definir Vencedor"
            :disable="!selectedPlayer"
            @click="defineWinner"
          />
        </div>
      </q-card>
    </div>

    <!-- ========================== -->
    <!-- CARD DE FILTROS (Adicionar jogador) -->
    <!-- ========================== -->
    <div class="q-pa-md">
      <q-card class="q-pa-md form-card">
        <div class="form-section-title">Adicionar Jogador</div>

        <!-- Campo de busca -->
        <div class="q-mt-sm">
          <GlobalInput v-model="search" placeholder="Buscar jogador" label="Nome" debounce="300">
            <template #prepend>
              <q-icon name="search" />
            </template>
          </GlobalInput>
        </div>

        <!-- Lista de resultados -->
        <div v-if="search.length > 0" class="q-mt-md q-gutter-sm">
          <q-card v-for="player in availablePlayers" :key="player.id" class="list-card q-pa-sm">
            <div class="row items-center no-wrap">
              <div class="col">
                {{ player.name }}
              </div>

              <q-btn dense rounded unelevated no-caps color="primary" @click="addPlayer(player)">
                Adicionar
              </q-btn>
            </div>
          </q-card>

          <div v-if="availablePlayers.length === 0" class="text-grey">
            Nenhum jogador encontrado.
          </div>
        </div>
      </q-card>
    </div>

    <!-- ========================== -->
    <!-- BOTÕES FINAIS -->
    <!-- ========================== -->
    <div class="q-pa-md">
      <div class="row q-col-gutter-sm">
        <!-- Cancelar -->
        <div class="col">
          <q-btn outline rounded no-caps class="full-width" label="Cancelar" @click="onCancel" />
        </div>

        <!-- Salvar -->
        <div class="col">
          <q-btn rounded no-caps class="add-btn full-width" label="Salvar" @click="onSave" />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
  /* -------------------------------------------
     IMPORTS
  ------------------------------------------- */
  import { ref, computed, onMounted } from 'vue'
  import EventHeaderCard from 'src/components/events/EventHeaderCard.vue'
  import GlobalInput from 'src/components/ui/GlobalInput.vue'
  import { useRouter } from 'vue-router'

  const router = useRouter()

  /* -------------------------------------------
     MOCKUP DO EVENTO
  ------------------------------------------- */
  const event = ref({
    idFormat: 2,
    format: { id: 2, name: 'Conquest' },
    date: '2025-01-20',
    players: 8,
    rounds: 8,
    confraFee: 20.0,
    roundFee: 10.0
  })

  /* -------------------------------------------
     MOCKUP DA RODADA
  ------------------------------------------- */
  const round = ref({
    id: 1,
    round: 1,
    idPlayerWinner: 5,
    canceled: false
  })

  /* -------------------------------------------
     MOCKUP DA CONFIGURAÇÃO DA TAXA
  ------------------------------------------- */
  // const config = ref({
  //   players: 6,
  //   prize: 45.0,
  //   loserPot: 15.0
  // })

  const players = ref(6) // jogadores da rodada atual

  const allConfigs = ref([
    {
      players: 5,
      prize: 40.0,
      loserPot: 10.0
    },
    {
      players: 6,
      prize: 45.0,
      loserPot: 15.0
    }
  ])

  // Configuração ativa que será exibida
  const activeConfig = ref(null)

  /* -------------------------------------------
     MOCKUP LISTA DE TODOS OS JOGADORES
  ------------------------------------------- */
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

  /* -------------------------------------------
     JOGADORES DA RODADA
  ------------------------------------------- */
  const roundPlayers = ref([
    // Apenas mock para edição
    { id: 1, name: 'Anderson Dias' },
    { id: 2, name: 'Arthur Leal' },
    { id: 3, name: 'Cindomar Ferreira' },
    { id: 4, name: 'Gabriel Vianna' },
    { id: 5, name: 'Jean Benevides' },
    { id: 6, name: 'Jhonny Dias' }
  ])

  /* -------------------------------------------
     FUNÇÃO PARA ATUALIZAR A CONFIGURAÇÃO ATIVA
  ------------------------------------------- */
  function updateActiveConfig() {
    const count = players.value

    // Procurar config existente
    const found = allConfigs.value.find(c => c.players === count)

    if (found) {
      activeConfig.value = { ...found }
      return
    }

    // Criar nova config se não existir
    const newConfig = {
      players: count,
      prize: event.value.roundFee * count,
      loserPot: 0
    }

    // adiciona ao conjunto geral
    allConfigs.value.push(newConfig)

    activeConfig.value = { ...newConfig }
  }

  /* -------------------------------------------
     BUSCA
  ------------------------------------------- */
  const search = ref('')

  /* -------------------------------------------
     PLAYERS DISPONÍVEIS PARA ADICIONAR
  ------------------------------------------- */
  const availablePlayers = computed(() => {
    if (!search.value) return []

    const q = search.value.toLowerCase()

    return allPlayers.value.filter(
      p => p.name.toLowerCase().includes(q) && !roundPlayers.value.some(rp => rp.id === p.id)
    )
  })

  /* -------------------------------------------
     SELEÇÃO DO JOGADOR
  ------------------------------------------- */
  const selectedPlayer = ref(null)

  function onSelectPlayer(player) {
    selectedPlayer.value = player
  }

  /* -------------------------------------------
     ADICIONAR JOGADOR NA RODADA
  ------------------------------------------- */
  function addPlayer(player) {
    if (roundPlayers.value.some(p => p.id === player.id)) return

    roundPlayers.value.push(player)
    players.value = roundPlayers.value.length

    updateActiveConfig()
  }

  /* -------------------------------------------
     REMOVER JOGADOR
  ------------------------------------------- */
  function removePlayer(player) {
    roundPlayers.value = roundPlayers.value.filter(p => p.id !== player.id)
    players.value = roundPlayers.value.length
    updateActiveConfig()
  }

  /* -------------------------------------------
     DEFINIR VENCEDOR
  ------------------------------------------- */
  function defineWinner() {
    if (!selectedPlayer.value) return
    round.value.idPlayerWinner = selectedPlayer.value.id
  }

  /* -------------------------------------------
     HELPERS
  ------------------------------------------- */
  function findPlayer(id) {
    return allPlayers.value.find(p => p.id === id) || { name: 'Desconhecido' }
  }

  function formatCurrency(v) {
    const n = Number(v)
    if (isNaN(n)) return '0,00'
    return n.toFixed(2).replace('.', ',')
  }

  function initials(name) {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
  }

  // cancelar / salvar (placeholders)
  function onCancel() {
    router.back()
  }

  function onSave() {
    // montagem do payload
    // const payload = {
    //   ...round.value,
    //   players: config.value.players,
    //   prize: config.value.prize,
    //   loserPot: config.value.loserPot
    // }
    console.log('Salvar round payload')
    // futuramente: chamada HTTP
    router.back()
  }

  onMounted(() => {
    players.value = roundPlayers.value.length
    updateActiveConfig()
  })
</script>

<style scoped>
  /* Espaçamento dos rows do card da taxa */
  .item-row {
    padding: 10px 0;
    border-bottom: 1px solid #eee;
  }
  .item-row:last-child {
    border-bottom: none;
  }

  .label {
    color: #555;
    font-size: 14px;
  }

  .value {
    font-size: 14px;
  }

  .trophy-icon {
    color: #fe9a00 !important;
  }

  /* Jogador selecionado */
  .round-player-selected {
    border: 2px solid #7f00ff;
    background: #f6ebff;
  }
</style>
