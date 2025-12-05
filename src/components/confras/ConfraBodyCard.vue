<template>
  <q-card class="q-pa-md form-card">
    <div class="text-h6 text-bold">Potes - Total</div>

    <div class="row q-mt-md justify-between">
      <div class="text-center">
        <div class="text-subtitle1 text-bold text-positive">R$ {{ confraSummary.confraPot }}</div>
        <div class="text-caption text-bold">Confra</div>
      </div>

      <div class="text-center">
        <div class="text-subtitle1 text-bold text-negative">R$ {{ confraSummary.loserPot }}</div>
        <div class="text-caption text-bold">Derrotados</div>
      </div>

      <div class="text-center">
        <div class="text-subtitle1 text-bold">R$ {{ confraSummary.prize }}</div>
        <div class="text-caption text-bold">Premiação</div>
      </div>
    </div>
  </q-card>
</template>

<script setup>
  defineProps({
    confraSummary: Object
  })
</script>
