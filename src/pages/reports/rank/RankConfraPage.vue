<template>
  <q-page class="page-bg">
    <!-- CARD DA CONFRA -->
    <div class="q-pa-md">
      <ConfraHeaderCard :confraSummary="confraSummary" />
    </div>

    <!-- CARD FILTRO -->
    <div class="q-pa-md">
      <q-card class="q-pa-md form-card">
        <div class="form-section-title">Filtros</div>

        <GlobalInput
          label="Buscar por nome do jogador..."
          v-model="filters.search"
          placeholder="Digite o nome..."
        >
          <template #prepend>
            <q-icon name="search" />
          </template>
        </GlobalInput>
      </q-card>
    </div>

    <!-- LISTA -->
    <div class="q-pa-md q-gutter-md">
      <RankListItem
        v-for="item in filteredRank"
        :key="item.rank + '-' + item.idPlayer"
        :item="item"
        @select="openRankPlayer"
      />

      <!-- PAGINAÇÃO -->
      <div class="q-mt-md">
        <q-pagination v-model="page" :max="maxPages" max-pages="5" />
      </div>
    </div>
  </q-page>
</template>

<script setup>
  import { ref, computed } from 'vue'
  import { useRoute } from 'vue-router'

  import GlobalInput from 'src/components/ui/GlobalInput.vue'
  import RankListItem from 'src/components/rank/RankListItem.vue'
  import ConfraHeaderCard from 'src/components/confras/ConfraHeaderCard.vue'

  import { useConfraStore } from 'src/stores/confra'
  import { usePlayerStore } from 'src/stores/player'
  import { useRankConfraStore } from 'src/stores/rankConfra'
  import { useRankNavigator } from 'src/composables/navigation'

  /* ROUTES */
  const route = useRoute()
  const idGathering = Number(route.params.idGathering)

  /* STORES */
  const confraStore = useConfraStore()
  // eslint-disable-next-line no-unused-vars
  const playerStore = usePlayerStore()
  const rankConfraStore = useRankConfraStore()
  const { goToRankPlayerConfra } = useRankNavigator()

  /* CONFRA CARD */
  const confraSummary = computed(() => confraStore.getConfraSummary(idGathering))

  /* RANK CONFRA */
  const rank = computed(() => rankConfraStore.getRankByGathering(idGathering))

  /* FILTRO */
  const filters = ref({ search: '' })

  const filteredRank = computed(() => {
    const q = filters.value.search.toLowerCase()
    return rank.value.filter(r => r.playerName.toLowerCase().includes(q))
  })

  /* PAGINAÇÃO */
  const page = ref(1)
  const maxPages = 1

  /* NAVEGAÇÃO */
  function openRankPlayer(item) {
    goToRankPlayerConfra(idGathering, item.idPlayer)
  }
</script>
