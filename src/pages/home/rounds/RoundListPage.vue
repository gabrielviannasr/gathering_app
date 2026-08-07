<template>
  <q-page v-if="event" class="page-bg">
    <!-- CARD DO EVENTO -->
    <div class="q-pa-md">
      <EventCard :showArrow="false" :event="event" />
    </div>

    <!-- BOTÕES DE AÇÃO -->
    <div class="row q-col-gutter-sm q-pa-md">
      <!-- ESQUERDA -->
      <div class="col">
        <!-- BOTÃO REATIVAR -->
        <q-btn
          v-if="event.canceled"
          push
          no-caps
          rounded
          color="positive"
          class="add-btn full-width"
          @click="onReactivate"
        >
          <q-icon name="refresh" class="q-mr-sm" />
          Reativar Evento
        </q-btn>

        <!-- BOTÃO CANCELAR -->
        <q-btn
          v-else
          push
          no-caps
          rounded
          color="negative"
          class="add-btn full-width"
          @click="onCancel"
        >
          <q-icon name="cancel" class="q-mr-sm" />
          Cancelar Evento
        </q-btn>
      </div>

      <!-- DIREITA -->
      <div class="col">
        <!-- BOTÃO REABRIR -->
        <q-btn
          v-if="event.finalized"
          push
          no-caps
          rounded
          class="add-btn full-width"
          @click="onReopen"
        >
          <q-icon name="refresh" class="q-mr-sm" />
          Reabrir Evento
        </q-btn>

        <!-- BOTÃO FINALIZAR -->
        <q-btn
          v-else
          push
          no-caps
          rounded
          :disable="event.canceled"
          class="add-btn full-width"
          @click="onFinalize"
        >
          <q-icon name="emoji_events" class="q-mr-sm" />
          Finalizar Evento
        </q-btn>
      </div>
    </div>

    <!-- BOTÃO ADICIONAR -->
    <div class="q-pa-md">
      <q-btn
        push
        no-caps
        rounded
        :disable="event.finalized || event.canceled"
        class="add-btn full-width"
        @click="onAdd"
      >
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

    <!-- DIÁLOGO DE CONFIRMAÇÃO -->
    <q-dialog v-model="dialog.show">
      <q-card class="q-pa-md" style="min-width: 300px">
        <div class="text-h6 text-center text-primary q-mb-sm">{{ dialog.title }}</div>

        <div class="text-body2 text-justify q-mb-md">{{ dialog.message }}</div>

        <div class="row justify-end q-gutter-sm q-mt-md">
          <q-btn flat label="Cancelar" color="grey" v-close-popup />
          <q-btn
            :label="dialog.confirmLabel"
            :color="dialog.confirmColor"
            @click="dialog.confirmAction"
          />
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

  /* COMPOSABLES */
  import { useRoundNavigator } from 'src/composables/navigation'

  /* COMPOSABLES */
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

  const dialog = ref({
    show: false,
    title: '',
    message: '',
    confirmLabel: '',
    confirmColor: 'primary',
    confirmAction: null
  })

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

  async function confirmCancel() {
    try {
      await eventStore.cancelEvent(idEvent)

      dialog.value.show = false

      await load()
    } catch {
      // nada
    }
  }

  async function confirmFinalize() {
    try {
      await eventStore.finalizeEvent(idEvent)

      dialog.value.show = false
    } catch {
      // nada
    }
  }

  function onCancel() {
    dialog.value = {
      show: true,
      title: 'Cancelar Evento',
      message:
        'Todas as rodadas serão canceladas. Esta ação poderá ser revertida reativando o evento.',
      confirmLabel: 'Cancelar Evento',
      confirmColor: 'negative',
      confirmAction: confirmCancel
    }
  }

  function onFinalize() {
    dialog.value = {
      show: true,
      title: 'Finalizar Evento',
      message: 'Ao finalizar, serão calculados os potes, os saldos e as premiações do evento.',
      confirmLabel: 'Finalizar',
      confirmColor: 'primary',
      confirmAction: confirmFinalize
    }
  }

  async function onReactivate() {
    await eventStore.reactivateEvent(idEvent)
  }

  async function onReopen() {
    await eventStore.reopenEvent(idEvent)
  }
</script>
