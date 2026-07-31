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
  defineProps({
    icon: {
      type: String,
      default: 'event_busy'
    },
    title: {
      type: String,
      default: 'Dados não encontrados'
    },
    message: {
      type: String,
      default: 'Os dados podem ter sido removidos ou não existir.'
    }
  })
</script>
