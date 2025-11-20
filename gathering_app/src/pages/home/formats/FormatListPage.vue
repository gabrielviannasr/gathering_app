<template>
  <q-page class="page-bg">
    <!-- HEADER -->
    <div class="header-row">
      <q-btn flat round dense icon="arrow_back" class="text-primary" @click="$router.back()" />

      <div class="column">
        <div class="text-h6 text-bold">Formatos</div>
        <div class="text-caption text-grey-7">2025 — DIRETORIA</div>
      </div>
    </div>

    <!-- FILTROS -->
    <div class="filters q-pa-md q-gutter-sm">
      <q-input filled dense label="Nome" v-model="filters.name" debounce="400">
        <template #prepend>
          <q-icon name="search" />
        </template>
      </q-input>
    </div>

    <!-- LISTA -->
    <q-list class="q-pa-md q-gutter-md">
      <q-card
        v-for="item in filteredFormats"
        :key="item.name"
        class="format-card"
        bordered
        clickable
      >
        <q-item>
          <q-item-section avatar>
            <q-icon :name="item.icon" size="30px" />
          </q-item-section>

          <q-item-section>
            <q-item-label class="text-bold">
              {{ item.name }}
            </q-item-label>
            <q-item-label caption> {{ item.hp }} PV </q-item-label>
          </q-item-section>

          <q-item-section side>
            <q-icon name="chevron_right" />
          </q-item-section>
        </q-item>
      </q-card>
    </q-list>

    <!-- BOTÃO -->
    <div class="q-pa-md">
      <q-btn color="primary" class="full-width" rounded unelevated> Adicionar Formato </q-btn>
    </div>
  </q-page>
</template>

<script setup>
  import { ref, computed } from 'vue'

  /* FILTRO */
  const filters = ref({
    name: ''
  })

  /* LISTA MOCKADA */
  const formats = [
    { name: 'Commander', hp: 40, icon: 'style' },
    { name: 'Conquest', hp: 30, icon: 'style' },
    { name: 'Tiny Leader', hp: 30, icon: 'style' },
    { name: 'Detetive', hp: 0, icon: 'casino' },
    { name: 'Ludo', hp: 0, icon: 'casino' },
    { name: 'Adedonha (Stop)', hp: 0, icon: 'assignment' }
  ]

  const filteredFormats = computed(() => {
    return formats.filter(item =>
      item.name.toLowerCase().includes(filters.value.name.toLowerCase())
    )
  })
</script>

<style scoped>
  .page-bg {
    background: #f4f7fa;
    min-height: 100vh;
  }

  /* HEADER */
  .header-row {
    display: flex;
    align-items: center;
    padding: 16px;
    padding-top: 26px;
    gap: 12px;
  }

  /* CARD */
  .format-card {
    border-radius: 14px;
    transition: 0.2s;
    background: white;
  }

  .format-card:hover {
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.12);
    transform: translateY(-1px);
  }
</style>
