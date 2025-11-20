<template>
  <q-page class="page-bg">
    <!-- HEADER -->
    <div class="header-row">
      <q-btn flat round dense icon="arrow_back" class="text-primary" @click="$router.back()" />

      <div class="column">
        <div class="text-h6 text-bold">Jogadores</div>
        <div class="text-caption text-grey-7">2025 — DIRETORIA</div>
      </div>
    </div>

    <!-- FILTROS -->
    <div class="filters q-pa-md q-gutter-sm">
      <q-input filled dense label="Nome" v-model="filters.name" debounce="300">
        <template #prepend>
          <q-icon name="search" />
        </template>
      </q-input>
    </div>

    <!-- LISTA -->
    <q-list class="q-pa-md q-gutter-md">
      <q-card
        v-for="player in filteredPlayers"
        :key="player"
        class="player-card"
        bordered
        clickable
      >
        <q-item>
          <q-item-section avatar>
            <q-icon name="person_outline" size="30px" />
          </q-item-section>

          <q-item-section>
            <q-item-label class="text-bold">
              {{ player }}
            </q-item-label>
          </q-item-section>

          <q-item-section side>
            <q-icon name="chevron_right" />
          </q-item-section>
        </q-item>
      </q-card>
    </q-list>

    <!-- BOTÃO -->
    <div class="q-pa-md">
      <q-btn color="primary" class="full-width" rounded unelevated> Adicionar Jogador </q-btn>
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
  const players = [
    'Anderson Dias',
    'Arthur Leal',
    'Cindomar Ferreira',
    'Gabriel Vianna',
    'Jean Benevides',
    'Jhonny Dias',
    'Tobias Souza',
    'Valmir Vicente'
  ]

  const filteredPlayers = computed(() => {
    return players.filter(p => p.toLowerCase().includes(filters.value.name.toLowerCase()))
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
  .player-card {
    border-radius: 14px;
    transition: 0.2s;
    background: white;
  }

  .player-card:hover {
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.12);
    transform: translateY(-1px);
  }
</style>
