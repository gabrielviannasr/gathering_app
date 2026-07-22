<template>
  <q-page class="page-bg">
    <!-- CARD DO PLAYER -->
    <div class="q-pa-md">
      <WalletCard :wallet="wallet" :showArrow="false" v-if="wallet" />
    </div>

    <!-- ADICIONAR TRANSAÇÃO -->
    <div class="q-pa-md">
      <q-btn class="add-btn full-width" no-caps rounded unelevated @click="onAdd">
        <q-icon name="add" class="q-mr-sm" />
        Nova transação
      </q-btn>
    </div>

    <!-- LISTA DE TRANSAÇÕES DO JOGADOR -->
    <div class="q-pa-md q-gutter-md" v-if="transactions.length > 0">
      <TransactionCard
        v-for="transaction in transactions"
        :key="transaction.id"
        :item="transaction"
        @click="handleClick(transaction)"
      />

      <!-- Paginação -->
      <div class="q-mt-md q-pb-xl">
        <q-pagination v-model="page" :max="maxPages" max-pages="5" />
      </div>
    </div>
  </q-page>
</template>

<script setup>
  /* COMPONENTS */
  import WalletCard from 'src/components/wallet/WalletCard.vue'
  import TransactionCard from 'src/components/transactions/TransactionCard.vue'

  /* VUE + PINIA */
  import { computed, onMounted, ref, watch } from 'vue'
  import { useRoute } from 'vue-router'

  /* STORES */
  import { useConfraStore } from 'src/stores/confra'
  import { useDashboardStore } from 'src/stores/dashboard'
  import { useTransactionStore } from 'src/stores/transaction'

  /* NAVIGATION */
  import { useRankNavigator } from 'src/composables/navigation'
  import { useWalletNavigator } from 'src/composables/navigation'

  /* NAVIGATION */
  const { goToRankEvent, goToRankEventPlayer } = useRankNavigator()
  const { goToNewTransaction, goToEditTransaction } = useWalletNavigator()

  const route = useRoute()
  const idPlayer = Number(route.params.idPlayer)

  /* STORES */
  const confraStore = useConfraStore()
  const dashboardStore = useDashboardStore()
  const transactionStore = useTransactionStore()

  /* DATA */
  const confra = computed(() => confraStore.selectedConfra)
  const wallet = computed(() => dashboardStore.wallet)
  const transactions = computed(() => transactionStore.transactions.content || [])

  /* PAGINATION */
  const page = ref(1)
  const perPage = 10
  const maxPages = computed(() => transactionStore.transactions?.totalPages || 1)

  /* ---------------- LOAD ---------------- */
  onMounted(async () => {
    await dashboardStore.getWallet(confra.value.id, idPlayer)
    await load()
  })

  watch(page, () => {
    load()
  })

  async function load() {
    await transactionStore.getTransactionsPage({
      idGathering: confra.value.id,
      idPlayer: idPlayer,
      page: page.value - 1,
      size: perPage
    })
  }

  function onAdd() {
    goToNewTransaction(idPlayer)
  }

  function handleClick(item) {
    const t = item.idTransactionType

    switch (t) {
      case 1: // INSCRIÇÃO
        goToRankEvent(item.idEvent)
        break

      case 2: // RESULTADO
        goToRankEventPlayer(item.idEvent, item.idPlayer)
        break

      case 3: // DEPÓSITO
      case 4: // SAQUE
        goToEditTransaction(item.idPlayer, item.id)
        break
    }
  }
</script>
