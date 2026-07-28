<template>
  <q-card bordered class="q-pa-md">
    <div class="row items-center no-wrap">
      <!-- Ícone -->
      <div class="avatar-circle q-mr-md">
        <div class="avatar-text">{{ initials }}</div>
      </div>

      <!-- Conteúdo -->
      <div class="col">
        <div class="text-subtitle2 text-bold">{{ player.name }}</div>
      </div>

      <!-- Seta -->
      <q-icon v-if="showArrow" name="chevron_right" class="q-ml-auto" />
    </div>
  </q-card>
</template>

<script setup>
  import { computed } from 'vue'

  const props = defineProps({
    player: { type: Object, required: true },
    showArrow: { type: Boolean, default: true }
  })

  const initials = computed(() =>
    props.player.name
      .trim()
      .split(/\s+/)
      .map(word => word[0])
      .slice(0, 2)
      .join('')
      .toUpperCase()
  )
</script>
