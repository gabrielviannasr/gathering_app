<template>
  <q-page class="page-bg">
    <!-- CARD DA CONFRA -->
    <div class="q-pa-md">
      <ConfraHeaderCard :confraSummary="confraSummary" />
    </div>

    <!-- CARD DOS POTES -->
    <div class="q-pa-md">
      <ConfraBodyCard :confraSummary="confraSummary" />
    </div>
  </q-page>
</template>

<script setup>
  import { computed } from 'vue'
  import { useRoute } from 'vue-router'

  import ConfraBodyCard from 'src/components/confras/ConfraBodyCard.vue'
  import ConfraHeaderCard from 'src/components/confras/ConfraHeaderCard.vue'

  import { useConfraStore } from 'src/stores/confra'
  import { usePlayerStore } from 'src/stores/player'

  /* ROUTES */
  const route = useRoute()
  const idGathering = Number(route.params.id)

  /* STORES */
  const confraStore = useConfraStore()
  // eslint-disable-next-line no-unused-vars
  const playerStore = usePlayerStore()

  /* CONFRA CARD */
  const confraSummary = computed(() => confraStore.getConfraSummary(idGathering))
</script>
