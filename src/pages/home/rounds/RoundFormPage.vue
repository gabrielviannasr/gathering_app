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

        <!-- VENCEDOR -->
        <div class="row items-center justify-between q-mt-md">
          <div class="text-subtitle2 text-bold">Vencedor</div>

          <div v-if="round.idPlayerWinner" class="winner-box q-pa-sm">
            {{ resolvePlayer(round.idPlayerWinner).name }}
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
            <div class="round-number-circle-gray">{{ activeConfig?.players }}</div>
          </div>

          <div class="row items-center justify-between q-mb-sm">
            <div class="label">Premiação</div>
            <div class="value text-right">R$ {{ format(activeConfig?.prize) }}</div>
          </div>

          <div class="row items-center justify-between q-mt-md">
            <div class="label">Pote dos Derrotados</div>
            <div class="value text-right">R$ {{ format(activeConfig?.loserPot) }}</div>
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

  import { useEventStore } from 'src/stores/event'
  import { useRoundStore } from 'src/stores/round'
  import { usePlayerStore } from 'src/stores/player'

  /* ------------- ROTAS / STORES ---------------- */
  const route = useRoute()
  const router = useRouter()

  const eventStore = useEventStore()
  const roundStore = useRoundStore()
  const playerStore = usePlayerStore()

  /* ------------- PARAMS ---------------- */
  const idEvent = Number(route.params.idEvent)
  const roundNumber = Number(route.params.round)

  /* ----------------- DATA ---------------- */
  const event = ref(null)
  const round = ref(null)

  const allPlayers = computed(() => playerStore.players)

  /* lista de jogadores dessa rodada */
  const roundPlayers = ref([])

  /* configs do evento (fees) */
  const eventConfigs = computed(() => event.value?.fees ?? [])

  /* config ativa conforme qtd jogadores */
  const activeConfig = computed(
    () => eventConfigs.value.find(c => c.players === roundPlayers.value.length) || null
  )

  /* selecionado para definir vencedor */
  const selectedPlayer = ref(null)

  /* ----------------- LOAD ---------------- */
  onMounted(() => {
    event.value = eventStore.getEvent(idEvent)
    round.value = roundStore.getRound(idEvent, roundNumber)
    roundPlayers.value = playerStore.players.slice(
      0,
      roundStore.getRound(idEvent, roundNumber).players
    )
  })

  /* ----------------- FUNÇÕES ---------------- */

  function resolvePlayer(id) {
    return allPlayers.value.find(p => p.id === id) || { name: 'Desconhecido' }
  }

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

  function save() {
    console.log('Salvar round:', {
      ...round.value,
      players: roundPlayers.value.map(p => p.id)
    })
    router.back()
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
