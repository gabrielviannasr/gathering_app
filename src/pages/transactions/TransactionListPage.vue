<template>
  <q-page class="page-bg">
    <!-- FILTROS -->
    <div class="q-pa-md">
      <q-card class="q-pa-md form-card">
        <!-- Title -->
        <div class="form-section-title">Filtros</div>

        <div class="row q-col-gutter-sm q-mt-sm">
          <!-- Jogador -->
          <div class="col-12">
            <GlobalSelect
              clearable
              v-model="filters.idPlayer"
              label="Jogador"
              map-options
              emit-value
              :options="players"
              option-label="name"
              option-value="id"
            />
          </div>

          <!-- Tipo -->
          <div class="col-12">
            <GlobalSelect
              clearable
              v-model="filters.idType"
              label="Tipo"
              map-options
              emit-value
              :options="types"
              option-label="name"
              option-value="id"
            />
          </div>

          <!-- TODO: habilitar filtro por mês quando suportado pelo backend. -->
          <!-- Mês -->
          <!-- <div class="col-6">
        <GlobalSelect
          v-model="filters.month"
          label="Mês"
          map-options
          emit-value
          :options="monthOptions"
        />
      </div> -->
        </div>
      </q-card>
    </div>

    <!-- LISTA -->
    <div class="q-pa-md q-gutter-md">
      <TransactionCard
        v-for="item in transactions"
        :key="item.id"
        :item="item"
        @click="handleClick(item)"
      />

      <!-- PAGINAÇÃO -->
      <q-pagination v-model="page" :max="maxPages" max-pages="5" />
    </div>
  </q-page>
</template>

<script setup>
  /* COMPONENTS */
  import GlobalSelect from 'src/components/ui/GlobalSelect.vue'
  import TransactionCard from 'src/components/transactions/TransactionCard.vue'

  /* VUE */
  import { computed, onMounted, ref, watch } from 'vue'

  /* STORES */
  import { useConfraStore } from 'src/stores/confra'
  import { usePlayerStore } from 'src/stores/player'
  import { useRankNavigator } from 'src/composables/navigation'
  import { useTransactionStore } from 'src/stores/transaction'
  import { useTransactionTypeStore } from 'src/stores/transactionType'

  /* NAVIGATION */
  import { useWalletNavigator } from 'src/composables/navigation'

  /* NAVIGATION */
  const { goToRankEvent, goToRankEventPlayer } = useRankNavigator()
  const { goToEditTransaction } = useWalletNavigator()

  /* STORES */
  const confraStore = useConfraStore()
  const playerStore = usePlayerStore()
  const transactionStore = useTransactionStore()
  const transactionTypeStore = useTransactionTypeStore()

  /* COMPUTED */
  const confra = computed(() => confraStore.selectedConfra)
  const players = computed(() => playerStore.players)
  const transactions = computed(() => transactionStore.transactions.content ?? [])
  const types = computed(() => transactionTypeStore.types)

  /* FILTERS */
  const filters = ref({
    idPlayer: null,
    idType: null
    // month: null
  })

  /* PAGINATION */
  const page = ref(1)
  const perPage = 10
  const maxPages = computed(() => transactionStore.transactions?.totalPages || 1)

  /* LIFECYCLE */
  onMounted(async () => {
    await playerStore.getPlayers()
    await load()
  })

  watch(page, load)

  watch(
    filters,
    () => {
      if (page.value !== 1) {
        page.value = 1
      } else {
        load()
      }
    },
    { deep: true }
  )

  /* FUNCTIONS */
  async function load() {
    await transactionStore.getTransactionsPage({
      idGathering: confra.value.id,
      idPlayer: filters.value.idPlayer,
      idTransactionType: filters.value.idType,
      page: page.value - 1,
      size: perPage
    })
  }

  function handleClick(item) {
    const type = item.type.id

    switch (type) {
      case 1: // INSCRIÇÃO
        goToRankEvent(item.event.id)
        break

      case 2: // RESULTADO
        goToRankEventPlayer(item.event.id, item.player.id)
        break

      case 3: // DEPÓSITO
      case 4: // SAQUE
        goToEditTransaction(item.player.id, item.id)
        break
    }
  }
</script>
