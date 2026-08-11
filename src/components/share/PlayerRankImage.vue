<template>
  <div class="page-bg">
    <!-- CARD DA CONFRA -->
    <div class="q-pa-md">
      <GatheringCard :gathering="gathering" :showArrow="false" />
    </div>

    <!-- CARD DO EVENTO -->
    <div v-if="isEvent && event" class="q-px-md q-pb-md">
      <EventCard :event="event" :showArrow="false" />
    </div>

    <!-- RANK HEADER -->
    <div class="q-px-md">
      <RankHeaderCard :title="title" />
    </div>

    <!-- RANK DETAIL -->
    <div class="q-pa-md">
      <RankDetailCard :result="result" />
    </div>
  </div>
</template>

<script setup>
  import EventCard from 'src/components/events/EventCard.vue'
  import GatheringCard from 'src/components/gatherings/GatheringCard.vue'
  import RankDetailCard from 'src/components/ranks/RankDetailCard.vue'
  import RankHeaderCard from 'src/components/ranks/RankHeaderCard.vue'

  defineProps({
    event: {
      type: Object
    },
    isEvent: {
      type: Boolean,
      default: false
    },
    gathering: {
      type: Object,
      required: true
    },
    result: {
      type: Object,
      required: true
    },
    title: {
      type: String,
      default: 'Rank'
    }
  })
</script>
