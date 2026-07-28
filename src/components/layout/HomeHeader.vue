<template>
  <q-header class="home-header column items-center text-white">
    <div class="text-h4 text-bold">{{ gatheringSelected.name }}</div>
    <div class="text-subtitle1 q-mt-xs">{{ gatheringSelected.year }}</div>

    <q-btn class="confra-btn q-mt-md" no-caps rounded unelevated @click="gatheringPopup = true">
      Selecionar confra
    </q-btn>

    <!-- POPUP -->
    <q-dialog v-model="gatheringPopup">
      <q-card class="q-pa-md" style="min-width: 260px">
        <div class="text-h6 text-center q-mb-md">Selecionar Confra</div>

        <q-list bordered separator>
          <q-item
            clickable
            v-for="gathering in gatherings"
            :key="gathering.id"
            @click="selectGathering(gathering)"
          >
            <q-item-section>{{ gathering.name }} - {{ gathering.year }}</q-item-section>
          </q-item>
        </q-list>
      </q-card>
    </q-dialog>
  </q-header>
</template>

<script setup>
  import { useGatheringStore } from 'src/stores/gathering'

  import { computed, onMounted, ref } from 'vue'

  const gatheringStore = useGatheringStore()
  const gatherings = computed(() => gatheringStore.gatherings)
  const gatheringSelected = computed(() => gatheringStore.gatheringSelected)
  // const { confras, gatheringSelected } = storeToRefs(gatheringStore)

  const gatheringPopup = ref(false)

  function selectGathering(gathering) {
    gatheringStore.setGathering(gathering)
    gatheringPopup.value = false
  }

  onMounted(load)

  async function load() {
    await gatheringStore.getGatherings()
  }
</script>

<style scoped>
  .home-header {
    align-items: center;
    /* padding-top: 25px; */
  }

  .confra-btn {
    background: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(4px);
    color: white;
    font-weight: 600;
  }
</style>
