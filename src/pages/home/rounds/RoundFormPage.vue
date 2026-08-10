<template>
  <q-page class="page-bg">
    <!-- CARD DO EVENTO -->
    <div class="q-pa-md">
      <EventCard :showArrow="false" :event="event" v-if="event" />
      <q-skeleton v-else height="120px" class="q-ma-md" />
    </div>

    <!-- CARD DO ROUND -->
    <div class="q-pa-md">
      <q-card class="q-pa-md form-card" v-if="form">
        <div class="row items-center justify-between">
          <div class="form-section-title">Rodada</div>
          <div class="round-number-circle">
            {{ form.round }}
          </div>
        </div>

        <!-- FORMATO DA RODADA -->
        <div class="q-mt-md">
          <GlobalSelect
            clearable
            v-model="form.idFormat"
            label="Formato"
            placeholder="Selecione o formato"
            :options="formats"
            option-label="name"
            option-value="id"
            map-options
            emit-value
          >
            <template #prepend>
              <q-icon name="style" />
            </template>
          </GlobalSelect>
        </div>

        <!-- VENCEDOR -->
        <div class="row items-center justify-between q-mt-md">
          <div class="text-subtitle2 text-bold">Vencedor</div>

          <div v-if="form.idPlayerWinner" class="winner-box q-pa-sm">
            {{ form.playerWinner.name }}
          </div>

          <div v-else class="text-grey">Sem vencedor</div>
        </div>

        <!-- STATUS -->
        <div class="row items-center justify-between q-mt-md">
          <div class="text-subtitle2 text-bold">Status</div>

          <q-badge
            rounded
            :color="form.canceled ? 'negative' : 'positive'"
            class="q-px-md q-py-xs text-bold"
          >
            {{ form.canceled ? 'Cancelada' : 'Ativa' }}
          </q-badge>
        </div>

        <q-btn
          no-caps
          rounded
          class="add-btn full-width q-mt-md"
          :color="form.canceled ? 'positive' : 'negative'"
          :icon="form.canceled ? 'check_circle' : 'cancel'"
          :label="form.canceled ? 'Ativar rodada' : 'Cancelar rodada'"
          @click="toggleCanceled"
        />
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
            <div class="round-number-circle-gray">{{ form.playersTotal ?? 0 }}</div>
          </div>

          <div class="row items-center justify-between q-mb-sm">
            <div class="label">Premiação</div>
            <div class="value text-right">{{ formatCurrency(form.prize ?? 0) }}</div>
          </div>

          <div class="row items-center justify-between q-mt-md">
            <div class="label">Pote dos Derrotados</div>
            <div class="value text-right">{{ formatCurrency(form.loserPot ?? 0) }}</div>
          </div>
        </div>
      </q-card>
    </div>

    <!-- ADICIONAR JOGADOR -->
    <div class="q-pa-md">
      <q-card class="q-pa-md form-card">
        <div class="form-section-title">Adicionar Jogador</div>

        <GlobalInput
          v-model="filters.name"
          placeholder="Buscar jogador"
          label="Nome"
          debounce="300"
          class="q-mt-sm"
        >
          <template #prepend>
            <q-icon name="search" />
          </template>
        </GlobalInput>

        <div v-if="filters.name.length > 0" class="q-mt-md q-gutter-sm">
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

    <!-- CARD DE JOGADORES DA RODADA -->
    <div class="q-pa-md">
      <q-card class="q-pa-md form-card">
        <!-- Title -->
        <div class="form-section-title">Jogadores da Rodada</div>

        <div v-if="form?.players.length > 0" class="q-mt-sm q-gutter-sm">
          <!-- LISTA -->
          <PlayerCard
            v-for="player in form.players"
            :key="player.id"
            :player="player"
            class="list-card q-pa-sm"
            :class="{ 'round-player-selected': playerSelected?.id === player.id }"
            @click="selectPlayer(player)"
          >
            <template #actions>
              <q-icon
                v-if="form.idPlayerWinner === player.id"
                name="emoji_events"
                class="trophy-icon q-mr-md"
                size="26px"
              />

              <q-btn
                flat
                round
                dense
                color="negative"
                icon="delete"
                @click.stop="removePlayer(player)"
              />
            </template>
          </PlayerCard>
        </div>

        <div v-else class="text-grey q-mt-sm">Nenhum jogador na rodada.</div>

        <q-btn
          no-caps
          rounded
          icon="emoji_events"
          label="Definir Vencedor"
          :disable="!playerSelected"
          class="add-btn full-width q-mt-md"
          @click="defineWinner"
        />
      </q-card>
    </div>

    <!-- BOTÕES FINAIS -->
    <div class="q-pa-md">
      <div class="row q-col-gutter-sm">
        <!-- Botão Cancelar -->
        <div class="col-6">
          <q-btn
            no-caps
            rounded
            outline
            label="Cancelar"
            color="grey-8"
            class="full-width"
            @click="cancel"
          />
        </div>

        <!-- Botão Salvar -->
        <div class="col-6">
          <q-btn push no-caps rounded label="Salvar" class="add-btn full-width" @click="save" />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
  /* VUE */
  import { ref, computed, onMounted, watch } from 'vue'
  import { useRoute, useRouter } from 'vue-router'

  /* STORES */
  import { useEventStore } from 'src/stores/event'
  import { useFormatStore } from 'src/stores/format'
  import { usePlayerStore } from 'src/stores/player'
  import { useRoundStore } from 'src/stores/round'

  /* COMPONENTS */
  import EventCard from 'src/components/events/EventCard.vue'
  import GlobalInput from 'src/components/ui/GlobalInput.vue'
  import GlobalSelect from 'src/components/ui/GlobalSelect.vue'
  import PlayerCard from 'src/components/players/PlayerCard.vue'

  /* UTILITIES */
  import { formatCurrency } from 'src/utils'

  /* ROUTES */
  const route = useRoute()
  const router = useRouter()

  /* PARAMS */
  const idEvent = Number(route.params.idEvent)
  const roundParam = route.params.round
  const isNewRound = roundParam === undefined
  const roundNumber = isNewRound ? null : Number(roundParam)

  /* STORES */
  const eventStore = useEventStore()
  const formatStore = useFormatStore()
  const playerStore = usePlayerStore()
  const roundStore = useRoundStore()

  /* COMPUTED */
  const event = computed(() => eventStore.event)
  const formats = computed(() => formatStore.formats ?? [])
  const players = computed(() => playerStore.players ?? [])
  const round = computed(() => roundStore.round)

  /* selecionado para definir vencedor */
  const playerSelected = ref(null)

  const availablePlayers = computed(() =>
    players.value.filter(
      player => !(form.value?.players ?? []).some(roundPlayer => roundPlayer.id === player.id)
    )
  )

  /* FILTERS */
  const filters = ref({
    name: ''
  })

  /* FORM */
  const form = ref({
    idEvent: event.value.id,
    round: 1,
    idFormat: null,
    idPlayerWinner: null,
    playerWinner: null,
    canceled: false,
    playersTotal: 0,
    players: []
  })

  /* LIFECYCLE */
  onMounted(async () => {
    await eventStore.getEvent(idEvent)

    if (!event.value) {
      console.warn('EVENT NOT FOUND:', idEvent)
      router.back()
      return
    }

    await formatStore.getFormats()

    if (isNewRound) {
      form.value = {
        idEvent: event.value.id,
        round: (event.value.rounds ?? 0) + 1,
        idFormat: event.value.idFormat ?? null,
        idPlayerWinner: null,
        canceled: false,
        playersTotal: 0,
        players: [],
        createdAt: new Date().toISOString()
      }
    } else {
      await load()

      if (!round.value) {
        console.warn('ROUND NOT FOUND:', idEvent, roundNumber)
        router.back()
        return
      }
    }
  })

  watch(
    () => filters.value.name,
    async value => {
      if (!value?.trim()) {
        playerStore.players = []
        return
      }

      await playerStore.getPlayers({
        name: value.trim()
      })
    }
  )

  /* FUNCTIONS */
  async function load() {
    await roundStore.getRound(idEvent, roundNumber)

    form.value = { ...round.value }
    form.value.players = round.value.players ?? []
  }

  function toggleCanceled() {
    form.value.canceled = !form.value.canceled
  }

  function selectPlayer(player) {
    playerSelected.value = player
  }

  function addPlayer(player) {
    if (!form.value.players.some(p => p.id === player.id)) {
      form.value.players.push(player)
      sortPlayers()
      updateRoundFees()
    }
  }

  function removePlayer(player) {
    form.value.players = form.value.players.filter(p => p.id !== player.id)

    if (form.value.idPlayerWinner === player.id) {
      form.value.idPlayerWinner = null
      form.value.playerWinner = null
      playerSelected.value = null
    }

    updateRoundFees()
  }

  function updateRoundFees() {
    if (!form.value || !event.value) return

    const playersTotal = form.value.players.length

    const fee = event.value.fees?.find(fee => fee.players === playersTotal)

    form.value.playersTotal = playersTotal

    if (fee) {
      form.value.prize = fee.prizeFee
      form.value.loserPot = fee.loserFee
    } else {
      form.value.prize = playersTotal * (event.value.roundFee ?? 0)
      form.value.loserPot = 0
    }
  }

  // tratar nomes com acentos e caixa alta/baixa
  function sortPlayers() {
    form.value.players.sort((a, b) =>
      a.name.localeCompare(b.name, 'pt-BR', {
        sensitivity: 'base'
      })
    )
  }

  function defineWinner() {
    if (!playerSelected.value) return

    form.value.idPlayerWinner = playerSelected.value.id
    form.value.playerWinner = playerSelected.value
  }

  function cancel() {
    router.back()
  }

  async function save() {
    const data = {
      ...form.value,
      playersTotal: form.value.players.length,
      players: form.value.players
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
</script>

<style scoped>
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
