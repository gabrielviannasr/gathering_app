<template>
  <q-card class="q-pa-md form-card row items-center">
    <!-- ÍCONE DO FORMATO -->
    <div class="icon-circle q-mr-md">
      <q-icon name="style" color="white" size="28px" />
    </div>

    <div class="col">
      <!-- Nome do formato -->
      <template v-if="event.idFormat && event.format">
        <div class="text-subtitle1 text-bold">{{ event.format.name }}</div>
      </template>
      <template v-else>
        <div class="text-caption text-grey">Sem formato</div>
      </template>

      <!-- Data -->
      <div class="text-caption text-grey">
        {{ formatDateShort(event.createdAt) }}
      </div>

      <!-- Jogadores e rodadas -->
      <div class="text-caption q-mt-xs">
        {{ event.players }} jogadores • {{ event.rounds }} rodadas
      </div>
    </div>
  </q-card>
</template>

<script setup>
  import { formatDateShort } from 'src/utils/date'
  // eslint-disable-next-line no-unused-vars
  const props = defineProps({
    event: { type: Object, required: true }
  })
</script>
