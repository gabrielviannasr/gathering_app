<template>
  <div class="page-bg">
    <!-- CARD DA CONFRA -->
    <div class="q-pa-md">
      <GatheringCard :gathering="gathering" :showArrow="false" />
    </div>

    <!-- CARD DOS POTES -->
    <div class="q-px-md q-pb-md">
      <PotSummaryCard :pots="pots" />
    </div>
  </div>
</template>

<script setup>
  import GatheringCard from 'src/components/gatherings/GatheringCard.vue'
  import PotSummaryCard from 'src/components/pots/PotSummaryCard.vue'

  defineProps({
    pots: {
      type: Object,
      required: true
    },
    gathering: {
      type: Object,
      required: true
    }
  })
</script>
