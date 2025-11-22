<template>
  <q-layout view="lHh Lpr lFf" class="inner-layout">
    <!-- HEADER PADRÃO (alinhado à esquerda) -->
    <div class="inner-header">
      <div class="inner-header-top q-pa-sm">
        <q-btn flat round dense icon="arrow_back" class="btn-back" @click="goBack" />
      </div>

      <div class="inner-header-body q-pa-md">
        <div class="title">{{ pageTitle }}</div>
        <div class="subtitle">{{ confraSubtitle }}</div>
      </div>
    </div>

    <q-page-container>
      <PageWrapper>
        <router-view />
      </PageWrapper>
    </q-page-container>
  </q-layout>
</template>

<script setup>
  import PageWrapper from 'src/components/layout/PageWrapper.vue'
  import { useRoute, useRouter } from 'vue-router'
  import { computed } from 'vue'
  import { useConfraStore } from 'src/stores/confra'

  const route = useRoute()
  const router = useRouter()
  const confra = useConfraStore()

  const pageTitle = computed(() => route.meta?.title || '')
  const confraSubtitle = computed(() => `${confra.year} - ${confra.name}`)

  function goBack() {
    router.back()
  }
</script>

<style scoped>
  /* Header gradient (same as Home) */
  .inner-header {
    background: linear-gradient(135deg, #7f00ff, #3c6ef3);
    color: white;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
    padding-bottom: 8px;
  }

  /* top row with back button */
  .inner-header-top {
    padding-top: 12px;
  }

  /* title left aligned */
  .inner-header-body {
    padding-left: 16px;
    padding-right: 16px;
    padding-bottom: 18px;
  }

  .title {
    font-size: 26px;
    font-weight: 700;
    line-height: 1;
  }

  .subtitle {
    font-size: 14px;
    opacity: 0.95;
    margin-top: 6px;
  }

  /* back button style */
  .btn-back {
    color: white;
  }

  /* page container below header */
  .q-page-container {
    background: #f4f7fa;
    min-height: calc(100vh - 140px);
  }
</style>
