<template>
  <q-page class="page-bg">
    <!-- CARD DO EVENTO -->
    <div class="q-pa-md">
      <EventHeaderCard :event="event" />
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
        :key="round.id"
        class="list-card q-pa-md"
        clickable
        @click="open(round)"
      >
        <div class="row items-center no-wrap">
          <!-- NÚMERO DA RODADA -->
          <div class="round-number-circle q-mr-md">
            {{ round.round }}
          </div>

          <!-- INFO -->
          <div class="col">
            <div class="text-caption q-mt-xs">
              Formato: {{ round.format?.name || '—' }} • {{ round.playersTotal }} jogadores
            </div>

            <div class="text-subtitle2 q-mt-xs">
              <template v-if="round.playerWinner">
                Vencedor:
                <span class="text-bold text-primary">
                  {{ round.playerWinner.name }}
                </span>
              </template>

              <template v-else>
                <span class="text-caption">Sem vencedor</span>
              </template>
            </div>

            <q-badge
              class="q-mt-sm"
              :color="round.canceled ? 'negative' : 'positive'"
              align="middle"
            >
              {{ round.canceled ? 'Cancelada' : 'Ativa' }}
            </q-badge>
          </div>

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
    <div class="q-pa-md q-mt-lg">
      <q-btn class="add-btn full-width" rounded unelevated no-caps @click="finalizeDialog = true">
        <q-icon name="emoji_events" class="q-mr-sm" />
        Finalizar Evento
      </q-btn>
    </div>

    <!-- CONFIRMAÇÃO -->
    <q-dialog v-model="finalizeDialog">
      <q-card class="q-pa-md" style="min-width: 300px">
        <div class="text-h6 text-center text-primary q-mb-sm">Finalizar Evento</div>

        <div class="text-body2 text-justify q-mb-md">
          Ao finalizar, serão calculados:
          <ul class="q-ml-md q-mt-sm">
            <li>Pote dos derrotados</li>
            <li>Total arrecadado</li>
            <li>Saldo por jogador</li>
          </ul>
        </div>

        <div class="row justify-end q-gutter-sm q-mt-md">
          <q-btn flat label="Cancelar" color="grey" v-close-popup />
          <q-btn flat label="Finalizar" color="primary" @click="confirmFinalizeEvent" />
        </div>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
  /* COMPONENTS */
  import EventHeaderCard from 'src/components/events/EventHeaderCard.vue'

  /* VUE + PINIA */
  import { ref, computed, onMounted, watch } from 'vue'
  import { useRoute, useRouter } from 'vue-router'

  import { useEventStore } from 'src/stores/event'
  import { useRoundStore } from 'src/stores/round'
  import { useRoundNavigator } from 'src/composables/navigation'

  const route = useRoute()
  const router = useRouter()
  const idEvent = Number(route.params.idEvent)

  /* STORES */
  const eventStore = useEventStore()
  const roundStore = useRoundStore()

  /* NAVIGATION */
  const { goToRoundNew, goToRoundEdit } = useRoundNavigator()

  /* EVENT */
  const event = computed(() => eventStore.event)

  /* ROUNDS DO EVENTO */
  const rounds = computed(() => roundStore.rounds?.content || [])

  /* PAGINATION */
  const page = ref(1)
  const perPage = 3
  const maxPages = computed(() => roundStore.rounds?.totalPages || 1)

  async function loadRounds() {
    await roundStore.getRounds(idEvent, {
      page: page.value - 1,
      size: perPage
    })
  }

  /* ---------------- LOAD ---------------- */
  onMounted(async () => {
    await eventStore.getEvent(idEvent)
    await loadRounds()

    if (!event.value) {
      console.warn('EVENT NOT FOUND:', idEvent)
      router.back()
      return
    }
  })

  watch(page, () => {
    loadRounds()
  })

  /* OPEN ROUND FORM */
  function openAddForm() {
    goToRoundNew(idEvent)
  }

  function open(round) {
    goToRoundEdit(idEvent, round.round)
  }

  /* FINALIZAR EVENTO */
  const finalizeDialog = ref(false)

  function confirmFinalizeEvent() {
    console.log('Finalizar evento → calcular potes e saldos...')
    finalizeDialog.value = false
  }
</script>
