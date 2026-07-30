<template>
  <q-card class="q-pa-md" clickable @click="emit('select', wallet)">
    <div class="row items-center no-wrap">
      <div class="avatar-circle q-mr-md">
        <div class="avatar-text">{{ initials }}</div>
      </div>

      <div class="col">
        <div class="text-subtitle2 text-bold">
          {{ wallet.player.name }}
        </div>

        <div class="text-caption text-bold" :class="amountClass">
          {{ formatCurrency(wallet.wallet) }}
        </div>
      </div>

      <q-icon v-if="showArrow" name="chevron_right" class="q-ml-auto" />
    </div>
  </q-card>
</template>

<script setup>
  import { computed } from 'vue'
  import { formatCurrency } from 'src/utils/number'

  const props = defineProps({
    wallet: { type: Object, required: true },
    showArrow: { type: Boolean, default: true }
  })

  const initials = computed(() =>
    props.wallet.player.name
      .split(' ')
      .map(word => word[0])
      .slice(0, 2)
      .join('')
      .toUpperCase()
  )

  const amountClass = computed(() => (props.wallet.wallet >= 0 ? 'text-positive' : 'text-negative'))

  const emit = defineEmits(['select'])
</script>
