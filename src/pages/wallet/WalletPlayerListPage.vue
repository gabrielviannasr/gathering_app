<template>
  <q-page class="page-bg">
    <!-- CARD DA CONFRA -->
    <div class="q-pa-md" v-if="gatheringSummary">
      <GatheringSummaryCard :gatheringSummary="gatheringSummary" />
    </div>

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
  </q-page>
</template>

<script setup>
  /* COMPONENTS */
  import GatheringSummaryCard from 'src/components/gatherings/GatheringSummaryCard.vue'
  import GlobalInput from 'src/components/ui/GlobalInput.vue'
  import WalletCard from 'src/components/wallet/WalletCard.vue'

  /* VUE */
  import { computed, onMounted, ref } from 'vue'

  /* STORES */
  import { useGatheringStore } from 'src/stores/gathering'
  import { useDashboardStore } from 'src/stores/dashboard'

  /* NAVIGATION */
  import { useWalletNavigator } from 'src/composables/navigation'

  /* NAVIGATION */
  const { goToWallet } = useWalletNavigator()

  /* STORES */
  const gatheringStore = useGatheringStore()
  const dashboardStore = useDashboardStore()

  /* COMPUTED */
  const gathering = computed(() => gatheringStore.gatheringSelected || null)
  const gatheringSummary = computed(() => dashboardStore.gatheringSummary)
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
    await dashboardStore.getGatheringSummary(gathering.value.id)
    await dashboardStore.getWallets(gathering.value.id)
  }

  function openWallet(wallet) {
    goToWallet(wallet.player.id)
  }
</script>
