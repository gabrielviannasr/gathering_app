<template>
  <q-card class="q-pa-md">
    <!-- Título -->
    <div class="text-h6 text-bold q-mb-sm">Inscrições</div>

    <!-- Linha: taxa da confra -->
    <div class="row justify-between q-my-sm">
      <div class="text-subtitle2">Inscrição no Evento</div>
      <div class="text-negative">
        {{ confraFeeFormatted }}
      </div>
    </div>

    <!-- Linha: taxa das rodadas -->
    <div class="row justify-between q-my-sm">
      <div class="text-subtitle2">Inscrição por Rodada</div>
      <div class="text-negative">
        {{ roundFeeFormatted }}
      </div>
    </div>
  </q-card>
</template>

<script setup>
  import { computed } from 'vue'

  const props = defineProps({
    event: { type: Object, required: true }
  })

  /* Formatações */
  const confraFeeFormatted = computed(() =>
    props.event.confraFee.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
  )

  const roundFeeFormatted = computed(() =>
    props.event.roundFee.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
  )
</script>
