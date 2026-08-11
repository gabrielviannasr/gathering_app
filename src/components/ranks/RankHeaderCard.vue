<template>
  <q-card bordered class="q-pa-md">
    <div class="row items-center justify-center no-wrap">
      <!-- ICON -->
      <q-icon name="emoji_events" size="48px" class="q-mr-xs" style="color: #fe9a00" />

      <!-- TITLE -->
      <div class="text-h6 text-bold">{{ title }}</div>
    </div>
  </q-card>
</template>

<script setup>
  defineProps({
    title: { type: String, default: 'Rank' }
  })
</script>
