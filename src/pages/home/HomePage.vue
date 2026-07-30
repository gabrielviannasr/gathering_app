<template>
  <q-page class="home-page">
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
        subtitle="Evento"
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
        @click="goToRules"
      />
    </div>
  </q-page>
</template>

<script setup>
  /* COMPOSABLES */
  import { useEventNavigator } from 'src/composables/navigation'
  import { useFormatNavigator } from 'src/composables/navigation'
  import { useGatheringNavigator } from 'src/composables/navigation'
  import { usePlayerNavigator } from 'src/composables/navigation'
  import { useRankNavigator } from 'src/composables/navigation'
  import { useRoundNavigator } from 'src/composables/navigation'
  import { useRuleNavigator } from 'src/composables/navigation'

  /* COMPONENTS */
  import CardItem from 'src/components/CardItem.vue'

  /* COMPOSABLES */
  const { goToEvents } = useEventNavigator()
  const { goToFormats } = useFormatNavigator()
  const { goToGatherings } = useGatheringNavigator()
  const { goToPlayers } = usePlayerNavigator()
  const { goToRankEvents } = useRankNavigator()
  const { goToRoundEvents } = useRoundNavigator()
  const { goToRules } = useRuleNavigator()
</script>
