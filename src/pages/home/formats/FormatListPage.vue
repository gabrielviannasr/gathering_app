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
        </div>

        <!-- Botão Adicionar -->
        <div class="q-mt-sm">
          <q-btn class="add-btn full-width" no-caps rounded unelevated @click="onAdd">
            <q-icon name="add" class="q-mr-sm" />
            Adicionar formato
          </q-btn>
        </div>
      </q-card>
    </div>

    <!-- LISTA -->
    <div class="q-pa-md q-gutter-md">
      <FormatCard
        v-for="format in formats"
        :key="format.id"
        :format="format"
        @click="openFormat(format)"
        class="list-card q-pa-sm"
      />

      <!-- PAGINAÇÃO -->
      <q-pagination v-model="page" :max="maxPages" max-pages="5" />
    </div>
  </q-page>
</template>

<script setup>
  /* COMPONENTS */
  import GlobalInput from 'src/components/ui/GlobalInput.vue'
  import FormatCard from 'src/components/formats/FormatCard.vue'

  /* VUE */
  import { computed, onMounted, ref, watch } from 'vue'

  /* STORES */
  import { useFormatStore } from 'src/stores/format'

  /* NAVIGATION */
  import { useFormatNavigator } from 'src/composables/navigation'

  /* NAVIGATION */
  const { goToFormatNew, goToFormatEdit } = useFormatNavigator()

  /* STORES */
  const formatStore = useFormatStore()

  /* COMPUTED */
  const formats = computed(() => formatStore.formats?.content || [])

  /* FILTERS */
  const filters = ref({ name: '' })

  /* PAGINATION */
  const page = ref(1)
  const perPage = 10
  const maxPages = computed(() => formatStore.formats?.totalPages || 1)

  /* LIFECYCLE */
  onMounted(load)

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
    await formatStore.getFormatsPage({
      ...filters.value,
      page: page.value - 1,
      size: perPage
    })
  }

  function onAdd() {
    goToFormatNew()
  }

  function openFormat(format) {
    goToFormatEdit(format.id)
  }
</script>
