<template>
  <div class="page-bg">
    <!-- CARD DA CONFRA -->
    <div class="q-pa-md">
      <GatheringCard :gathering="gathering" :showArrow="false" />
    </div>

    <!-- CARD DO EVENTO -->
    <div v-if="event" class="q-px-md q-pb-md">
      <EventCard :event="event" :showArrow="false" />
    </div>

    <!-- CARD DO RANK HEADER -->
    <div class="q-px-md">
      <RankHeaderCard :title="title" />
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
  import GatheringCard from 'src/components/gatherings/GatheringCard.vue'
  import RankCard from 'src/components/ranks/RankCard.vue'
  import RankHeaderCard from 'src/components/ranks/RankHeaderCard.vue'

  defineProps({
    event: {
      type: Object
    },
    gathering: {
      type: Object,
      required: true
    },
    results: {
      type: Array,
      required: true
    },
    title: {
      type: String,
      default: 'Rank'
    }
  })
</script>
