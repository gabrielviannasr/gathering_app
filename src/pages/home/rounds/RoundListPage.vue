<template>
  <q-page v-if="event" class="page-bg">
    <!-- CARD DO EVENTO -->
    <div class="q-pa-md">
      <EventCard :showArrow="false" :event="event" />
    </div>

    <!-- BOTÃO ADICIONAR -->
    <div class="q-pa-md">
      <q-btn class="add-btn full-width" rounded unelevated no-caps @click="onAdd">
        <q-icon name="add" class="q-mr-sm" />
        Adicionar Rodada
      </q-btn>
    </div>

    <!-- LISTA -->
    <div class="q-pa-md q-gutter-md">
      <RoundCard
        v-for="round in rounds"
        :key="round.id"
        :round="round"
        class="list-card"
        @click="openRound(round)"
      />

      <!-- PAGINAÇÃO -->
      <q-pagination v-model="page" :max="maxPages" max-pages="5" />
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
  import EventCard from 'src/components/events/EventCard.vue'
  import RoundCard from 'src/components/rounds/RoundCard.vue'

  /* VUE */
  import { computed, onMounted, ref, watch } from 'vue'
  import { useRoute, useRouter } from 'vue-router'

  /* STORES */
  import { useEventStore } from 'src/stores/event'
  import { useRoundStore } from 'src/stores/round'

  /* NAVIGATION */
  import { useRoundNavigator } from 'src/composables/navigation'

  /* NAVIGATION */
  const { goToRoundNew, goToRoundEdit } = useRoundNavigator()

  /* ROUTES */
  const route = useRoute()
  const router = useRouter()

  /* PARAMS */
  const idEvent = Number(route.params.idEvent)

  /* STORES */
  const eventStore = useEventStore()
  const roundStore = useRoundStore()

  /* COMPUTED */
  const event = computed(() => eventStore.event)
  const rounds = computed(() => roundStore.rounds?.content || [])

  /* PAGINATION */
  const page = ref(1)
  const perPage = 10
  const maxPages = computed(() => roundStore.rounds?.totalPages || 1)

  /* LIFECYCLE */
  onMounted(async () => {
    await eventStore.getEvent(idEvent)

    if (!event.value) {
      console.warn('EVENT NOT FOUND:', idEvent)
      router.back()
      return
    }

    await load()
  })

  watch(page, load)

  /* FUNCTIONS */
  async function load() {
    await roundStore.getRoundsPage(idEvent, {
      page: page.value - 1,
      size: perPage
    })
  }

  function onAdd() {
    goToRoundNew(idEvent)
  }

  function openRound(round) {
    goToRoundEdit(idEvent, round.round)
  }

  /* FINALIZAR EVENTO */
  const finalizeDialog = ref(false)

  function confirmFinalizeEvent() {
    console.log('Finalizar evento → calcular potes e saldos...')
    finalizeDialog.value = false
  }
</script>
