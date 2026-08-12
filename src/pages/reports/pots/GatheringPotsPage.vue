<template>
  <q-page class="page-bg">
    <template v-if="!gatheringSummary">
      <div class="q-pa-md q-gutter-md">
        <!-- CARD NOT FOUND -->
        <EmptyStateCard type="gathering" />

        <!-- Botão Voltar -->
        <div>
          <q-btn
            push
            no-caps
            rounded
            class="full-width"
            label="Voltar"
            color="primary"
            @click="router.back()"
          />
        </div>
      </div>
    </template>

    <template v-else>
      <!-- CARD DA CONFRA -->
      <div class="q-pa-md">
        <GatheringSummaryCard :gatheringSummary="gatheringSummary" />
      </div>

      <!-- CARD DOS POTES -->
      <div class="q-pa-md">
        <PotSummaryCard :pots="gatheringSummary" />
      </div>

      <div style="position: absolute; left: -10000px; top: 0; width: 100%">
        <GatheringImage ref="gatheringRef" :gathering="gathering" :pots="gatheringSummary" />
      </div>

      <!-- BOTÕES DE AÇÃO -->
      <div class="row q-col-gutter-sm q-pa-md">
        <div class="col-12">
          <q-btn
            push
            no-caps
            rounded
            label="Compartilhar Confra"
            icon="share"
            class="add-btn full-width"
            @click="shareGathering"
          />
        </div>
      </div>

      <!-- LISTA -->
      <div class="q-pa-md q-gutter-md" v-if="events.length > 0">
        <EventCard
          v-for="event in events"
          :key="event.id"
          :event="event"
          class="list-card"
          @click="openEvent(event)"
        />
      </div>
    </template>
  </q-page>
</template>

<script setup>
  /* VUE */
  import { computed, onMounted, ref } from 'vue'
  import { useRoute, useRouter } from 'vue-router'

  /* STORES */
  import { useDashboardStore } from 'src/stores/dashboard'
  import { useEventStore } from 'src/stores/event'
  import { useGatheringStore } from 'src/stores/gathering'

  /* COMPOSABLES */
  import { useRankNavigator } from 'src/composables/navigation'

  /* COMPONENTS */
  import EmptyStateCard from 'src/components/ui/EmptyStateCard.vue'
  import EventCard from 'src/components/events/EventCard.vue'
  import GatheringImage from 'src/components/share/GatheringImage.vue'
  import GatheringSummaryCard from 'src/components/gatherings/GatheringSummaryCard.vue'
  import PotSummaryCard from 'src/components/pots/PotSummaryCard.vue'

  /* UTILITIES */
  import { dataUrlToFile, generateImage, shareImage } from 'src/utils'

  /* COMPOSABLES */
  const { goToRankEvent } = useRankNavigator()

  /* ROUTES */
  const route = useRoute()
  const router = useRouter()

  /* PARAMS */
  const idGathering = Number(route.params.id)

  /* STORES */
  const dashboardStore = useDashboardStore()
  const eventStore = useEventStore()
  const gatheringStore = useGatheringStore()

  /* COMPUTED */
  const gatheringSummary = computed(() => dashboardStore.gatheringSummary)
  const events = computed(() => eventStore.events ?? [])
  const gathering = computed(() => gatheringStore.gatheringSelected)

  const gatheringRef = ref(null)

  /* LIFECYCLE */
  onMounted(async () => {
    await load()
  })

  /* FUNCTIONS */
  async function load() {
    await dashboardStore.getGatheringSummary(idGathering)

    if (!gatheringSummary.value) {
      return
    }

    await eventStore.getEvents({ idGathering })
  }

  function openEvent(event) {
    goToRankEvent(event.id)
  }

  async function shareGathering() {
    const dataUrl = await generateImage(gatheringRef)

    const filename = `confra-${gathering.value.id}.png`

    const title = 'Confra'

    const file = dataUrlToFile(dataUrl, filename)

    await shareImage(file, title)
  }
</script>
