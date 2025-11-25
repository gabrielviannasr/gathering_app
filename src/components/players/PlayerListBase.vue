<template>
  <div>
    <!-- FILTROS -->
    <div class="q-pa-md">
      <q-card class="q-pa-md form-card">
        <div class="form-section-title">Filtros</div>

        <!-- Campo de busca -->
        <GlobalInput label="Nome" v-model="localFilter.name" debounce="300">
          <template #prepend>
            <q-icon name="search" />
          </template>
        </GlobalInput>

        <!-- Botão Adicionar (opcional) -->
        <div v-if="showAddButton" class="q-mt-sm">
          <q-btn class="add-btn full-width" no-caps rounded unelevated @click="$emit('add')">
            <q-icon name="add" class="q-mr-sm" />
            Adicionar jogador
          </q-btn>
        </div>
      </q-card>
    </div>

    <!-- LISTA -->
    <div class="q-pa-md q-gutter-md">
      <PlayerCard
        v-for="player in filteredPlayers"
        :key="player.id"
        :player="player"
        @click="$emit('select', player)"
      />

      <div v-if="paginate">
        <div class="q-mt-md">
          <q-pagination v-model="localPage" :max="maxPages" max-pages="5" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import GlobalInput from 'src/components/ui/GlobalInput.vue'
  import PlayerCard from 'src/components/players/PlayerCard.vue'
  import { ref, computed, watch } from 'vue'

  const props = defineProps({
    players: { type: Array, required: true },
    paginate: { type: Boolean, default: true },
    filters: { type: Object, default: () => ({ name: '' }) },
    showAddButton: { type: Boolean, default: false }
  })

  // eslint-disable-next-line no-unused-vars
  const emit = defineEmits(['select', 'add'])

  const localFilter = ref({ ...props.filters })
  const localPage = ref(1)
  const maxPages = 2 // placeholder

  watch(
    () => props.filters,
    v => (localFilter.value = { ...v })
  )

  const filteredPlayers = computed(() =>
    props.players.filter(p => p.name.toLowerCase().includes(localFilter.value.name.toLowerCase()))
  )
</script>
