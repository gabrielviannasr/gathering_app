<template>
  <!-- ===== FILTROS ===== -->
  <div class="q-pa-md">
    <q-card class="q-pa-md form-card">
      <!-- Title -->
      <div class="form-section-title">Filtros</div>

      <div class="row q-col-gutter-sm q-mt-sm">
        <!-- Nome -->
        <div class="col">
          <GlobalInput label="Nome" v-model="filters.name" debounce="300">
            <template #prepend>
              <q-icon name="search" />
            </template>
          </GlobalInput>
        </div>
      </div>
    </q-card>
  </div>

  <div class="q-pa-md q-gutter-md">
    <WalletCard
      v-for="wallet in filteredResults"
      :key="wallet.idPlayer"
      :wallet="wallet"
      @select="openWallet(wallet)"
    />
  </div>
</template>

<script setup>
  import GlobalInput from 'src/components/ui/GlobalInput.vue'
  import WalletCard from 'src/components/wallet/WalletCard.vue'

  /* VUE + PINIA */
  import { computed, onMounted, ref } from 'vue'

  import { useConfraStore } from 'src/stores/confra'
  import { useDashboardStore } from 'src/stores/dashboard'
  import { usePlayerStore } from 'src/stores/player'

  import { useWalletNavigator } from 'src/composables/navigation'

  /* NAVIGATION */
  const { goToWallet } = useWalletNavigator()

  /* STORES */
  const confraStore = useConfraStore()
  const dashboardStore = useDashboardStore()
  const playerStore = usePlayerStore()

  /* DATA */
  const confra = computed(() => confraStore.selectedConfra || null)
  // eslint-disable-next-line no-unused-vars
  const players = computed(() => playerStore.players || [])
  const wallets = computed(() => dashboardStore.wallets || [])

  /* FILTERS */
  const filters = ref({ name: '' })

  const filteredResults = computed(() => {
    const name = filters.value.name.trim().toLowerCase()

    if (!name) {
      return wallets.value
    }

    return wallets.value.filter(item => item.player.name.toLowerCase().includes(name))
  })

  /* ---------------- LOAD ---------------- */
  onMounted(async () => {
    await load()
  })

  async function load() {
    await playerStore.getPlayers({ idGathering: confra.value?.id })
    await dashboardStore.getWallets(confra.value.id)
  }

  function openWallet(wallet) {
    goToWallet(wallet.player.id)
  }
</script>
