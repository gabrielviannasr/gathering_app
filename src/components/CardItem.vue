<template>
  <q-card class="card-item">
    <div class="column items-center q-pa-md">
      <div class="icon-box flex flex-center" :style="{ backgroundColor: color }">
        <q-icon :name="icon" size="30px" color="white" />
      </div>

      <div class="text-subtitle1 text-bold text-center q-mt-sm">
        {{ title }}
      </div>

      <div class="text-caption text-center text-grey-7">
        {{ subtitle }}
      </div>
    </div>
  </q-card>
</template>

<script setup>
  defineProps({
    icon: String,
    title: String,
    subtitle: String,
    color: String
  })
</script>

<style scoped>
  .card-item {
    background: #ffffff;
    border-radius: 18px;
    transition: 0.25s ease;
  }

  /* Hover igual ao Figma */
  .card-item:hover {
    transform: translateY(-2px);
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.12);
  }

  .icon-box {
    width: 60px;
    height: 60px;
    border-radius: 16px;
  }
</style>
