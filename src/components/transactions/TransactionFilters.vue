<template>
  <q-card class="q-pa-md form-card">
    <div class="form-section-title">Filtros</div>

    <div class="row q-col-gutter-md">
      <!-- Jogador -->
      <div class="col-12">
        <GlobalSelect
          v-model="localFilters.player"
          label="Jogador"
          map-options
          emit-value
          :options="playerOptionsWithAll"
          option-label="name"
          option-value="id"
        />
      </div>

      <!-- Tipo -->
      <div class="col-6">
        <GlobalSelect
          v-model="localFilters.type"
          label="Tipo"
          map-options
          emit-value
          :options="transactionTypesWithAll"
          option-label="name"
          option-value="id"
        />
      </div>

      <!-- Mês -->
      <div class="col-6">
        <GlobalSelect
          v-model="localFilters.month"
          label="Mês"
          map-options
          emit-value
          :options="monthOptions"
        />
      </div>
    </div>
  </q-card>
</template>

<script setup>
  import { ref, watch } from 'vue'
  import GlobalSelect from 'src/components/ui/GlobalSelect.vue'
  import { usePlayerStore } from 'src/stores/player'
  import { useTransactionTypeStore } from 'src/stores/transactionType'
  import { monthOptions } from 'src/constants/months'

  const props = defineProps({
    modelValue: Object
  })
  const emit = defineEmits(['update:modelValue'])

  const localFilters = ref({ ...props.modelValue })

  const playerStore = usePlayerStore()
  const transactionTypeStore = useTransactionTypeStore()

  // Opção "Todos" = null
  const playerOptionsWithAll = [{ id: null, name: 'Todos' }, ...playerStore.players]
  const transactionTypesWithAll = [{ id: null, name: 'Todos' }, ...transactionTypeStore.types]

  watch(localFilters, v => emit('update:modelValue', v), { deep: true })
</script>
