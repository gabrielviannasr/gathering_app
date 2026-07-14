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
        v-for="item in gatherings"
        :key="item.id"
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

            <!-- <div class="text-caption text-grey">
              {{ item.year }}&nbsp;&nbsp; {{ item.events }} eventos&nbsp;&nbsp;
              {{ item.players }} jogadores
            </div> -->
          </div>

          <!-- seta -->
          <div class="q-ml-auto">
            <q-icon name="chevron_right" />
          </div>
        </div>
      </q-card>

      <!-- PAGINAÇÃO -->
      <div class="q-mt-md">
        <q-pagination v-model="page" :max="maxPages" max-pages="5" />
      </div>
    </div>
  </q-page>
</template>

<script setup>
  import GlobalInput from 'src/components/ui/GlobalInput.vue'
  import GlobalSelect from 'src/components/ui/GlobalSelect.vue'
  import { computed, onMounted, ref, watch } from 'vue'
  import { useConfraNavigator } from 'src/composables/navigation'
  import { useConfraStore } from 'src/stores/confra'

  /* NAVIGATION */
  const { goToConfraNew, goToConfraEdit } = useConfraNavigator()

  /* STORES */
  const confraStore = useConfraStore()

  /* ITEMS */
  const gatherings = computed(() => confraStore.confras?.content || [])

  /* PAGINATION */
  const page = ref(1)
  const perPage = 4
  const maxPages = computed(() => confraStore.confras?.totalPages || 1)

  /* FILTERS */
  const filters = ref({
    name: '',
    year: null
  })

  const yearOptions = computed(() => [
    { label: 'Todos', value: null },
    ...confraStore.years.map(year => ({
      label: String(year),
      value: year
    }))
  ])

  /* ---------------- LOAD ---------------- */
  onMounted(async () => {
    await confraStore.getYears()
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
    await confraStore.getConfras({
      ...filters.value,
      page: page.value - 1,
      size: perPage
    })
  }

  function onAdd() {
    console.log('Adicionar confra')
    goToConfraNew()
  }

  function openGathering(item) {
    console.log('Abrir confra', item)
    goToConfraEdit(item.id)
  }
</script>
