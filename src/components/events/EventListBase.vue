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
              :options="formatFilterOptions"
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

        <!-- Botão Adicionar -->
        <div v-if="showAddButton" class="q-mt-sm">
          <q-btn class="add-btn full-width" no-caps rounded unelevated @click="$emit('add')">
            <q-icon name="add" class="q-mr-sm" />
            Adicionar Evento
          </q-btn>
        </div>
      </q-card>
    </div>

    <!-- ===== LISTA ===== -->
    <div class="q-pa-md q-gutter-md">
      <EventCard
        v-for="item in filteredEvents"
        :key="item.id"
        :event="item"
        @open="$emit('open', item)"
      />

      <!-- Paginação -->
      <div class="q-mt-md q-pb-xl">
        <q-pagination v-model="page" :max="maxPages" max-pages="5" />
      </div>
    </div>
  </q-page>
</template>

<script setup>
  /* ===============================
   IMPORTS
  ================================ */
  import EventCard from 'src/components/events/EventCard.vue'
  import GlobalSelect from 'src/components/ui/GlobalSelect.vue'
  import { ref, computed } from 'vue'
  import { useEventStore } from 'src/stores/event'
  import { useFormatStore } from 'src/stores/format'
  import { monthOptions } from 'src/constants/months'

  /* ===============================
   PROPS
  ================================ */
  // eslint-disable-next-line no-unused-vars
  const props = defineProps({
    showAddButton: { type: Boolean, default: false }
  })

  /* ===============================
   STORES
  ================================ */
  const eventStore = useEventStore()
  const formatStore = useFormatStore()

  /* ===============================
   FILTROS
  ================================ */
  const filters = ref({
    format: null,
    month: null
  })

  /* ===============================
   FORMATOS (dinâmicos)
  ================================ */
  const formatFilterOptions = computed(() => {
    return [
      { label: 'Todos', value: null },
      ...formatStore.formats.map(f => ({
        label: f.name,
        value: f.id
      }))
    ]
  })

  /* ===============================
   PAGINAÇÃO
  ================================ */
  const page = ref(1)
  const maxPages = 2 // placeholder

  /* ===============================
   EVENTOS FILTRADOS DO PINIA
  ================================ */
  const filteredEvents = computed(() => {
    return eventStore.events.filter(ev => {
      // Filtro de formato
      const matchFormat = filters.value.format ? ev.idFormat === filters.value.format : true

      // Filtro de mês
      const matchMonth =
        filters.value.month !== null
          ? new Date(ev.createdAt).getMonth() === filters.value.month
          : true

      return matchFormat && matchMonth
    })
  })
</script>
