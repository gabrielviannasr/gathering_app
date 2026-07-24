<template>
  <q-page class="page-bg" v-if="confraSummary">
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
          v-model="filters.name"
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
        v-for="item in filteredResults"
        :key="item.idPlayer"
        :item="item"
        @select="openRankPlayer(item)"
      />

      <!-- PAGINAÇÃO -->
      <!-- <div class="q-mt-md">
        <q-pagination v-model="page" :max="maxPages" max-pages="5" />
      </div> -->
    </div>
  </q-page>
</template>

<script setup>
  import GlobalInput from 'src/components/ui/GlobalInput.vue'

  import RankListItem from 'src/components/rank/RankListItem.vue'
  import ConfraHeaderCard from 'src/components/confras/ConfraHeaderCard.vue'

  /* VUE + PINIA */
  import { computed, onMounted, ref } from 'vue'
  import { useRoute, useRouter } from 'vue-router'

  import { useDashboardStore } from 'src/stores/dashboard'
  import { useRankNavigator } from 'src/composables/navigation'

  /* NAVIGATION */
  const { goToRankConfraPlayer } = useRankNavigator()

  const route = useRoute()
  const router = useRouter()
  const idGathering = Number(route.params.idGathering)

  /* STORES */
  const dashboardStore = useDashboardStore()

  /* COMPUTED */
  const confraSummary = computed(() => dashboardStore.confraSummary)
  const results = computed(() => dashboardStore.confraResults)

  /* FILTERS */
  const filters = ref({ name: '' })

  const filteredResults = computed(() => {
    const name = filters.value.name.trim().toLowerCase()

    if (!name) {
      return results.value
    }

    return results.value.filter(item => item.player.name.toLowerCase().includes(name))
  })

  /* PAGINAÇÃO */
  // const page = ref(1)
  // const maxPages = 1

  /* ---------------- LOAD ---------------- */
  onMounted(async () => {
    await dashboardStore.getConfraSummary(idGathering)
    await load()

    if (!confraSummary.value) {
      console.warn('CONFRA NOT FOUND:', idGathering)
      router.back()
      return
    }
  })

  async function load() {
    await dashboardStore.getConfraResults(idGathering)
  }

  function openRankPlayer(item) {
    goToRankConfraPlayer(idGathering, item.idPlayer)
  }
</script>
