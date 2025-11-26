<template>
  <div>
    <!-- FILTROS -->
    <div class="q-pa-md">
      <q-card class="q-pa-md form-card">
        <div class="form-section-title">Filtros</div>

        <GlobalInput label="Nome" v-model="localFilter.name">
          <template #prepend>
            <q-icon name="search" />
          </template>
        </GlobalInput>

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
        :wallet="wallets[player.id]"
        :showWalletInfo="showWalletInfo"
        @click="$emit('select', player)"
        class="list-card"
      />
    </div>
  </div>
</template>

<script setup>
  import PlayerCard from 'src/components/players/PlayerCard.vue'
  import GlobalInput from 'src/components/ui/GlobalInput.vue'
  import { ref, computed, watch } from 'vue'

  const props = defineProps({
    players: { type: Array, required: true },
    paginate: { type: Boolean, default: true },
    filters: { type: Object, default: () => ({ name: '' }) },
    showAddButton: { type: Boolean, default: false },
    showWalletInfo: { type: Boolean, default: false }, // <-- NOVO
    wallets: { type: Object, default: () => ({}) } // <-- wallet opcional
  })

  // eslint-disable-next-line no-unused-vars
  const emit = defineEmits(['select', 'add'])

  const localFilter = ref({ ...props.filters })

  watch(
    () => props.filters,
    v => (localFilter.value = { ...v })
  )

  const filteredPlayers = computed(() =>
    props.players.filter(p => p.name.toLowerCase().includes(localFilter.value.name.toLowerCase()))
  )
</script>
