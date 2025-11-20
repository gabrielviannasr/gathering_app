<template>
  <q-card class="card-item q-pa-md column items-center justify-center" clickable @click="emitClick">
    <q-icon :name="icon" size="40px" class="q-mb-sm" />
    <div class="text-subtitle1 text-bold text-center">{{ title }}</div>
    <div class="text-caption text-grey text-center">{{ subtitle }}</div>
  </q-card>
</template>

<script setup>
  // eslint-disable-next-line no-unused-vars
  const props = defineProps({
    icon: String,
    title: String,
    subtitle: String
  })

  const emit = defineEmits(['click'])

  function emitClick() {
    emit('click')
  }
</script>

<style scoped>
  .card-item {
    border-radius: 16px;
    transition: 0.2s;
    background: white;
  }
  .card-item:hover {
    transform: scale(1.03);
  }
</style>
