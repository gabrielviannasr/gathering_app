<template>
  <q-header class="home-header q-pa-lg column items-center text-white">
    <div class="text-h4 text-bold">{{ selectedConfra.name }}</div>
    <div class="text-subtitle1 q-mt-xs">{{ selectedConfra.year }}</div>

    <q-btn class="confra-btn q-mt-md" no-caps rounded unelevated @click="confraPopup = true">
      Selecionar confra
    </q-btn>

    <!-- POPUP -->
    <q-dialog v-model="confraPopup">
      <q-card class="q-pa-md" style="min-width: 260px">
        <div class="text-h6 text-center q-mb-md">Selecionar Confra</div>

        <q-list bordered separator>
          <q-item
            clickable
            v-for="confra in confras"
            :key="confra.id"
            @click="selectConfra(confra)"
          >
            <q-item-section>{{ confra.name }} - {{ confra.year }}</q-item-section>
          </q-item>
        </q-list>
      </q-card>
    </q-dialog>
  </q-header>
</template>

<script setup>
  import { useConfraStore } from 'src/stores/confra'
  import { storeToRefs } from 'pinia'
  import { ref } from 'vue'

  const confraStore = useConfraStore()
  const { confras, selectedConfra } = storeToRefs(confraStore)

  const confraPopup = ref(false)

  function selectConfra(confra) {
    confraStore.setConfra(confra)
    confraPopup.value = false
  }
</script>

<style scoped>
  .home-header {
    align-items: center;
    padding: 16px;
  }

  .confra-btn {
    background: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(4px);
    color: white;
    font-weight: 600;
  }
</style>
