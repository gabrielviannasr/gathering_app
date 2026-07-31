<template>
  <q-card bordered class="q-pa-md">
    <div class="row items-center no-wrap">
      <!-- Ícone -->
      <div class="circle-icon q-mr-md">
        <q-icon :name="icon" color="white" size="24px" />
      </div>

      <!-- Conteúdo -->
      <div class="col">
        <div class="text-subtitle2 text-bold">
          {{ title }}
        </div>

        <div class="text-caption text-grey">
          {{ message }}
        </div>
      </div>
    </div>
  </q-card>
</template>

<script setup>
  import { computed } from 'vue'

  const EMPTY_STATES = {
    event: {
      icon: 'event_busy',
      title: 'Evento não encontrado',
      message: 'O evento não existe ou pode ter sido removido.'
    },
    gathering: {
      icon: 'event_busy',
      title: 'Confra não encontrada',
      message: 'A confra não existe ou pode ter sido removida.'
    },
    player: {
      icon: 'person_off',
      title: 'Jogador não encontrado',
      message: 'O jogador não existe ou pode ter sido removido.'
    }
  }

  const props = defineProps({
    type: String,
    icon: String,
    title: String,
    message: String
  })

  const state = computed(() => EMPTY_STATES[props.type] ?? {})

  const icon = computed(() => props.icon ?? state.value.icon ?? 'info')
  const title = computed(() => props.title ?? state.value.title ?? 'Não encontrado')
  const message = computed(
    () => props.message ?? state.value.message ?? 'Os dados não foram encontrados.'
  )
</script>
