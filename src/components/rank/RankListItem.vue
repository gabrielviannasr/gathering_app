<template>
  <q-card class="list-card q-pa-sm" clickable @click="$emit('select', item)">
    <div class="row items-center no-wrap">
      <!-- RANK CIRCLE -->
      <div class="round-number-circle q-mr-md">
        {{ item.rank }}
      </div>

      <!-- INFO -->
      <div class="col">
        <div class="text-subtitle2 text-bold">
          {{ item.player.name }}
        </div>

        <div class="text-caption q-mt-xs row items-center">
          <q-icon name="emoji_events" size="16px" class="q-mr-xs" style="color: #fe9a00" />

          {{ item.wins }} vitórias • {{ item.rounds }} rodadas
          <template v-if="item.events !== undefined">
            • {{ item.events }} evento{{ item.events === 1 ? '' : 's' }}
          </template>
        </div>
      </div>

      <!-- ARROW -->
      <div class="q-ml-auto">
        <q-icon name="chevron_right" size="22px" />
      </div>
    </div>
  </q-card>
</template>

<script setup>
  defineProps({
    item: { type: Object, required: true }
  })
</script>
