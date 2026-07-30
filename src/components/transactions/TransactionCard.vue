<template>
  <q-card class="q-pa-sm list-card">
    <div class="row items-center no-wrap">
      <!-- Ícone do tipo -->
      <q-icon :name="type.icon" size="26px" class="q-mr-md" :style="`color: ${amountColorCss}`" />

      <!-- Conteúdo -->
      <div class="col">
        <div class="text-subtitle2 text-bold">
          {{ props.item.type.name }}
        </div>

        <!-- Jogador -->
        <div class="text-caption text-grey-7">
          {{ props.item.player.name }}
        </div>

        <div class="text-caption text-grey-6 q-mt-xs">
          {{ formattedDate }}
        </div>

        <div class="text-caption text-grey-8 q-mt-xs">
          {{ props.item.type.description || '-' }}
        </div>
      </div>

      <!-- Valor -->
      <div class="text-subtitle1 text-bold q-ml-md" :class="amountColorClass">
        {{ formatCurrency(item.amount) }}
      </div>

      <q-icon name="chevron_right" class="q-ml-xs" />
    </div>
  </q-card>
</template>

<script setup>
  import { computed } from 'vue'
  import { useTransactionTypeStore } from 'src/stores/transactionType'
  import { formatCurrency } from 'src/utils'

  const props = defineProps({ item: Object })

  const typeStore = useTransactionTypeStore()

  const type = computed(() => typeStore.getType(props.item.type.id))

  const amountColorClass = computed(() =>
    props.item.amount >= 0 ? 'text-positive' : 'text-negative'
  )

  const amountColorCss = computed(() => (props.item.amount >= 0 ? '#2ecc71' : '#e74c3c'))

  const formattedDate = computed(() => {
    const d = new Date(props.item.createdAt)
    return d.toLocaleDateString('pt-BR')
  })
</script>
