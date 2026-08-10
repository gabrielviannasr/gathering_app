<template>
  <q-page class="page-bg">
    <!-- FILTROS -->
    <div class="q-pa-md">
      <q-card class="q-pa-md form-card">
        <!-- Title -->
        <div class="form-section-title">Filtros</div>

        <div class="row q-col-gutter-sm q-mt-sm">
          <!-- Formato -->
          <div class="col-12">
            <GlobalSelect
              clearable
              v-model="filters.idFormat"
              label="Formato"
              placeholder="Selecione o formato"
              icon="style"
              :options="formats"
              option-label="name"
              option-value="id"
              map-options
              emit-value
            />
          </div>

          <!-- Mês -->
          <!-- <div class="col">
            <GlobalSelect
              label="Mês"
              :options="monthOptions"
              v-model="filters.month"
              emit-value
              map-options
            />
          </div> -->
        </div>

        <!-- Botão Adicionar -->
        <div class="q-mt-sm">
          <q-btn push no-caps rounded class="add-btn full-width" @click="onAdd">
            <q-icon name="add" class="q-mr-sm" />
            Adicionar Evento
          </q-btn>
        </div>
      </q-card>
    </div>

    <!-- LISTA -->
    <div class="q-pa-md q-gutter-md">
      <EventCard
        v-for="event in events"
        :key="event.id"
        :event="event"
        class="list-card"
        @click="openEvent(event)"
      />

      <!-- PAGINAÇÃO -->
      <q-pagination v-model="page" :max="maxPages" max-pages="5" />
    </div>
  </q-page>
</template>

<script setup>
  /* VUE */
  import { computed, onMounted, ref, watch } from 'vue'

  /* STORES */
  import { useEventStore } from 'src/stores/event'
  import { useFormatStore } from 'src/stores/format'
  import { useGatheringStore } from 'src/stores/gathering'

  /* COMPOSABLES */
  import { useEventNavigator } from 'src/composables/navigation'

  /* COMPONENTS */
  import EventCard from 'src/components/events/EventCard.vue'
  import GlobalSelect from 'src/components/ui/GlobalSelect.vue'

  /* COMPOSABLES */
  const { goToEventNew, goToEventEdit } = useEventNavigator()

  /* STORES */
  const eventStore = useEventStore()
  const formatStore = useFormatStore()
  const gatheringStore = useGatheringStore()

  /* COMPUTED */
  const events = computed(() => eventStore.events?.content ?? [])
  const formats = computed(() => formatStore.formats ?? [])
  const gathering = computed(() => gatheringStore.gatheringSelected)

  /* FILTERS */
  const filters = ref({
    idFormat: null
    // month: null
  })

  /* PAGINATION */
  const page = ref(1)
  const perPage = 10
  const maxPages = computed(() => eventStore.events?.totalPages || 1)

  /* LIFECYCLE */
  onMounted(async () => {
    await formatStore.getFormats()
    await load()
  })

  watch(page, load)

  watch(
    filters,
    () => {
      if (page.value !== 1) {
        page.value = 1
      } else {
        load()
      }
    },
    { deep: true }
  )

  /* FUNCTIONS */
  async function load() {
    await eventStore.getEventsPage({
      idGathering: gathering.value.id,
      ...filters.value,
      page: page.value - 1,
      size: perPage
    })
  }

  function onAdd() {
    goToEventNew()
  }

  function openEvent(event) {
    goToEventEdit(event.id)
  }
</script>
