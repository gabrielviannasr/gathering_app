<template>
  <q-card bordered class="q-pa-md">
    <div class="row items-center no-wrap">
      <!-- Ícone -->
      <div class="round-number-circle q-mr-md">
        {{ result.rank }}
      </div>

      <!-- Conteúdo -->
      <div class="col">
        <!-- Nome -->
        <div class="text-subtitle2 text-bold">{{ result.player.name }}</div>

        <div class="text-caption q-mt-xs row items-center">
          <!-- Ícone -->
          <q-icon name="emoji_events" size="16px" class="q-mr-xs" style="color: #fe9a00" />

          <!-- Vitórias • Rodadas • Eventos -->
          {{ pluralize(result.wins, 'vitória') }}
          •
          {{ pluralize(result.rounds, 'rodada') }}

          <template v-if="result.events != null">
            • {{ pluralize(result.events, 'evento') }}
          </template>
        </div>
      </div>

      <!-- Seta -->
      <q-icon v-if="showArrow" name="chevron_right" class="q-ml-auto" />
    </div>
  </q-card>
</template>

<script setup>
  defineProps({
    result: { type: Object, required: true },
    showArrow: { type: Boolean, default: true }
  })

  function pluralize(value, singular, plural = `${singular}s`) {
    return `${value} ${value === 1 ? singular : plural}`
  }
</script>
