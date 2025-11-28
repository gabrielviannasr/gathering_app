<template>
  <q-page class="home-page">
    <div class="cards-grid q-pa-md">
      <!-- CARD: POTES -->
      <CardItem
        icon="savings"
        title="Potes"
        subtitle="Resumo"
        color="#7F00FF"
        @click="goToPotsReport"
      />

      <!-- CARD: FORMATOS MAIS JOGADOS -->
      <CardItem
        icon="style"
        title="Formatos"
        subtitle="Mais Jogados"
        color="#00BCD4"
        @click="goToFormatsReport"
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
</script>
