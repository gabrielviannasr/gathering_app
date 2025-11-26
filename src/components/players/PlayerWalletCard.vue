<template>
  <q-card class="q-pa-md form-card wallet-card">
    <div class="row items-center justify-between">
      <!-- TÍTULO -->
      <div class="text-subtitle1 text-bold">Saldo da Carteira</div>

      <!-- VALOR -->
      <div class="text-h6 text-bold" :class="amountClass">
        {{ formattedWallet }}
      </div>
    </div>
  </q-card>
</template>

<script setup>
  import { computed } from 'vue'

  const props = defineProps({
    wallet: { type: Number, required: true }
  })

  const formattedWallet = computed(() =>
    props.wallet.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    })
  )

  const amountClass = computed(() => (props.wallet >= 0 ? 'text-positive' : 'text-negative'))
</script>

<style scoped>
  .wallet-card {
    border-radius: 16px;
  }
</style>
