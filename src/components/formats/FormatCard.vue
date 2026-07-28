<template>
  <q-card bordered class="q-pa-md">
    <div class="row items-center no-wrap">
      <!-- Ícone -->
      <div class="icon-circle q-mr-md">
        <q-icon name="style" color="white" size="24px" />
      </div>

      <!-- Conteúdo -->
      <div class="col">
        <div class="text-subtitle2 text-bold">{{ format.name }}</div>

        <div class="text-caption text-grey">{{ format.lifeCount }} pontos de vida</div>
      </div>

      <!-- Seta -->
      <q-icon v-if="showArrow" name="chevron_right" class="q-ml-auto" />
    </div>
  </q-card>
</template>

<script setup>
  // eslint-disable-next-line no-unused-vars
  const props = defineProps({
    format: { type: Object, required: true },
    showArrow: { type: Boolean, default: true }
  })
</script>
