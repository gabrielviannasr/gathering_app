<template>
  <q-card class="q-pa-md">
    <div class="row items-center no-wrap">
      <div class="avatar-circle q-mr-md">
        <div class="avatar-text">{{ initials }}</div>
      </div>

      <div class="col">
        <div class="text-subtitle2 text-bold">
          {{ props.player.name }}
        </div>
      </div>

      <q-icon v-if="props.showArrow" name="chevron_right" class="q-ml-auto" />
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
      .split(' ')
      .map(w => w[0])
      .slice(0, 2)
      .join('')
      .toUpperCase()
  )
</script>
