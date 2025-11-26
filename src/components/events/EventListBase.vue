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
      <q-card
        v-for="item in filteredEvents"
        :key="item.id"
        class="list-card q-pa-sm"
        clickable
        @click="$emit('open', item)"
      >
        <div class="row items-center no-wrap">
          <!-- Ícone do tipo do formato -->
          <div class="circle-icon q-mr-md">
            <q-icon :name="getIcon(item)" color="white" size="24px" />
          </div>

          <!-- Conteúdo -->
          <div class="col">
            <div class="event-badge text-bold">{{ item.format?.name ?? 'Sem Formato' }}</div>

            <div class="text-caption text-grey">
              {{ formatDateShort(item.createdAt) }}
            </div>

            <div class="text-caption text-grey">
              {{ item.players }} jogadores &nbsp;&nbsp; {{ item.rounds }} rodadas
            </div>
          </div>

          <q-icon name="chevron_right" />
        </div>
      </q-card>

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
  import GlobalSelect from 'src/components/ui/GlobalSelect.vue'
  import { ref, computed } from 'vue'
  import { useEventStore } from 'src/stores/event'
  import { useFormatStore } from 'src/stores/format'
  import { formatDateShort } from 'src/utils/date'

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
   MESES
================================ */
  const monthOptions = [
    { label: 'Todos', value: null },
    { label: 'Janeiro', value: 0 },
    { label: 'Fevereiro', value: 1 },
    { label: 'Março', value: 2 },
    { label: 'Abril', value: 3 },
    { label: 'Maio', value: 4 },
    { label: 'Junho', value: 5 },
    { label: 'Julho', value: 6 },
    { label: 'Agosto', value: 7 },
    { label: 'Setembro', value: 8 },
    { label: 'Outubro', value: 9 },
    { label: 'Novembro', value: 10 },
    { label: 'Dezembro', value: 11 }
  ]

  /* ===============================
   PAGINAÇÃO
================================ */
  const page = ref(1)
  const maxPages = 2 // placeholder

  /* ===============================
   FUNÇÃO PARA OBTER ÍCONE DO FORMATO
================================ */
  function getIcon(event) {
    const type = event.format?.type
    if (!type) return 'help'

    return type.icon || 'help'
  }

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
