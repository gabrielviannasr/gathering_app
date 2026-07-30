<template>
  <q-card bordered class="q-pa-md">
    <!-- Título -->
    <div class="text-h6 text-bold q-mb-sm">Inscrições</div>

    <!-- Taxa da Confra -->
    <div class="row justify-between q-my-sm">
      <div class="text-subtitle2">Inscrição no Evento</div>
      <div class="text-negative">
        {{ formatCurrency(event.confraFee) }}
      </div>
    </div>

    <!-- Taxa da Rodada -->
    <div class="row justify-between q-my-sm">
      <div class="text-subtitle2">Inscrição por Rodada</div>
      <div class="text-negative">
        {{ formatCurrency(event.roundFee) }}
      </div>
    </div>
  </q-card>
</template>

<script setup>
  import { formatCurrency } from 'src/utils'

  defineProps({
    event: { type: Object, required: true }
  })
</script>
