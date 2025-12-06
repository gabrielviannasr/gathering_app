<template>
  <q-page class="home-page">
    <div class="cards-grid q-pa-md">
      <CardItem
        icon="savings"
        title="Potes"
        subtitle="Resumo"
        color="#A259FF"
        @click="goToPotsReport"
      />

      <CardItem
        icon="military_tech"
        title="Vitórias"
        subtitle="Winrate"
        color="#2979FF"
        @click="goToWinsReport"
      />

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

  import { useConfraStore } from 'src/stores/confra'
  import { useRankNavigator } from 'src/composables/navigation'

  const confraStore = useConfraStore()
  const { goToRankConfra } = useRankNavigator()

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
    const id = confraStore.selectedConfra?.id
    if (!id) {
      console.warn('Nenhuma confra selecionada.')
      return
    }
    goToRankConfra(id)
  }
</script>
