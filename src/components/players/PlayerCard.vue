<template>
  <q-card class="q-pa-md player-card" clickable>
    <div class="row items-center no-wrap">
      <div class="avatar-circle q-mr-md">
        <div class="avatar-text">{{ initials }}</div>
      </div>

      <div class="col">
        <div class="text-subtitle2 text-bold">
          {{ displayName }}
        </div>

        <div v-if="showWalletInfo && hasWallet" class="text-caption text-grey-7">
          {{ wallet.events }} evento(s)
        </div>

        <!-- <div v-if="showWalletInfo && hasWallet" class="text-caption text-bold" :class="amountClass">
          {{ formattedWallet }}
        </div> -->
      </div>

      <q-icon v-if="showArrow" name="chevron_right" class="q-ml-auto" />
    </div>
  </q-card>
</template>

<script setup>
  import { computed } from 'vue'

  const props = defineProps({
    player: { type: Object, default: null },
    wallet: { type: Object, default: null },
    showWalletInfo: { type: Boolean, default: false },
    showArrow: { type: Boolean, default: true }
  })

  const displayName = computed(() => props.wallet?.playerName ?? props.player.name)

  const initials = computed(() =>
    displayName.value
      .split(' ')
      .map(w => w[0])
      .slice(0, 2)
      .join('')
      .toUpperCase()
  )

  const hasWallet = computed(() => props.wallet != null)

  // eslint-disable-next-line no-unused-vars
  const formattedWallet = computed(() =>
    hasWallet.value
      ? props.wallet.wallet.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        })
      : 'R$ 0,00'
  )

  // eslint-disable-next-line no-unused-vars
  const amountClass = computed(() =>
    props.wallet?.wallet >= 0 ? 'text-positive' : 'text-negative'
  )
</script>
