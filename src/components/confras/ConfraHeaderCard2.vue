<template>
  <q-card class="q-pa-md form-card">
    <div class="text-h6 text-bold">{{ confra.gatheringName }} - {{ confra.year }}</div>

    <div class="row text-caption text-center justify-between q-mt-xs q-px-xs">
      <!-- <div>Eventos: {{ confra.events }} • Jogadores: {{ confra.players }} • Rodadas: {{ confra.rounds }}</div> -->
      <div>Eventos: {{ confra.events }}</div>
      <div>•</div>
      <div>Jogadores: {{ confra.players }}</div>
      <div>•</div>
      <div>Rodadas: {{ confra.rounds }}</div>
    </div>

    <div class="row q-mt-md justify-between">
      <div class="text-center">
        <div class="text-subtitle1 text-bold text-positive">R$ {{ confra.confraPot }}</div>
        <div class="text-caption text-bold">Pote da Confra</div>
      </div>

      <div class="text-center">
        <div class="text-subtitle1 text-bold text-negative">R$ {{ confra.loserPot }}</div>
        <div class="text-caption text-bold">Pote dos Derrotados</div>
      </div>

      <div class="text-center">
        <div class="text-subtitle1 text-bold">R$ {{ confra.prize }}</div>
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
