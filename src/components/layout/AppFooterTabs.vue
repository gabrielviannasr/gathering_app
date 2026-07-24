<template>
  <q-footer class="shadow-2" bordered>
    <PageWrapper>
      <q-tabs
        v-model="activeTab"
        align="justify"
        dense
        no-caps
        class="gathering-tabs"
        @update:model-value="goToTab"
      >
        <q-tab :name="ROUTES.HOME" icon="home" label="Home" />
        <q-tab :name="ROUTES.EXTRATO" icon="swap_vert" label="Extrato" />
        <q-tab :name="ROUTES.CARTEIRA" icon="account_balance_wallet" label="Carteira" />
        <q-tab :name="ROUTES.RELATORIOS" icon="bar_chart" label="Relatórios" />
      </q-tabs>
    </PageWrapper>
  </q-footer>
</template>

<script setup>
  import { ROUTES } from 'src/router/routes.enum'
  import PageWrapper from './PageWrapper.vue'
  import { useRoute, useRouter } from 'vue-router'
  import { useTabStore } from 'src/stores/tabs'
  import { storeToRefs } from 'pinia'
  import { watch } from 'vue'

  const route = useRoute()
  const router = useRouter()

  const tabStore = useTabStore()
  const { activeTab } = storeToRefs(tabStore)

  function goToTab(tab) {
    tabStore.setTab(tab)
    router.push({ name: tab })
  }

  // Observa mudanças da rota e ajusta a tab ativa
  watch(
    () => route.name,
    newName => {
      if (!newName) return

      // Se a rota atual existe entre as tabs, sincroniza
      const validTabs = [ROUTES.HOME, ROUTES.EXTRATO, ROUTES.CARTEIRA, ROUTES.RELATORIOS]

      if (validTabs.includes(newName)) {
        tabStore.setTab(newName)
      }
    },
    { immediate: true }
  )
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
</style>
