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

    <!-- LISTA DE EVENTOS -->
    <div class="q-pa-md q-gutter-md">
      <q-card
        v-for="event in eventList"
        :key="event.id"
        class="list-card q-pa-sm"
        clickable
        @click="openEvent(event.id)"
      >
        <div class="row items-center no-wrap">
          <!-- Ícone do evento -->
          <div class="round-number-circle q-mr-md">
            <q-icon name="event" size="20px" />
          </div>

          <!-- INFO -->
          <div class="col">
            <div class="text-subtitle2 text-bold">Evento #{{ event.id }}</div>

            <div class="text-caption q-mt-xs">
              {{ event.players }} jogadores • {{ event.rounds }} rodadas
            </div>

            <!-- Potes -->
            <div class="text-caption q-mt-xs row justify-between text-center">
              <div class="col">
                <span class="text-positive text-bold">R$ {{ event.confraPot }}</span>
                <div class="text-caption">Confra</div>
              </div>

              <div class="col">
                <span class="text-negative text-bold">R$ {{ event.loserPot }}</span>
                <div class="text-caption">Derrotados</div>
              </div>

              <div class="col">
                <span class="text-bold">R$ {{ event.prize }}</span>
                <div class="text-caption">Premiação</div>
              </div>
            </div>
          </div>

          <!-- SETA -->
          <div class="q-ml-auto">
            <q-icon name="chevron_right" size="22px" />
          </div>
        </div>
      </q-card>
    </div>
  </q-page>
</template>

<script setup>
  import { computed } from 'vue'
  import { useRoute } from 'vue-router'

  import ConfraBodyCard from 'src/components/confras/ConfraBodyCard.vue'
  import ConfraHeaderCard from 'src/components/confras/ConfraHeaderCard.vue'

  import { useConfraStore } from 'src/stores/confra'
  import { useEventStore } from 'src/stores/event'
  import { useRoundNavigator } from 'src/composables/navigation'

  /* ROUTES */
  const route = useRoute()
  const idGathering = Number(route.params.id)

  /* STORES */
  const confraStore = useConfraStore()
  const eventStore = useEventStore()
  const { goToRounds } = useRoundNavigator()

  /* CONFRA CARD */
  const confraSummary = computed(() => confraStore.getConfraSummary(idGathering))

  /* LISTA DE EVENTOS */
  const eventList = computed(() => eventStore.getEventsByGathering(idGathering))

  /* NAVEGAÇÃO */
  function openEvent(idEvent) {
    goToRounds(idEvent)
  }
</script>
