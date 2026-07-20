<template>
  <q-page class="page-bg" v-if="confraSummary">
    <!-- CARD DA CONFRA -->
    <div class="q-pa-md">
      <ConfraHeaderCard :confraSummary="confraSummary" />
    </div>

    <!-- CARD DOS POTES -->
    <div class="q-pa-md">
      <ConfraBodyCard :confraSummary="confraSummary" />
    </div>

    <!-- LISTA DE EVENTOS -->
    <div class="q-pa-md q-gutter-md">
      <EventCard
        v-for="item in events"
        :key="item.id"
        :event="item"
        showPots
        @open="openEvent(item)"
      />
    </div>
  </q-page>
</template>

<script setup>
  import ConfraBodyCard from 'src/components/confras/ConfraBodyCard.vue'
  import ConfraHeaderCard from 'src/components/confras/ConfraHeaderCard.vue'
  import EventCard from 'src/components/events/EventCard.vue'

  import { computed, onMounted } from 'vue'
  import { useRoute } from 'vue-router'

  import { useRoundNavigator } from 'src/composables/navigation'
  import { useDashboardStore } from 'src/stores/dashboard'
  import { useEventStore } from 'src/stores/event'

  /* NAVIGATION */
  const { goToRounds } = useRoundNavigator()

  const route = useRoute()
  const idGathering = Number(route.params.id)

  /* STORES */
  const dashboardStore = useDashboardStore()
  const eventStore = useEventStore()

  /* DATA */
  const confraSummary = computed(() => dashboardStore.confraSummary)
  const events = computed(() => eventStore.events)

  /* ---------------- LOAD ---------------- */
  onMounted(async () => {
    await load()
  })

  async function load() {
    await dashboardStore.getConfraSummary(idGathering)
    await eventStore.getEvents({ idGathering: idGathering })
  }

  function openEvent(event) {
    goToRounds(event.id)
  }
</script>
