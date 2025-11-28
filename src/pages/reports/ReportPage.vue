<template>
  <q-page class="home-page">
    <div class="cards-grid q-pa-md">
      <!-- CARD: POTES -->
      <CardItem
        icon="savings"
        title="Potes"
        subtitle="Resumo"
        color="#A259FF"
        @click="goToPotsReport"
      />

      <!-- CARD: VITÓRIAS WINRATE -->
      <CardItem
        icon="military_tech"
        title="Vitórias"
        subtitle="Winrate"
        color="#2979FF"
        @click="goToWinsReport"
      />

      <!-- CARD: FORMATOS MAIS JOGADOS -->
      <CardItem
        icon="style"
        title="Formatos"
        subtitle="Mais Jogados"
        color="#00BCD4"
        @click="goToFormatsReport"
      />

      <CardItem
        icon="emoji_events"
        title="Rank"
        subtitle="Confra"
        color="#FFC107"
        @click="goToRankReport"
      />
    </div>
  </q-page>
</template>

<script setup>
  import CardItem from 'src/components/CardItem.vue'
  import { useRouter } from 'vue-router'

  // No futuro pode virar navegação própria
  // eslint-disable-next-line no-unused-vars
  const router = useRouter()

  function goToPotsReport() {
    console.log('Ir para relatório de potes')
    // router.push({ name: 'report-potes' })
  }

  function goToFormatsReport() {
    console.log('Ir para relatório de formatos')
    // router.push({ name: 'report-formatos' })
  }

  function goToWinsReport() {
    console.log('Ir para relatório de vitórias')
    // router.push({ name: 'report-vitorias' })
  }

  function goToRankReport() {
    console.log('Ira para o rank da confra')
    // router.push({ name: 'report-rank' })
  }
</script>
