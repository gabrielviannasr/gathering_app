<template>
  <q-card bordered class="q-pa-md">
    <div class="row items-center no-wrap">
      <!-- Ícone -->
      <div class="circle-icon q-mr-md">
        <q-icon name="groups" color="white" size="24px" />
      </div>

      <!-- Conteúdo -->
      <div class="col">
        <!-- Nome -->
        <div class="text-subtitle2 text-bold">{{ gathering.name }}</div>

        <!-- Ano -->
        <div class="text-caption text-grey">{{ gathering.year }}</div>

        <!-- Eventos, jogadores e rodadas -->
        <div
          v-if="gathering.events != null && gathering.players != null && gathering.rounds != null"
          class="text-caption q-mt-xs"
        >
          {{ pluralize(gathering.events, 'evento') }}
          •
          {{ pluralize(gathering.players, 'jogador', 'jogadores') }}
          •
          {{ pluralize(gathering.rounds, 'rodada') }}
        </div>
      </div>

      <slot name="actions">
        <!-- Seta -->
        <q-icon v-if="showArrow" name="chevron_right" />
      </slot>
    </div>
  </q-card>
</template>

<script setup>
  import { pluralize } from 'src/utils'

  defineProps({
    gathering: { type: Object, required: true },
    showArrow: { type: Boolean, default: true }
  })
</script>
