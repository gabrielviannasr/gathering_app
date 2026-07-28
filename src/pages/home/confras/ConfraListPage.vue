<template>
  <q-page class="page-bg">
    <!-- FILTROS -->
    <div class="q-pa-md">
      <q-card class="q-pa-md form-card">
        <!-- Title -->
        <div class="form-section-title">Filtros</div>

        <div class="row q-col-gutter-sm q-mt-sm">
          <!-- Nome -->
          <div class="col-12">
            <GlobalInput label="Nome" v-model="filters.name" debounce="300">
              <template #prepend>
                <q-icon name="search" />
              </template>
            </GlobalInput>
          </div>

          <!-- Ano -->
          <div class="col-12">
            <GlobalSelect
              clearable
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

    <!-- LISTA -->
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

            <div class="text-caption text-grey">
              {{ item.year }}
            </div>
          </div>

          <!-- Seta -->
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
  /* COMPONENTS */
  import GlobalInput from 'src/components/ui/GlobalInput.vue'
  import GlobalSelect from 'src/components/ui/GlobalSelect.vue'

  /* VUE */
  import { computed, onMounted, ref, watch } from 'vue'

  /* STORES */
  import { useConfraStore } from 'src/stores/confra'

  /* NAVIGATION */
  import { useConfraNavigator } from 'src/composables/navigation'

  /* NAVIGATION */
  const { goToConfraNew, goToConfraEdit } = useConfraNavigator()

  /* STORES */
  const confraStore = useConfraStore()

  /* COMPUTED */
  const gatherings = computed(() => confraStore.confras?.content ?? [])
  const yearOptions = computed(() =>
    confraStore.years.map(year => ({
      label: String(year),
      value: year
    }))
  )

  /* FILTERS */
  const filters = ref({
    name: '',
    year: null
  })

  /* PAGINATION */
  const page = ref(1)
  const perPage = 10
  const maxPages = computed(() => confraStore.confras?.totalPages || 1)

  /* LIFECYCLE */
  onMounted(async () => {
    await confraStore.getYears()
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
    await confraStore.getConfrasPage({
      ...filters.value,
      page: page.value - 1,
      size: perPage
    })
  }

  function onAdd() {
    goToConfraNew()
  }

  function openGathering(item) {
    goToConfraEdit(item.id)
  }
</script>
