<template>
  <q-card bordered class="q-pa-md">
    <div class="row items-center no-wrap">
      <!-- Ícone -->
      <div class="round-number-circle q-mr-md">
        {{ round.round }}
      </div>

      <!-- Conteúdo -->
      <div class="col">
        <!-- Vencedor -->
        <div class="text-subtitle2 q-mt-xs">
          <template v-if="round.playerWinner">
            Vencedor:
            <span class="text-bold text-primary">
              {{ round.playerWinner.name }}
            </span>
          </template>

          <template v-else>
            <span class="text-caption">Sem vencedor</span>
          </template>
        </div>

        <!-- Formato -->
        <div class="text-caption q-mt-xs">
          Formato: {{ round.format?.name ?? '—' }} • {{ round.playersTotal }} jogadores
        </div>

        <q-badge class="q-mt-sm" :color="round.canceled ? 'negative' : 'positive'" align="middle">
          {{ round.canceled ? 'Cancelada' : 'Ativa' }}
        </q-badge>
      </div>

      <slot name="actions">
        <!-- Seta -->
        <q-icon v-if="showArrow" name="chevron_right" />
      </slot>
    </div>
  </q-card>
</template>

<script setup>
  defineProps({
    round: { type: Object, required: true },
    showArrow: { type: Boolean, default: true }
  })
</script>
