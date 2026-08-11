<template>
  <div class="page-bg">
    <!-- CARD DA CONFRA -->
    <div class="q-pa-md">
      <GatheringCard :gathering="gathering" :showArrow="false" />
    </div>

    <!-- CARD DO EVENTO -->
    <div class="q-px-md q-pb-md">
      <EventCard :event="event" :showArrow="false" />
    </div>

    <!-- CARD DAS INSCRIÇÕES -->
    <div class="q-px-md">
      <EventFeeCard :event="event" />
    </div>

    <!-- CARD DOS POTES -->
    <div class="q-pa-md">
      <PotSummaryCard :pots="event" />
    </div>
  </div>
</template>

<script setup>
  import EventCard from 'src/components/events/EventCard.vue'
  import EventFeeCard from 'src/components/events/EventFeeCard.vue'
  import GatheringCard from 'src/components/gatherings/GatheringCard.vue'
  import PotSummaryCard from 'src/components/pots/PotSummaryCard.vue'

  defineProps({
    event: {
      type: Object,
      required: true
    },
    gathering: {
      type: Object,
      required: true
    }
  })
</script>
