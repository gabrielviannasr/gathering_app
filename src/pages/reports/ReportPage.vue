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
  import { useConfraNavigator } from 'src/composables/navigation'
  import { useRankNavigator } from 'src/composables/navigation'

  const confraStore = useConfraStore()
  const { goToConfraPots, goToConfraFormats } = useConfraNavigator()
  const { goToRankConfra, goToConfraWinrate } = useRankNavigator()

  // No futuro pode virar navegação própria
  // eslint-disable-next-line no-unused-vars
  const router = useRouter()

  function goToPotsReport() {
    const id = confraStore.selectedConfra?.id
    if (!id) {
      console.warn('Nenhuma confra selecionada.')
      return
    }
    goToConfraPots(id)
  }

  function goToFormatsReport() {
    const id = confraStore.selectedConfra?.id
    if (!id) {
      console.warn('Nenhuma confra selecionada.')
      return
    }
    goToConfraFormats(id)
  }

  function goToWinsReport() {
    const id = confraStore.selectedConfra?.id
    if (!id) {
      console.warn('Nenhuma confra selecionada.')
      return
    }
    goToConfraWinrate(id)
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
