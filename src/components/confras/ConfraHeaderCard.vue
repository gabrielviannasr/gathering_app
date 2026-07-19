<template>
  <q-card class="q-pa-md form-card row items-center">
    <!-- ÍCONE DO FORMATO -->
    <div class="icon-circle q-mr-md">
      <q-icon name="style" color="white" size="28px" />
    </div>

    <div class="col">
      <!-- Nome do formato -->
      <div class="text-subtitle1 text-bold">
        {{ confraSummary.gathering.year }} - {{ confraSummary.gathering.name }}
      </div>

      <!-- Ano -->
      <div class="text-caption text-grey">
        {{ confraSummary.year }}
      </div>

      <!-- Eventos, jogadores e rodadas -->
      <div class="text-caption q-mt-xs">
        {{ confraSummary.events }} eventos • {{ confraSummary.players }} jogadores •
        {{ confraSummary.rounds }} rodadas
      </div>
    </div>
  </q-card>
</template>

<script setup>
  // eslint-disable-next-line no-unused-vars
  const props = defineProps({
    confraSummary: { type: Object, required: true }
  })
</script>
