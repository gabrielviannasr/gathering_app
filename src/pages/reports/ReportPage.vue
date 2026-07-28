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

  import { useGatheringStore } from 'src/stores/gathering'
  import { useGatheringNavigator } from 'src/composables/navigation'
  import { useRankNavigator } from 'src/composables/navigation'

  const gatheringStore = useGatheringStore()
  const { goToGatheringFormats, goToGatheringPots, goToGatheringWinrate } = useGatheringNavigator()
  const { goToRankGathering } = useRankNavigator()

  // No futuro pode virar navegação própria
  // eslint-disable-next-line no-unused-vars
  const router = useRouter()

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
