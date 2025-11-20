<template>
  <q-layout view="lHh Lpr lFf">
    <!-- Header -->
    <div class="header-container text-white flex flex-center column">
      <div class="text-h5 font-bold">DIRETORIA</div>
      <div class="text-subtitle2">2025</div>
      <q-btn class="q-mt-md" color="white" text-color="primary" unelevated @click="openConfraPopup">
        Selecionar Confra
      </q-btn>
    </div>

    <q-page padding class="bg-grey-2">
      <div class="q-gutter-md q-pa-md grid grid-cols-2">
        <CardItem icon="people" title="Confras" subtitle="Gerenciar" />
        <CardItem icon="event" title="Eventos" subtitle="Gerenciar" />
        <CardItem icon="layers" title="Rodadas" subtitle="Gerenciar" />
        <CardItem icon="emoji_events" title="Rank" subtitle="Classificação" />
        <CardItem icon="group" title="Jogadores" subtitle="Gerenciar" />
        <CardItem icon="style" title="Formatos" subtitle="Modos de Jogo" />
        <CardItem icon="list" title="Regras" subtitle="Como Funciona" />
      </div>
    </q-page>

    <!-- Bottom Navigation -->
    <q-footer>
      <q-tabs v-model="tab" align="justify" dense active-color="primary">
        <q-tab name="home" icon="home" label="Home" />
        <q-tab name="extrato" icon="swap_vert" label="Extrato" />
        <q-tab name="carteira" icon="account_balance_wallet" label="Carteira" />
        <q-tab name="relatorios" icon="bar_chart" label="Relatórios" />
      </q-tabs>
    </q-footer>

    <!-- Popup Confra Selection -->
    <q-dialog v-model="confraPopup">
      <q-card class="q-pa-md">
        <div class="text-h6 text-center q-mb-md">Selecionar Confra</div>
        <q-list bordered separator>
          <q-item clickable v-for="year in confras" :key="year" @click="selectConfra(year)">
            <q-item-section> DIRETORIA - {{ year }} </q-item-section>
          </q-item>
        </q-list>
      </q-card>
    </q-dialog>
  </q-layout>
</template>

<script setup>
  import { ref } from 'vue'
  import CardItem from 'src/components/CardItem.vue'

  const tab = ref('home')
  const confraPopup = ref(false)
  const confras = [2025, 2024, 2023]

  function openConfraPopup() {
    confraPopup.value = true
  }

  function selectConfra(year) {
    // TODO: Integrar com store global para atualizar confra selecionada
    console.log('Confra selecionada:', year)
    confraPopup.value = false
  }
</script>

<style scoped>
  .header-container {
    height: 200px;
    background: linear-gradient(135deg, #7f00ff, #3c6ef3);
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
  }
  .grid {
    display: grid;
    gap: 16px;
  }
</style>
