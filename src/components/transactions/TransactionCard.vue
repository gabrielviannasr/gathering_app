<template>
  <q-card class="q-pa-sm list-card">
    <div class="row items-center no-wrap">
      <!-- Ícone do tipo -->
      <q-icon :name="type?.icon" size="26px" class="q-mr-md" :style="`color: ${amountColorCss}`" />

      <!-- Conteúdo -->
      <div class="col">
        <div class="text-subtitle2 text-bold">
          {{ type?.name }}
        </div>

        <!-- Jogador -->
        <div class="text-caption text-grey-7">
          {{ playerName }}
        </div>

        <div class="text-caption text-grey-6 q-mt-xs">
          {{ formattedDate }}
        </div>

        <div class="text-caption text-grey-8 q-mt-xs">
          {{ item.description || '-' }}
        </div>
      </div>

      <!-- Valor -->
      <div class="text-subtitle1 text-bold q-ml-md" :class="amountColorClass">
        {{ formattedAmount }}
      </div>

      <q-icon name="chevron_right" class="q-ml-xs" />
    </div>
  </q-card>
</template>

<script setup>
  import { computed } from 'vue'
  import { usePlayerStore } from 'src/stores/player'
  import { useTransactionTypeStore } from 'src/stores/transactionType'

  const props = defineProps({ item: Object })

  const playerStore = usePlayerStore()
  const typeStore = useTransactionTypeStore()

  const type = computed(() => typeStore.getType(props.item.id_transaction_type))

  const playerName = computed(() => {
    const p = playerStore.players.find(x => x.id === props.item.id_player)
    return p?.name || 'Desconhecido'
  })

  const formattedAmount = computed(() =>
    props.item.amount.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    })
  )

  const amountColorClass = computed(() =>
    props.item.amount >= 0 ? 'text-positive' : 'text-negative'
  )

  const amountColorCss = computed(() => (props.item.amount >= 0 ? '#2ecc71' : '#e74c3c'))

  const formattedDate = computed(() => {
    const d = new Date(props.item.created_at)
    return d.toLocaleDateString('pt-BR')
  })
</script>
