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
        class="list-card row items-center q-pa-sm"
        clickable
        @click="openFormat(item)"
      >
        <div class="icon-circle flex flex-center q-mr-md">
          <q-icon :name="item.icon" color="white" />
        </div>

        <div class="col">
          <div class="text-subtitle2 text-bold">{{ item.name }}</div>
          <div class="text-caption text-grey">{{ item.hp }} pontos de vida</div>
        </div>

        <div class="q-ml-auto">
          <q-icon name="chevron_right" />
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

<style scoped>
  .page-bg {
    background: #f4f7fa;
    min-height: 100vh;
  }

  /* add button uses header gradient */
  .add-btn {
    background: linear-gradient(135deg, #7f00ff, #3c6ef3);
    color: white;
    font-weight: 600;
    padding: 10px 14px;
  }

  /* list card */
  .list-card {
    border-radius: 12px;
    background: #ffffff;
    /* leve borda e sombra padrão */
    box-shadow: 0 2px 8px rgba(13, 38, 76, 0.04);
    transition: 0.18s;
    align-items: center;
  }

  .list-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 6px 18px rgba(13, 38, 76, 0.12);
  }

  /* icon circle (uses header gradient A) */
  .icon-circle {
    width: 44px;
    height: 44px;
    border-radius: 22px;
    background: linear-gradient(135deg, #7f00ff, #3c6ef3);
    color: white;
  }

  /* text tweaks */
  .text-bold {
    font-weight: 700;
  }
  .text-grey {
    color: #6e7885;
  }
</style>
