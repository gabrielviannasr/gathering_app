<template>
  <q-page class="page-bg">
    <!-- FILTROS -->
    <div class="q-pa-md">
      <GlobalInput label="Nome" v-model="filters.name" debounce="300">
        <template #prepend>
          <q-icon name="search" />
        </template>
      </GlobalInput>

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
        :key="player.name"
        class="player-card q-pa-sm"
        clickable
        @click="openPlayer(player)"
      >
        <!-- WRAPPER PARA GARANTIR O CÍRCULO -->
        <div class="row items-center no-wrap">
          <div class="avatar-circle q-mr-md">
            <div class="avatar-text">{{ initials(player.name) }}</div>
          </div>

          <div class="col">
            <div class="text-subtitle2 text-bold">{{ player.name }}</div>
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
  import GlobalInput from 'src/components/ui/GlobalInput.vue'
  import { ref, computed } from 'vue'
  import { useRouter } from 'vue-router'
  const router = useRouter()

  const filters = ref({ name: '' })

  const players = [
    { id: 1, name: 'Anderson Dias' },
    { id: 2, name: 'Arthur Leal' },
    { id: 3, name: 'Cindomar Ferreira' },
    { id: 4, name: 'Gabriel Vianna' },
    { id: 5, name: 'Jean Benevides' },
    { id: 6, name: 'Jhonny Dias' },
    { id: 7, name: 'Tobias Souza' },
    { id: 8, name: 'Valmir Vicente' }
  ]

  const page = ref(1)
  const maxPages = 2

  const filteredPlayers = computed(() =>
    players.filter(p => p.name.toLowerCase().includes(filters.value.name.toLowerCase()))
  )

  function onAdd() {
    console.log('Adicionar jogador')
    router.push({ name: 'jogadores-new' })
  }

  function openPlayer(item) {
    console.log('Abrir jogador', item)
    router.push({ name: 'jogadores-edit', params: { id: item.id } })
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
