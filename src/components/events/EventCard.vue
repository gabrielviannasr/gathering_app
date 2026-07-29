<template>
  <q-card bordered class="q-pa-md">
    <div class="row items-center no-wrap">
      <!-- Ícone -->
      <div class="icon-circle q-mr-md">
        <q-icon name="event" color="white" size="26px" />
      </div>

      <!-- Conteúdo -->
      <div class="col">
        <!-- Nome do formato -->
        <div class="text-subtitle1 text-bold">
          {{ event.format?.name ?? 'Sem Formato' }}
        </div>

        <!-- Data -->
        <div class="text-caption text-grey">
          {{ formatDateShort(event.createdAt) }}
        </div>

        <!-- Jogadores / Rodadas -->
        <div class="text-caption q-mt-xs">
          {{ event.players }} jogadores • {{ event.rounds }} rodadas
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
  import { formatDateShort } from 'src/utils/date'

  defineProps({
    event: { type: Object, required: true },
    showArrow: { type: Boolean, default: true }
  })
</script>
