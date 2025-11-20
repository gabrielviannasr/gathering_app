<template>
  <q-page>
    <!-- HEADER -->
    <div class="header-container column flex flex-center">
      <div class="text-h4 text-bold">DIRETORIA</div>
      <div class="text-subtitle1 q-mt-xs">2025</div>

      <q-btn class="confra-btn q-mt-md" no-caps rounded unelevated @click="openConfraPopup">
        Selecionar Confra
      </q-btn>
    </div>

    <!-- GRID DE CARDS -->
    <div class="q-pa-md cards-grid">
      <CardItem icon="groups" title="Confras" subtitle="Gerenciar" color="#A259FF" />
      <CardItem icon="event" title="Eventos" subtitle="Gerenciar" color="#2979FF" />

      <CardItem icon="layers" title="Rodadas" subtitle="Gerenciar" color="#00BCD4" />
      <CardItem icon="emoji_events" title="Rank" subtitle="Classificação" color="#FFC107" />

      <CardItem icon="group" title="Jogadores" subtitle="Gerenciar" color="#4CAF50" />
      <CardItem icon="style" title="Formatos" subtitle="Modos de Jogo" color="#FF5252" />

      <CardItem icon="list" title="Regras" subtitle="Como Funciona" color="#A259FF" />
    </div>

    <!-- POPUP -->
    <q-dialog v-model="confraPopup">
      <q-card class="q-pa-md" style="min-width: 260px">
        <div class="text-h6 text-center q-mb-md">Selecionar Confra</div>

        <q-list separator bordered>
          <q-item clickable v-for="year in confras" :key="year" @click="selectConfra(year)">
            <q-item-section>DIRETORIA - {{ year }}</q-item-section>
          </q-item>
        </q-list>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
  import { ref } from 'vue'
  import CardItem from 'src/components/CardItem.vue'

  const confraPopup = ref(false)
  const confras = [2025, 2024, 2023]

  function openConfraPopup() {
    confraPopup.value = true
  }

  function selectConfra(year) {
    console.log('Confra selecionada:', year)
    confraPopup.value = false
  }
</script>

<style scoped>
  .header-container {
    height: 220px;
    text-align: center;
    color: white;
    padding-top: 20px;
    background: linear-gradient(135deg, #7f00ff, #3c6ef3);
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
  }

  /* Botão Selecionar Confra */
  .confra-btn {
    background: linear-gradient(135deg, #7f00ff, #3c6ef3);
    padding: 6px 20px;
    font-size: 0.85rem;
    border-radius: 30px;
    color: white;
  }

  /* GRID */
  .cards-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 14px;
  }

  /* Responsividade */
  @media (max-width: 400px) {
    .cards-grid {
      grid-template-columns: 1fr 1fr;
    }
  }
</style>
