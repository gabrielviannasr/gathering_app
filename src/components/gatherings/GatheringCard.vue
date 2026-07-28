<template>
  <q-card bordered class="q-pa-md">
    <div class="row items-center no-wrap">
      <!-- Ícone -->
      <div class="circle-icon q-mr-md">
        <q-icon name="groups" color="white" size="24px" />
      </div>

      <!-- Conteúdo -->
      <div class="col">
        <div class="text-subtitle2 text-bold">{{ gathering.name }}</div>

        <div class="text-caption text-grey">
          {{ gathering.year }}
        </div>
      </div>

      <!-- Seta -->
      <q-icon v-if="showArrow" name="chevron_right" class="q-ml-auto" />
    </div>
  </q-card>
</template>

<script setup>
  const { gathering, showArrow } = defineProps({
    gathering: { type: Object, required: true },
    showArrow: { type: Boolean, default: true }
  })
</script>
