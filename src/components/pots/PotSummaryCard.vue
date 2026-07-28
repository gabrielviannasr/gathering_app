<template>
  <q-card class="q-pa-md form-card">
    <div class="text-h6 text-bold">Potes</div>

    <div class="row q-mt-md justify-between">
      <div class="text-center">
        <div class="text-subtitle1 text-bold text-positive">R$ {{ pots.confraPot }}</div>
        <div class="text-caption text-bold">Confra</div>
      </div>

      <div class="text-center">
        <div class="text-subtitle1 text-bold text-negative">R$ {{ pots.loserPot }}</div>
        <div class="text-caption text-bold">Derrotados</div>
      </div>

      <div class="text-center">
        <div class="text-subtitle1 text-bold">R$ {{ pots.prize }}</div>
        <div class="text-caption text-bold">Premiação</div>
      </div>
    </div>
  </q-card>
</template>

<script setup>
  defineProps({
    pots: { type: Object, required: true }
  })
</script>
