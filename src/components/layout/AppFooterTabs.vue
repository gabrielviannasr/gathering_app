<template>
  <q-footer class="bg-white shadow-2" bordered>
    <PageWrapper>
      <q-tabs
        v-model="activeTab"
        align="justify"
        dense
        no-caps
        class="gathering-tabs"
        @update:model-value="goToTab"
      >
        <q-tab name="home" icon="home" label="Home" />
        <q-tab name="extrato" icon="swap_vert" label="Extrato" />
        <q-tab name="carteira-jogadores" icon="account_balance_wallet" label="Carteira" />
        <q-tab name="relatorios" icon="bar_chart" label="Relatórios" />
      </q-tabs>
    </PageWrapper>
  </q-footer>
</template>

<script setup>
  import PageWrapper from './PageWrapper.vue'
  import { useRouter } from 'vue-router'
  import { useTabStore } from 'src/stores/tabs'
  import { storeToRefs } from 'pinia'

  const router = useRouter()

  const tabStore = useTabStore()
  const { activeTab } = storeToRefs(tabStore)

  function goToTab(tab) {
    tabStore.setTab(tab)
    router.push({ name: tab })
  }
</script>

<style scoped>
  /* ================================
   BOTTOM NAVIGATION COLORS
   ================================ */

  /* Cor dos itens inativos (ícone + texto) */
  .gathering-tabs .q-tab {
    color: #a0afc3 !important;
  }

  /* Cor dos itens ativos (ícone + texto) */
  .gathering-tabs .q-tab--active {
    color: #7f00ff !important;
  }

  /* Hover dos itens inativos */
  .gathering-tabs .q-tab:not(.q-tab--active):hover {
    color: #000000 !important;
  }

  /* Safe Area do Android */
  .q-footer {
    padding-bottom: env(safe-area-inset-bottom);
  }
</style>
