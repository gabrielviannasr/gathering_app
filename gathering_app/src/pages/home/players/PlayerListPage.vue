<template>
  <q-page class="page-bg">
    <!-- FILTROS -->
    <div class="q-pa-md">
      <q-input filled dense label="Nome" v-model="filters.name" debounce="300">
        <template #prepend><q-icon name="search" /></template>
      </q-input>

      <div class="q-mt-sm">
        <q-btn class="add-btn full-width" no-caps rounded unelevated @click="onAdd">
          <q-icon name="add" class="q-mr-sm" />
          Adicionar jogador
        </q-btn>
      </div>
    </div>

    <!-- LISTA -->
    <div class="q-pa-md q-gutter-md">
      <q-card
        v-for="player in filteredPlayers"
        :key="player"
        class="player-card q-pa-sm"
        clickable
        @click="openPlayer(player)"
      >
        <!-- WRAPPER PARA GARANTIR O CÍRCULO -->
        <div class="row items-center no-wrap">
          <div class="avatar-circle q-mr-md">
            <div class="avatar-text">{{ initials(player) }}</div>
          </div>

          <div class="col">
            <div class="text-subtitle2 text-bold">{{ player }}</div>
          </div>

          <div class="q-ml-auto">
            <q-icon name="chevron_right" />
          </div>
        </div>
      </q-card>

      <div class="q-mt-md">
        <q-pagination v-model="page" :max="maxPages" max-pages="5" />
      </div>
    </div>
  </q-page>
</template>

<script setup>
  import { ref, computed } from 'vue'

  const filters = ref({ name: '' })

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

  const page = ref(1)
  const maxPages = 2

  const filteredPlayers = computed(() =>
    players.filter(p => p.toLowerCase().includes(filters.value.name.toLowerCase()))
  )

  function onAdd() {
    console.log('Adicionar jogador')
  }

  function openPlayer(player) {
    console.log('Abrir jogador', player)
  }

  function initials(name) {
    if (!name) return ''
    return name
      .split(' ')
      .map(s => s[0])
      .slice(0, 2)
      .join('')
      .toUpperCase()
  }
</script>
