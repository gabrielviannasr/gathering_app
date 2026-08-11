<template>
  <div class="page-bg">
    <!-- CARD DO EVENTO -->
    <div class="q-pa-md">
      <EventCard :event="event" :showArrow="false" />
    </div>

    <!-- LISTA -->
    <div class="q-pa-md q-gutter-md">
      <RankCard
        v-for="result in results"
        :key="result.idPlayer"
        :result="result"
        class="list-card"
        :showArrow="false"
      />
    </div>
  </div>
</template>

<script setup>
  import EventCard from 'src/components/events/EventCard.vue'
  import RankCard from 'src/components/ranks/RankCard.vue'

  defineProps({
    event: {
      type: Object,
      required: true
    },
    results: {
      type: Array,
      required: true
    }
  })
</script>
