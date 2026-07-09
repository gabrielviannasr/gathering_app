<template>
  <q-page class="page-bg">
    <!-- CARD DO EVENTO -->
    <div class="q-pa-md">
      <EventHeaderCard v-if="event" :event="event" />
      <q-skeleton v-else height="120px" class="q-ma-md" />
    </div>

    <!-- CARD DO ROUND -->
    <div class="q-pa-md">
      <q-card v-if="round" class="q-pa-md form-card">
        <div class="row items-center justify-between">
          <div class="form-section-title">Rodada</div>
          <div class="round-number-circle">
            {{ round.round }}
          </div>
        </div>

        <!-- FORMATO DA RODADA -->
        <div class="q-mt-md">
          <GlobalSelect
            label="Formato da Rodada"
            :options="formatOptions"
            v-model="round.idFormat"
            emit-value
            map-options
            placeholder="Selecione um formato"
          >
            <!-- Ícone opcional -->
            <template #prepend>
              <q-icon name="style" />
            </template>
          </GlobalSelect>
        </div>

        <!-- VENCEDOR -->
        <div class="row items-center justify-between q-mt-md">
          <div class="text-subtitle2 text-bold">Vencedor</div>

          <div v-if="round.playerWinner" class="winner-box q-pa-sm">
            {{ round.playerWinner.name }}
          </div>

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

        <div class="row justify-end q-mt-sm">
          <q-toggle
            left-label
            v-model="round.canceled"
            size="md"
            color="negative"
            :label="round.canceled ? 'Ativar rodada' : 'Cancelar rodada'"
            class="text-bold"
          />
        </div>
      </q-card>

      <q-skeleton v-else height="180px" class="q-pa-md" />
    </div>

    <!-- CONFIGURAÇÃO ATIVA -->
    <div class="q-pa-md">
      <q-card class="q-pa-md form-card">
        <div class="form-section-title">Configuração da Rodada</div>

        <div class="q-mt-sm">
          <div class="row items-center justify-between q-mb-sm">
            <div class="label">Jogadores</div>
            <div class="round-number-circle-gray">{{ round?.players ?? 0 }}</div>
          </div>

          <div class="row items-center justify-between q-mb-sm">
            <div class="label">Premiação</div>
            <div class="value text-right">R$ {{ format(round?.prize ?? 0) }}</div>
          </div>

          <div class="row items-center justify-between q-mt-md">
            <div class="label">Pote dos Derrotados</div>
            <div class="value text-right">R$ {{ format(round?.loserPot ?? 0) }}</div>
          </div>
        </div>
      </q-card>
    </div>

    <!-- ADICIONAR JOGADOR -->
    <div class="q-pa-md">
      <q-card class="q-pa-md form-card">
        <div class="form-section-title">Adicionar Jogador</div>

        <GlobalInput
          v-model="search"
          placeholder="Buscar jogador"
          label="Nome"
          debounce="300"
          class="q-mt-sm"
        >
          <template #prepend>
            <q-icon name="search" />
          </template>
        </GlobalInput>

        <div v-if="search.length > 0" class="q-mt-md q-gutter-sm">
          <q-card
            v-for="player in availablePlayers"
            :key="player.id"
            class="list-card q-pa-sm row items-center no-wrap"
          >
            <div class="col">
              {{ player.name }}
            </div>

            <q-btn dense rounded unelevated no-caps color="primary" @click="addPlayer(player)">
              Adicionar
            </q-btn>
          </q-card>

          <div v-if="availablePlayers.length === 0" class="text-grey">
            Nenhum jogador encontrado.
          </div>
        </div>
      </q-card>
    </div>

    <!-- LISTA DE JOGADORES DA RODADA -->
    <div class="q-pa-md">
      <q-card class="q-pa-md form-card">
        <div class="form-section-title">Jogadores da Rodada</div>

        <div v-if="roundPlayers.length > 0" class="q-mt-sm q-gutter-sm">
          <q-card
            v-for="player in roundPlayers"
            :key="player.id"
            class="list-card q-pa-sm"
            :class="{ 'round-player-selected': selectedPlayer?.id === player.id }"
            clickable
            @click="selectPlayer(player)"
          >
            <div class="row items-center no-wrap">
              <div class="avatar-circle q-mr-md">
                <div class="avatar-text">{{ initials(player.name) }}</div>
              </div>

              <div class="col">
                <div class="text-subtitle2 text-bold">{{ player.name }}</div>
              </div>

              <q-icon
                v-if="round.idPlayerWinner === player.id"
                name="emoji_events"
                class="trophy-icon q-mr-md"
                size="26px"
              />

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

        <q-btn
          rounded
          no-caps
          class="add-btn full-width q-mt-md"
          icon="emoji_events"
          label="Definir Vencedor"
          :disable="!selectedPlayer"
          @click="defineWinner"
        />
      </q-card>
    </div>

    <!-- BOTÕES FINAIS -->
    <div class="q-pa-md">
      <div class="row q-col-gutter-sm">
        <div class="col">
          <q-btn outline rounded no-caps class="full-width" label="Cancelar" @click="cancel" />
        </div>

        <div class="col">
          <q-btn rounded no-caps class="add-btn full-width" label="Salvar" @click="save" />
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
  import GlobalSelect from 'src/components/ui/GlobalSelect.vue'

  import { useEventStore } from 'src/stores/event'
  import { useFormatStore } from 'src/stores/format'
  import { usePlayerStore } from 'src/stores/player'
  import { useRoundStore } from 'src/stores/round'

  /* ------------- ROTAS / STORES ---------------- */
  const route = useRoute()
  const router = useRouter()

  const eventStore = useEventStore()
  const formatStore = useFormatStore()
  const playerStore = usePlayerStore()
  const roundStore = useRoundStore()

  /* ------------- PARAMS ---------------- */
  const idEvent = Number(route.params.idEvent)
  const roundParam = route.params.round
  const isNewRound = roundParam === undefined
  const roundNumber = isNewRound ? null : Number(roundParam)

  /* ----------------- DATA ---------------- */
  const event = computed(() => eventStore.event)
  const round = ref(null)

  const formatOptions = computed(() =>
    formatStore.formats.map(f => ({
      label: f.name,
      value: f.id
    }))
  )

  const allPlayers = computed(() => playerStore.players)

  /* lista de jogadores dessa rodada */
  const roundPlayers = ref([])

  /* configs do evento (fees) */
  // const eventConfigs = computed(() => event.value?.fees ?? [])

  /* config ativa conforme qtd jogadores */
  // const activeConfig = computed(() => {
  //   const qty = roundPlayers.value.length

  //   // 1. Buscar config definida no evento
  //   const config = eventConfigs.value.find(c => c.players === qty)

  //   if (config) return config

  //   // 2. Fallback dinâmico
  //   return {
  //     players: qty,
  //     prize: qty * (event.value?.roundFee ?? 0),
  //     loserPot: 0
  //   }
  // })

  /* selecionado para definir vencedor */
  const selectedPlayer = ref(null)

  /* ---------------- LOAD ---------------- */
  onMounted(load)

  async function load() {
    await eventStore.getEvent(idEvent)

    if (!event.value) {
      console.warn('EVENT NOT FOUND:', idEvent)
      router.back()
      return
    }

    if (isNewRound) {
      round.value = {
        id: null,
        round: (event.value.rounds ?? 0) + 1,
        idFormat: event.value.idFormat ?? null,
        idPlayerWinner: null,
        canceled: false,
        players: 0,
        createdAt: new Date().toISOString()
      }

      roundPlayers.value = []
    } else {
      const stored = await roundStore.getRound(idEvent, roundNumber)

      if (!stored) {
        console.warn('ROUND NOT FOUND:', idEvent, roundNumber)
        router.back()
        return
      }

      round.value = { ...stored }
    }
  }

  /* ----------------- FUNÇÕES ---------------- */
  function selectPlayer(player) {
    selectedPlayer.value = player
  }

  function addPlayer(player) {
    if (!roundPlayers.value.some(p => p.id === player.id)) {
      roundPlayers.value.push(player)
    }
  }

  function removePlayer(player) {
    roundPlayers.value = roundPlayers.value.filter(p => p.id !== player.id)
  }

  function defineWinner() {
    if (!selectedPlayer.value) return
    round.value.idPlayerWinner = selectedPlayer.value.id
  }

  function initials(name) {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
  }

  function format(v) {
    if (!v) return '0,00'
    return Number(v).toLocaleString('pt-BR', { minimumFractionDigits: 2 })
  }

  function cancel() {
    router.back()
  }

  async function save() {
    const data = {
      ...round.value,
      players: roundPlayers.value.length
    }

    try {
      if (isNewRound) {
        await roundStore.createRound(idEvent, data)
      } else {
        await roundStore.updateRound(idEvent, roundNumber, data)
      }

      router.back()
    } catch (err) {
      console.error(err)
    }
  }

  /* Busca players para adicionar */
  const search = ref('')
  const availablePlayers = computed(() => {
    if (!search.value) return []
    return allPlayers.value.filter(
      p =>
        p.name.toLowerCase().includes(search.value.toLowerCase()) &&
        !roundPlayers.value.some(rp => rp.id === p.id)
    )
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
