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
        v-for="item in filteredFormats"
        :key="item.id"
        class="list-card q-pa-sm"
        clickable
        @click="openFormat(item)"
      >
        <div class="row items-center no-wrap">
          <div class="icon-circle q-mr-md">
            <q-icon :name="resolveType(item.idFormatType)?.icon" color="white" size="24px" />
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
  import { ref, computed } from 'vue'
  import { useFormatNavigator } from 'src/composables/navigation'
  import { useFormatStore } from 'src/stores/format'
  import { useFormatTypeStore } from 'src/stores/formatType'

  const { goToNewFormat, goToEditFormat } = useFormatNavigator()

  const formatStore = useFormatStore()
  const typeStore = useFormatTypeStore()

  const filters = ref({ name: '' })

  const page = ref(1)
  const maxPages = 3

  const filteredFormats = computed(() =>
    formatStore.formats.filter(f => f.name.toLowerCase().includes(filters.value.name.toLowerCase()))
  )

  function resolveType(typeId) {
    return typeStore.getType(typeId)
  }

  function onAdd() {
    goToNewFormat()
  }

  function openFormat(item) {
    goToEditFormat(item.id)
  }
</script>
