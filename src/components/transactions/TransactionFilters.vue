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
          :options="monthOptionsWithAll"
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

  const monthOptionsWithAll = [
    { label: 'Todos', value: null },
    { label: 'Janeiro', value: 1 },
    { label: 'Fevereiro', value: 2 },
    { label: 'Março', value: 3 },
    { label: 'Abril', value: 4 },
    { label: 'Maio', value: 5 },
    { label: 'Junho', value: 6 },
    { label: 'Julho', value: 7 },
    { label: 'Agosto', value: 8 },
    { label: 'Setembro', value: 9 },
    { label: 'Outubro', value: 10 },
    { label: 'Novembro', value: 11 },
    { label: 'Dezembro', value: 12 }
  ]

  watch(localFilters, v => emit('update:modelValue', v), { deep: true })
</script>
