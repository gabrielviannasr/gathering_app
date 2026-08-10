<template>
  <div class="page-bg">
    <div class="q-pa-md">
      <EventCard :event="event" :showArrow="false" />
    </div>

    <div class="q-px-md">
      <EventFeeCard :event="event" />
    </div>

    <div class="q-pa-md">
      <PotSummaryCard :pots="event" />
    </div>
  </div>
</template>

<script setup>
  import EventCard from 'src/components/events/EventCard.vue'
  import EventFeeCard from 'src/components/events/EventFeeCard.vue'
  import PotSummaryCard from 'src/components/pots/PotSummaryCard.vue'

  defineProps({
    event: {
      type: Object,
      required: true
    }
  })
</script>
