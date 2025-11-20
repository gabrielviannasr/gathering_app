<template>
  <q-page class="page-bg">
    <!-- FILTROS -->
    <div class="q-pa-md">
      <q-input filled dense label="Nome" v-model="filters.name" debounce="300">
        <template #prepend><q-icon name="search" /></template>
      </q-input>

      <!-- Botão Adicionar logo abaixo dos filtros -->
      <div class="q-mt-sm">
        <q-btn class="add-btn full-width" no-caps rounded unelevated @click="onAdd">
          <q-icon name="add" class="q-mr-sm" />
          Adicionar formato
        </q-btn>
      </div>
    </div>

    <!-- LISTA -->
    <div class="q-pa-md q-gutter-md">
      <q-card
        v-for="item in filteredFormats"
        :key="item.name"
        class="list-card q-pa-sm"
        clickable
        @click="openFormat(item)"
      >
        <div class="row items-center no-wrap">
          <div class="icon-circle q-mr-md">
            <q-icon :name="item.icon" color="white" size="24px" />
          </div>

          <div class="col">
            <div class="text-subtitle2 text-bold">{{ item.name }}</div>
            <div class="text-caption text-grey">{{ item.hp }} pontos de vida</div>
          </div>

          <div>
            <q-icon name="chevron_right" />
          </div>
        </div>
      </q-card>

      <!-- paginação placeholder -->
      <div class="q-mt-md">
        <q-pagination v-model="page" :max="maxPages" max-pages="5" />
      </div>
    </div>
  </q-page>
</template>

<script setup>
  import { ref, computed } from 'vue'
  import { useConfraStore } from 'src/stores/confra'

  // eslint-disable-next-line no-unused-vars
  const confra = useConfraStore()
  const filters = ref({ name: '' })

  const formats = [
    { name: 'Commander', hp: 40, icon: 'style' },
    { name: 'Conquest', hp: 30, icon: 'style' },
    { name: 'Tiny Leader', hp: 30, icon: 'style' },
    { name: 'Detetive', hp: 0, icon: 'casino' },
    { name: 'Ludo', hp: 0, icon: 'casino' },
    { name: 'Adedonha ou Stop', hp: 0, icon: 'assignment' }
  ]

  const page = ref(1)
  const maxPages = 3

  const filteredFormats = computed(() =>
    formats.filter(f => f.name.toLowerCase().includes(filters.value.name.toLowerCase()))
  )

  function onAdd() {
    // abrir modal / rota de criar formato
    console.log('Adicionar formato')
  }

  function openFormat(item) {
    console.log('Abrir formato', item)
  }
</script>
