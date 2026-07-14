<template>
  <q-page class="page-bg">
    <!-- FILTROS -->
    <div class="q-pa-md">
      <q-card class="q-pa-md form-card">
        <div class="form-section-title">Filtros</div>

        <GlobalInput label="Nome" v-model="filters.name" debounce="300">
          <template #prepend><q-icon name="search" /></template>
        </GlobalInput>

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
      <q-card
        v-for="item in formats"
        :key="item.id"
        class="list-card q-pa-sm"
        clickable
        @click="openFormat(item)"
      >
        <div class="row items-center no-wrap">
          <div class="icon-circle q-mr-md">
            <q-icon name="style" color="white" size="24px" />
          </div>

          <div class="col">
            <div class="text-subtitle2 text-bold">{{ item.name }}</div>
            <div class="text-caption text-grey">{{ item.lifeCount }} pontos de vida</div>
          </div>

          <q-icon name="chevron_right" />
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
  import { computed, onMounted, ref, watch } from 'vue'
  import { useFormatNavigator } from 'src/composables/navigation'
  import { useFormatStore } from 'src/stores/format'

  /* NAVIGATION */
  const { goToNewFormat, goToEditFormat } = useFormatNavigator()

  /* STORES */
  const formatStore = useFormatStore()

  /* ITEMS */
  const formats = computed(() => formatStore.formats?.content || [])

  /* FILTERS */
  const filters = ref({ name: '' })

  /* PAGINATION */
  const page = ref(1)
  const perPage = 5
  const maxPages = computed(() => formatStore.formats?.totalPages || 1)

  /* ---------------- LOAD ---------------- */
  onMounted(load)

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
    await formatStore.getFormatsPage({
      ...filters.value,
      page: page.value - 1,
      size: perPage
    })
  }

  function onAdd() {
    goToNewFormat()
  }

  function openFormat(item) {
    goToEditFormat(item.id)
  }
</script>
