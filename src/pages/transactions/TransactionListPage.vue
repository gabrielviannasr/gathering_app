<template>
  <q-page class="page-bg">
    <!-- FILTROS -->
    <div class="q-pa-md">
      <TransactionFilters v-model="filters" />
    </div>

    <!-- LISTA -->
    <div class="q-pa-md q-gutter-md">
      <TransactionCard
        v-for="item in paginated"
        :key="item.id"
        :item="item"
        @click="handleClick(item)"
      />

      <!-- PAGINAÇÃO -->
      <slot name="pagination">
        <q-pagination v-model="page" :max="maxPages" max-pages="5" class="q-mt-md" />
      </slot>
    </div>
  </q-page>
</template>

<script setup>
  import { ref, computed } from 'vue'
  import TransactionFilters from 'src/components/transactions/TransactionFilters.vue'
  import TransactionCard from 'src/components/transactions/TransactionCard.vue'
  import { useTransactionStore } from 'src/stores/transaction'
  import { useRankNavigator } from 'src/composables/navigation'

  const { goToRankPlayer } = useRankNavigator()

  const store = useTransactionStore()

  const filters = ref({
    player: null,
    type: null,
    month: null
  })

  const page = ref(1)
  const perPage = 10

  const filtered = computed(() => {
    return store.transactions.filter(t => {
      const matchPlayer = filters.value.player ? t.id_player === filters.value.player : true

      const matchType = filters.value.type ? t.id_transaction_type === filters.value.type : true

      const matchMonth = filters.value.month
        ? new Date(t.created_at).getMonth() + 1 === filters.value.month
        : true

      return matchPlayer && matchType && matchMonth
    })
  })

  const maxPages = computed(() => Math.ceil(filtered.value.length / perPage))

  const paginated = computed(() => {
    const start = (page.value - 1) * perPage
    return filtered.value.slice(start, start + perPage)
  })

  function handleClick(item) {
    const t = item.idTransactionType

    switch (t) {
      case 1: // INSCRIÇÃO
        console.log('Abrir tela do evento da inscrição:', item)
        // goToEvent(item.idEvent)  ← criamos depois
        break

      case 2: // RESULTADO
        console.log('Abrir tela do rank do jogador')
        goToRankPlayer(item.idEvent, item.idPlayer)
        break

      case 3: // DEPÓSITO
      case 4: // SAQUE
        console.log('Abrir carteira do jogador')
        // goToWalletPlayer(item.idPlayer) ← criaremos depois
        break
    }
  }
</script>
