<template>
  <q-card class="player-card q-pa-sm" clickable @click="$emit('click')">
    <div class="row items-center no-wrap">
      <div class="avatar-circle q-mr-md">
        <div class="avatar-text">{{ initials }}</div>
      </div>

      <div class="col">
        <div class="text-subtitle2 text-bold">
          {{ player.name }}
        </div>
      </div>

      <div class="q-ml-auto">
        <q-icon name="chevron_right" size="22px" />
      </div>
    </div>
  </q-card>
</template>

<script setup>
  const props = defineProps({
    player: { type: Object, required: true }
  })

  const initials = props.player.name
    .split(' ')
    .map(n => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
</script>
