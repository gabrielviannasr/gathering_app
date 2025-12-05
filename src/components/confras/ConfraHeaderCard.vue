<template>
  <q-card class="q-pa-md form-card">
    <div class="text-h6 text-bold">{{ confra.gathering_name }}</div>

    <div class="text-caption q-mt-xs">
      Eventos: {{ confra.events }} • Jogadores: {{ confra.players }} • Rodadas: {{ confra.rounds }}
    </div>

    <div class="row q-mt-md justify-between">
      <div class="text-center">
        <div class="text-subtitle1 text-bold text-positive">R$ {{ confra.confraPot }}</div>
        <div class="text-caption">Pote da Confra</div>
      </div>

      <div class="text-center">
        <div class="text-subtitle1 text-bold text-negative">R$ {{ confra.loserPot }}</div>
        <div class="text-caption">Derrotados</div>
      </div>

      <div class="text-center">
        <div class="text-subtitle1 text-bold">R$ {{ confra.prize }}</div>
        <div class="text-caption">Premiação</div>
      </div>
    </div>
  </q-card>
</template>

<script setup>
  defineProps({
    confra: Object
  })
</script>
