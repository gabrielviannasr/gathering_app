<template>
  <q-page class="page-bg">
    <div class="q-pa-md q-gutter-md">
      <PlayerListBase
        :players="players"
        :filters="filters"
        showAddButton
        :showWalletInfo="false"
        @add="onAdd"
        @select="openPlayer"
      />

      <!-- PAGINAÇÃO -->
      <div class="q-mt-md">
        <q-pagination v-model="page" :max="maxPages" max-pages="5" />
      </div>
    </div>
  </q-page>
</template>

<script setup>
  import PlayerListBase from 'src/components/players/PlayerListBase.vue'
  import { ref, computed, onMounted, watch } from 'vue'
  import { usePlayerNavigator } from 'src/composables/navigation'
  import { usePlayerStore } from 'src/stores/player'

  /* STORES */
  const playerStore = usePlayerStore()

  /* NAVIGATION */
  const { goToPlayerNew, goToPlayerEdit } = usePlayerNavigator()

  /* PLAYERS */
  const players = computed(() => playerStore.players?.content || [])

  /* PAGINATION */
  const page = ref(1)
  const perPage = 4
  const maxPages = computed(() => playerStore.players?.totalPages || 1)

  const filters = ref({ name: '' })

  /* ---------------- LOAD ---------------- */
  onMounted(load)

  watch(
    filters,
    () => {
      page.value = 1
      load()
    },
    { deep: true }
  )

  watch(page, () => {
    load()
  })

  async function load() {
    await playerStore.getPlayers({
      ...filters.value,
      page: page.value - 1,
      size: perPage
    })
  }

  function onAdd() {
    goToPlayerNew()
  }

  function openPlayer(player) {
    goToPlayerEdit(player.id)
  }
</script>
