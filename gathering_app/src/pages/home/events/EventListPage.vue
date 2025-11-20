<template>
  <q-page class="page-bg">
    <!-- ===== FILTROS ===== -->
    <div class="q-pa-md">
      <div class="row q-col-gutter-sm">
        <!-- Formato -->
        <div class="col">
          <q-select
            filled
            dense
            label="Formato"
            v-model="filters.format"
            :options="formatOptions"
            emit-value
            map-options
          />
        </div>

        <!-- Mês -->
        <div class="col">
          <q-select
            filled
            dense
            label="Mês"
            v-model="filters.month"
            :options="monthOptions"
            emit-value
            map-options
          />
        </div>
      </div>

      <!-- Botão Adicionar Evento -->
      <div class="q-mt-sm">
        <q-btn class="add-btn full-width" no-caps rounded unelevated @click="onAdd">
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
        @click="openEvent(item)"
      >
        <div class="row items-center no-wrap">
          <!-- Ícone formato -->
          <div class="circle-icon q-mr-md">
            <q-icon :name="item.icon" color="white" size="24px" />
          </div>

          <!-- Conteúdo -->
          <div class="col">
            <!-- Badge (Formato) -->
            <div class="event-badge text-bold">
              {{ item.format }}
            </div>

            <!-- Data -->
            <div class="text-caption text-grey q-mt-xs">
              {{ formatDateShort(item.date) }}
            </div>

            <!-- Aba players/rodadas -->
            <div class="text-caption text-grey">
              {{ item.players }} jogadores &nbsp;&nbsp; {{ item.rounds }} rodadas
            </div>
          </div>

          <!-- seta -->
          <div class="q-ml-auto">
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
  import { ref, computed } from 'vue'
  import { formatDateShort } from 'src/utils/date'

  // FILTROS
  const filters = ref({
    format: null,
    month: null
  })

  // OPÇÕES DO COMBO FORMATO
  const formatOptions = [
    { label: 'Todos', value: null },
    { label: 'Commander', value: 'Commander' },
    { label: 'Conquest', value: 'Conquest' },
    { label: 'Tiny Leader', value: 'Tiny Leader' },
    { label: 'Sem Formato', value: 'Sem Formato' }
  ]

  // OPÇÕES DO COMBO MÊS (sempre extenso)
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

  // MOCK DA LISTA DE EVENTOS
  const events = [
    { id: 1, icon: 'style', format: 'Commander', date: '2025-03-02', players: 8, rounds: 6 },
    { id: 2, icon: 'style', format: 'Conquest', date: '2025-03-09', players: 6, rounds: 10 },
    { id: 3, icon: 'style', format: 'Tiny Leader', date: '2025-04-12', players: 7, rounds: 12 },
    { id: 4, icon: 'style', format: 'Sem Formato', date: '2025-05-18', players: 5, rounds: 10 },
    { id: 5, icon: 'style', format: 'Commander', date: '2025-05-25', players: 8, rounds: 6 }
  ]

  // PAGINAÇÃO
  const page = ref(1)
  const maxPages = 2

  // FILTRO DINÂMICO
  const filteredEvents = computed(() => {
    return events.filter(ev => {
      const matchFormat = filters.value.format ? ev.format === filters.value.format : true

      const matchMonth =
        filters.value.month !== null ? new Date(ev.date).getMonth() === filters.value.month : true

      return matchFormat && matchMonth
    })
  })

  // AÇÕES
  function onAdd() {
    console.log('Adicionar Evento')
  }

  function openEvent(item) {
    console.log('Abrir Evento', item)
  }
</script>
