<template>
  <q-card class="q-pa-md form-card row items-center">
    <!-- ÍCONE DO FORMATO -->
    <div class="icon-circle q-mr-md">
      <q-icon name="style" color="white" size="28px" />
    </div>

    <div class="col">
      <!-- Nome do formato -->
      <div class="text-subtitle1 text-bold">
        {{ gatheringSummary.gathering.name }}
      </div>

      <!-- Ano -->
      <div class="text-caption text-grey">
        {{ gatheringSummary.gathering.year }}
      </div>

      <!-- Eventos, jogadores e rodadas -->
      <div class="text-caption q-mt-xs">
        {{ pluralize(gatheringSummary.events, 'evento') }}
        •
        {{ pluralize(gatheringSummary.players, 'jogador') }}
        •
        {{ pluralize(gatheringSummary.rounds, 'rodada') }}
      </div>
    </div>
  </q-card>
</template>

<script setup>
  import { pluralize } from 'src/utils/text.js'

  defineProps({
    gatheringSummary: { type: Object, required: true }
  })
</script>
