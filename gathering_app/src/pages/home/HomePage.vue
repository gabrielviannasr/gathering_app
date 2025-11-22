<template>
  <q-page class="home-page">
    <!-- HEADER -->
    <HomeHeader />

    <PageWrapper>
      <!-- CARDS -->
      <div class="cards-grid q-pa-md">
        <CardItem
          icon="groups"
          title="Confras"
          subtitle="Gerenciar"
          color="#A259FF"
          @click="goToGatherings"
        />

        <CardItem
          icon="event"
          title="Eventos"
          subtitle="Gerenciar"
          color="#2979FF"
          @click="goToEvents"
        />

        <CardItem
          icon="layers"
          title="Rodadas"
          subtitle="Gerenciar"
          color="#00BCD4"
          @click="goToRoundEvents"
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
    </PageWrapper>
  </q-page>
</template>

<script setup>
  import HomeHeader from 'src/components/home/HomeHeader.vue'
  import PageWrapper from 'src/components/layout/PageWrapper.vue'
  import CardItem from 'src/components/CardItem.vue'
  import { useEventNavigator } from 'src/composables/navigation'
  import { useFormatNavigator } from 'src/composables/navigation'
  import { useGatheringNavigator } from 'src/composables/navigation'
  import { usePlayerNavigator } from 'src/composables/navigation'
  import { useRankNavigator } from 'src/composables/navigation'
  import { useRoundNavigator } from 'src/composables/navigation'

  const { goToEvents } = useEventNavigator()
  const { goToFormats } = useFormatNavigator()
  const { goToGatherings } = useGatheringNavigator()
  const { goToPlayers } = usePlayerNavigator()
  const { goToRankEvents } = useRankNavigator()
  const { goToRoundEvents } = useRoundNavigator()
</script>

<style scoped>
  .home-page {
    background: #f4f7fa;
    min-height: 100vh;
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
