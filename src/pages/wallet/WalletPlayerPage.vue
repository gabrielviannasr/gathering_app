<template>
  <q-page class="page-bg">
    <!-- CARD DO PLAYER -->
    <div class="q-pa-md">
      <PlayerCard
        :wallet="{
          playerName: player.name,
          wallet: walletAmount,
          events: 1
        }"
        :showWalletInfo="true"
        :showArrow="false"
      />
    </div>

    <!-- SALDO DA CARTEIRA -->
    <div class="q-pa-md">
      <PlayerWalletCard :wallet="walletAmount" />
    </div>

    <!-- ADICIONAR TRANSAÇÃO -->
    <div class="q-pa-md">
      <q-btn class="add-btn full-width" no-caps rounded unelevated @click="onAdd">
        <q-icon name="add" class="q-mr-sm" />
        Nova transação
      </q-btn>
    </div>

    <!-- LISTA DE TRANSAÇÕES DO JOGADOR -->
    <div class="q-pa-md q-gutter-md">
      <TransactionCard
        v-for="item in playerTransactions"
        :key="item.id"
        :item="item"
        @click="handleClick(item)"
      />
    </div>
  </q-page>
</template>

<script setup>
  import { computed } from 'vue'
  import { useRoute } from 'vue-router'

  import PlayerCard from 'src/components/players/PlayerCard.vue'
  import PlayerWalletCard from 'src/components/players/PlayerWalletCard.vue'
  import TransactionCard from 'src/components/transactions/TransactionCard.vue'

  import { usePlayerStore } from 'src/stores/player'
  import { useTransactionStore } from 'src/stores/transaction'
  import { useRankNavigator } from 'src/composables/navigation'
  import { useWalletNavigator } from 'src/composables/navigation'

  const { goToRankEvent, goToRankEventPlayer } = useRankNavigator()

  const route = useRoute()
  const playerStore = usePlayerStore()
  const transactionStore = useTransactionStore()
  const { goToNewTransaction, goToEditTransaction } = useWalletNavigator()

  const playerId = Number(route.params.idPlayer)

  const player = computed(() => playerStore.getPlayer(playerId))

  // MOCK TEMPORÁRIO (depois vem do backend)
  const walletAmount = computed(() => {
    return transactionStore.transactions
      .filter(t => t.idPlayer === playerId)
      .reduce((acc, t) => acc + t.amount, 0)
  })

  const playerTransactions = computed(() =>
    transactionStore.transactions.filter(t => t.idPlayer === playerId)
  )

  function onAdd() {
    goToNewTransaction(playerId)
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
