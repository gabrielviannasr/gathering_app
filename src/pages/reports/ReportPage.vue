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
  /* STORES */
  import { useGatheringStore } from 'src/stores/gathering'

  /* COMPOSABLES */
  import { useGatheringNavigator } from 'src/composables/navigation'
  import { useRankNavigator } from 'src/composables/navigation'

  /* COMPONENTS */
  import CardItem from 'src/components/CardItem.vue'

  /* COMPOSABLES */
  const { goToGatheringFormats, goToGatheringPots, goToGatheringWinrate } = useGatheringNavigator()
  const { goToRankGathering } = useRankNavigator()

  /* STORES */
  const gatheringStore = useGatheringStore()

  /* FUNCTIONS */
  function goToPotsReport() {
    const id = gatheringStore.gatheringSelected?.id
    if (!id) {
      console.warn('Nenhuma confra selecionada.')
      return
    }
    goToGatheringPots(id)
  }

  function goToFormatsReport() {
    const id = gatheringStore.gatheringSelected?.id
    if (!id) {
      console.warn('Nenhuma confra selecionada.')
      return
    }
    goToGatheringFormats(id)
  }

  function goToWinsReport() {
    const id = gatheringStore.gatheringSelected?.id
    if (!id) {
      console.warn('Nenhuma confra selecionada.')
      return
    }
    goToGatheringWinrate(id)
  }

  function goToRankReport() {
    const id = gatheringStore.gatheringSelected?.id
    if (!id) {
      console.warn('Nenhuma confra selecionada.')
      return
    }
    goToRankGathering(id)
  }
</script>
