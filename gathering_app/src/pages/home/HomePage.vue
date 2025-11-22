<template>
  <q-page class="home-page">
    <!-- HEADER -->
    <div class="header">
      <div class="text-h4 text-bold">DIRETORIA</div>
      <div class="text-subtitle1">2025</div>

      <q-btn class="confra-btn q-mt-md" no-caps rounded unelevated @click="openConfraPopup">
        Selecionar confra
      </q-btn>
    </div>

    <!-- CARDS -->
    <div class="cards-grid q-pa-md">
      <CardItem
        icon="groups"
        title="Confras"
        subtitle="Gerenciar"
        color="#A259FF"
        @click="$router.push({ name: 'confras' })"
      />

      <CardItem
        icon="event"
        title="Eventos"
        subtitle="Gerenciar"
        color="#2979FF"
        @click="$router.push({ name: 'eventos' })"
      />

      <CardItem
        icon="layers"
        title="Rodadas"
        subtitle="Gerenciar"
        color="#00BCD4"
        @click="$router.push({ name: 'rodadas-eventos' })"
      />

      <CardItem
        icon="emoji_events"
        title="Rank"
        subtitle="Classificação"
        color="#FFC107"
        @click="goToRankEvents"
      />

      <CardItem
        icon="group"
        title="Jogadores"
        subtitle="Gerenciar"
        color="#4CAF50"
        @click="goToPlayers"
      />

      <CardItem
        icon="style"
        title="Formatos"
        subtitle="Modos de Jogo"
        color="#FF5252"
        @click="goToFormats"
      />

      <CardItem
        icon="list"
        title="Regras"
        subtitle="Como Funciona"
        color="#A259FF"
        @click="console.log('Página de regras ainda não criada')"
      />
    </div>

    <!-- POPUP -->
    <q-dialog v-model="confraPopup">
      <q-card class="q-pa-md" style="min-width: 260px">
        <div class="text-h6 text-center q-mb-md">Selecionar Confra</div>

        <q-list bordered separator>
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
  import { useFormatNavigator } from 'src/composables/navigation/useFormatNavigator'
  import { usePlayerNavigator } from 'src/composables/navigation/usePlayerNavigator'
  import { useRankNavigator } from 'src/composables/navigation/useRankNavigator'

  const { goToPlayers } = usePlayerNavigator()
  const { goToRankEvents } = useRankNavigator()
  const { goToFormats } = useFormatNavigator()

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
  .home-page {
    background: #f4f7fa;
    min-height: 100vh;
  }

  /* Header */
  .header {
    height: 220px;
    background: linear-gradient(135deg, #7f00ff, #3c6ef3);
    color: white;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    text-align: center;
    padding-top: 10px;
  }

  /* Botão Selecionar Confra */
  .confra-btn {
    background: linear-gradient(135deg, #894efb, #6861fb);
    padding: 6px 20px;
    font-size: 0.85rem;
    color: white;
    border-radius: 30px;
  }

  /* GRID - 2 colunas */
  .cards-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 14px;
  }

  /* Ajuste para telas pequenas (iPhones menores) */
  @media (max-width: 370px) {
    .cards-grid {
      gap: 10px;
    }
  }
</style>
