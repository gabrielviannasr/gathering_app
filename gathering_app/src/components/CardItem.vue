<template>
  <q-card class="card-item" flat bordered>
    <div class="column items-center q-pa-md">
      <div class="icon-box flex flex-center" :style="{ backgroundColor: color }">
        <q-icon :name="icon" size="28px" color="white" />
      </div>

      <div class="text-subtitle1 text-bold text-center q-mt-sm">{{ title }}</div>
      <div class="text-caption text-grey text-center">{{ subtitle }}</div>
    </div>
  </q-card>
</template>

<script setup>
  // eslint-disable-next-line no-unused-vars
  const props = defineProps({
    icon: String,
    title: String,
    subtitle: String,
    color: String
  })
</script>

<style scoped>
  .card-item {
    border-radius: 18px;
    background: white;
    transition: 0.2s ease;
  }

  .card-item:hover {
    box-shadow: 0px 4px 18px rgba(0, 0, 0, 0.12);
    transform: scale(1.02);
  }

  .icon-box {
    width: 60px;
    height: 60px;
    border-radius: 16px;
  }
</style>
