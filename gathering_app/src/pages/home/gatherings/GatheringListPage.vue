<template>
  <q-page class="page-bg">
    <!-- ===== FILTROS ===== -->
    <div class="q-pa-md">
      <q-card class="q-pa-md form-card">
        <!-- Title -->
        <div class="form-section-title">Filtros</div>

        <div class="row q-col-gutter-sm q-mt-sm">
          <!-- Nome -->
          <div class="col">
            <GlobalInput label="Nome" v-model="filters.name" debounce="300">
              <template #prepend>
                <q-icon name="search" />
              </template>
            </GlobalInput>
          </div>

          <!-- Ano -->
          <div class="col-auto" style="width: 130px">
            <GlobalSelect
              label="Ano"
              :options="yearOptions"
              v-model="filters.year"
              emit-value
              map-options
            />
          </div>
        </div>

        <!-- Botão Adicionar -->
        <div class="q-mt-sm">
          <q-btn class="add-btn full-width" no-caps rounded unelevated @click="onAdd">
            <q-icon name="add" class="q-mr-sm" />
            Adicionar Confra
          </q-btn>
        </div>
      </q-card>
    </div>

    <!-- ===== LISTA ===== -->
    <div class="q-pa-md q-gutter-md">
      <q-card
        v-for="item in filteredGatherings"
        :key="item.name + item.year"
        class="list-card q-pa-sm"
        clickable
        @click="openGathering(item)"
      >
        <div class="row items-center no-wrap">
          <!-- Ícone -->
          <div class="circle-icon q-mr-md">
            <q-icon name="groups" color="white" size="24px" />
          </div>

          <!-- Conteúdo -->
          <div class="col">
            <div class="text-subtitle2 text-bold">
              {{ item.name }}
            </div>

            <div class="text-caption text-grey">
              {{ item.year }}&nbsp;&nbsp; {{ item.events }} eventos&nbsp;&nbsp;
              {{ item.players }} jogadores
            </div>
          </div>

          <!-- seta -->
          <div class="q-ml-auto">
            <q-icon name="chevron_right" />
          </div>
        </div>
      </q-card>

      <!-- Paginação -->
      <div class="q-mt-md">
        <q-pagination v-model="page" :max="maxPages" max-pages="5" />
      </div>
    </div>
  </q-page>
</template>

<script setup>
  import GlobalInput from 'src/components/ui/GlobalInput.vue'
  import GlobalSelect from 'src/components/ui/GlobalSelect.vue'
  import { ref, computed } from 'vue'
  import { useGatheringNavigator } from 'src/composables/navigation/useGatheringNavigator'

  const { goToNewGathering, goToEditGathering } = useGatheringNavigator()

  // filtros
  const filters = ref({
    name: '',
    year: null
  })

  // anos disponíveis
  const yearOptions = [
    { label: 'Todos', value: null },
    { label: '2025', value: 2025 },
    { label: '2024', value: 2024 },
    { label: '2023', value: 2023 }
  ]

  // lista mockada
  const gatherings = [
    { id: 1, name: 'DIRETORIA', year: 2025, events: 25, players: 13 },
    { id: 2, name: 'DIRETORIA', year: 2024, events: 20, players: 12 },
    { id: 3, name: 'DIRETORIA', year: 2023, events: 20, players: 10 }
  ]

  // paginação mock
  const page = ref(1)
  const maxPages = 2

  // filtro dinâmico
  const filteredGatherings = computed(() => {
    return gatherings.filter(g => {
      const matchName = g.name.toLowerCase().includes(filters.value.name.toLowerCase())
      const matchYear = filters.value.year ? g.year === filters.value.year : true
      return matchName && matchYear
    })
  })

  function onAdd() {
    console.log('Adicionar confra')
    goToNewGathering()
  }

  function openGathering(item) {
    console.log('Abrir confra', item)
    goToEditGathering(item.id)
  }
</script>
