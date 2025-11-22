<template>
  <div class="default-header">
    <!-- Linha com botão voltar -->
    <div class="header-top q-pa-sm">
      <q-btn flat round dense icon="arrow_back" class="btn-back" @click="goBack" />
    </div>

    <!-- Título + Subtítulo -->
    <div class="header-body q-pa-md">
      <div class="title">{{ pageTitle }}</div>
      <div class="subtitle" v-if="pageSubtitle">{{ pageSubtitle }}</div>
      <div class="subtitle">{{ selectedConfra.year }} - {{ selectedConfra.name }}</div>
    </div>
  </div>
</template>

<script setup>
  import { useRoute, useRouter } from 'vue-router'
  import { computed } from 'vue'
  import { useConfraStore } from 'src/stores/confra'
  import { storeToRefs } from 'pinia'

  /* Router hooks */
  const route = useRoute()
  const router = useRouter()

  /* Confra Store */
  const confraStore = useConfraStore()
  const { selectedConfra } = storeToRefs(confraStore)

  /* Título vindo das rotas */
  const pageTitle = computed(() => route.meta?.title || '')

  /* Subtítulo vindo das rotas */
  const pageSubtitle = computed(() => route.meta?.subtitle || '')

  /* Botão voltar */
  function goBack() {
    router.back()
  }
</script>

<style scoped>
  .default-header {
    background: linear-gradient(135deg, #7f00ff, #3c6ef3);
    color: white;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
    padding-bottom: 8px;
  }

  /* parte de cima */
  .header-top {
    padding-top: 12px;
  }

  /* corpo do header */
  .header-body {
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

  .btn-back {
    color: white;
  }
</style>
