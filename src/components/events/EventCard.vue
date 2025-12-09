<template>
  <q-card
    class="q-pa-md form-card"
    :class="{ 'q-pa-sm list-card': !asHeader }"
    :clickable="!asHeader && clickable"
    @click="handleClick"
  >
    <div class="row items-center no-wrap">
      <!-- Ícone -->
      <div class="icon-circle q-mr-md">
        <q-icon :name="iconName" color="white" size="26px" />
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

        <!-- POTES (Somente quando showPots = true) -->
        <div v-if="showPots" class="row q-mt-xs justify-between text-caption text-center">
          <div class="col">
            <span class="text-bold text-positive">R$ {{ event.confraPot }}</span>
            <div>Confra</div>
          </div>

          <div class="col">
            <span class="text-bold text-negative">R$ {{ event.loserPot }}</span>
            <div>Derrotados</div>
          </div>

          <div class="col">
            <span class="text-bold">R$ {{ event.prize }}</span>
            <div>Premiação</div>
          </div>
        </div>
      </div>

      <!-- Seta (exibida apenas em lista) -->
      <q-icon v-if="!asHeader && clickable" name="chevron_right" size="22px" class="q-ml-auto" />
    </div>
  </q-card>
</template>

<script setup>
  import { computed } from 'vue'
  import { formatDateShort } from 'src/utils/date'

  const props = defineProps({
    event: { type: Object, required: true },
    asHeader: { type: Boolean, default: false },
    showPots: { type: Boolean, default: false },
    clickable: { type: Boolean, default: true }
  })

  const emit = defineEmits(['open'])

  const iconName = computed(() => {
    return props.event.format?.type?.icon ?? 'event'
  })

  function handleClick() {
    if (!props.asHeader && props.clickable) {
      emit('open', props.event)
    }
  }
</script>
