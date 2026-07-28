<template>
  <q-page class="page-bg">
    <!-- ===== FILTROS ===== -->
    <div class="q-pa-md">
      <q-card class="q-pa-md form-card">
        <div class="form-section-title">Filtros</div>

        <div class="row q-col-gutter-sm q-mt-sm">
          <!-- Formato -->
          <div class="col">
            <GlobalSelect
              label="Formato"
              :options="formatOptions"
              v-model="filters.format"
              emit-value
              map-options
            />
          </div>

          <!-- Mês -->
          <div class="col">
            <GlobalSelect
              label="Mês"
              :options="monthOptions"
              v-model="filters.month"
              emit-value
              map-options
            />
          </div>
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
  import EventCard from 'src/components/events/EventCard.vue'
  import GlobalSelect from 'src/components/ui/GlobalSelect.vue'
  import { computed, onMounted, ref, watch } from 'vue'
  import { useRoundNavigator } from 'src/composables/navigation'
  import { useEventStore } from 'src/stores/event'
  import { useFormatStore } from 'src/stores/format'
  import { monthOptions } from 'src/constants/months'

  /* NAVIGATION */
  const { goToRounds } = useRoundNavigator()

  /* STORES */
  const eventStore = useEventStore()
  const formatStore = useFormatStore()

  /* COMPUTED */
  const events = computed(() => eventStore.events?.content || [])

  /* FILTERS */
  const filters = ref({ format: null, month: null })

  const formatOptions = computed(() => [
    { label: 'Todos', value: null },
    ...formatStore.formats.map(format => ({
      label: format.name,
      value: format.id
    }))
  ])

  /* PAGINATION */
  const page = ref(1)
  const perPage = 4
  const maxPages = computed(() => eventStore.events?.totalPages || 1)

  /* ---------------- LOAD ---------------- */
  onMounted(async () => {
    await formatStore.getFormats()
    await load()
  })

  watch(
    filters,
    () => {
      page.value = 1
      load()
    },
    { deep: true }
  )

  watch(page, () => {
    load()
  })

  async function load() {
    await eventStore.getEventsPage({
      ...filters.value,
      page: page.value - 1,
      size: perPage
    })
  }

  function openEvent(event) {
    goToRounds(event.id)
  }
</script>
