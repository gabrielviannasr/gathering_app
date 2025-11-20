<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <router-view />
    </q-page-container>

    <!-- Bottom Navigation -->
    <q-footer class="bg-white shadow-2" bordered>
      <q-tabs v-model="tab" align="justify" dense no-caps class="gathering-tabs">
        <q-tab name="home" icon="home" label="Home" />
        <q-tab name="extrato" icon="swap_vert" label="Extrato" />
        <q-tab name="carteira" icon="account_balance_wallet" label="Carteira" />
        <q-tab name="relatorios" icon="bar_chart" label="Relatórios" />
      </q-tabs>
    </q-footer>
  </q-layout>
</template>

<script setup>
  import { ref, watch } from 'vue'
  import { useRouter, useRoute } from 'vue-router'

  const router = useRouter()
  const route = useRoute()
  const tab = ref(route.name)

  watch(
    () => route.name,
    val => (tab.value = val)
  )

  // eslint-disable-next-line no-unused-vars
  function goToTab(name) {
    router.push({ name })
  }
</script>

<style scoped>
  /* Cor dos ícones/texto */
  .gathering-tabs .q-tab {
    color: #d8dee6 !important; /* inativo */
  }

  .gathering-tabs .q-tab--active {
    color: #7f00ff !important; /* ativo */
  }

  /* Hover → preto */
  .gathering-tabs .q-tab:not(.q-tab--active):hover {
    color: #000000 !important;
  }
</style>
