<template>
  <q-page class="page-bg">
    <!-- ===== FILTROS ===== -->
    <div class="q-pa-md">
      <div class="row q-col-gutter-sm">
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

      <!-- Botão Adicionar (aparece só na página de eventos) -->
      <div v-if="showAddButton" class="q-mt-sm">
        <q-btn class="add-btn full-width" no-caps rounded unelevated @click="$emit('add')">
          <q-icon name="add" class="q-mr-sm" />
          Adicionar Evento
        </q-btn>
      </div>
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
          <!-- Ícone formato -->
          <div class="circle-icon q-mr-md">
            <q-icon name="style" color="white" size="24px" />
          </div>

          <!-- Conteúdo -->
          <div class="col">
            <!-- Formato -->
            <div class="event-badge text-bold">{{ item.format }}</div>

            <!-- Data -->
            <div class="text-caption text-grey">
              {{ formatDateShort(item.date) }}
            </div>

            <!-- Jogadores + rodadas -->
            <div class="text-caption text-grey">
              {{ item.players }} jogadores &nbsp;&nbsp; {{ item.rounds }} rodadas
            </div>
          </div>

          <div>
            <q-icon name="chevron_right" />
          </div>
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
  import GlobalSelect from 'src/components/ui/GlobalSelect.vue'
  import { ref, computed } from 'vue'
  import { formatDateShort } from 'src/utils/date'

  // eslint-disable-next-line no-unused-vars
  const props = defineProps({
    showAddButton: { type: Boolean, default: false }
  })

  const filters = ref({
    format: null,
    month: null
  })

  // opções de formato
  const formatOptions = [
    { label: 'Todos', value: null },
    { label: 'Commander', value: 'Commander' },
    { label: 'Conquest', value: 'Conquest' },
    { label: 'Tiny Leader', value: 'Tiny Leader' },
    { label: 'Sem Formato', value: 'Sem Formato' }
  ]

  // meses em extenso
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

  // mock
  const events = [
    { id: 1, format: 'Commander', date: '2025-01-14', players: 12, rounds: 3 },
    { id: 2, format: 'Conquest', date: '2025-01-21', players: 8, rounds: 4 },
    { id: 3, format: 'Variados', date: '2025-02-04', players: 16, rounds: 4 },
    { id: 4, format: 'Tiny Leaders', date: '2025-02-11', players: 10, rounds: 3 },
    { id: 5, format: 'Commander', date: '2025-02-18', players: 8, rounds: 3 }
  ]

  const page = ref(1)
  const maxPages = 2

  const filteredEvents = computed(() => {
    return events.filter(ev => {
      const matchFormat = filters.value.format ? ev.format === filters.value.format : true
      const matchMonth =
        filters.value.month !== null ? new Date(ev.date).getMonth() === filters.value.month : true
      return matchFormat && matchMonth
    })
  })
</script>
