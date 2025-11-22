<template>
  <div class="home-header q-pa-lg column items-center text-white">
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
  </div>
</template>

<script setup>
  import { ref } from 'vue'

  const confras = [
    { id: 1, name: 'L.I.M.P.A.', year: 2023 },
    { id: 2, name: 'DIRETORIA 2.0', year: 2024 },
    { id: 3, name: 'DIRETORIA', year: 2025 }
  ]

  const confraPopup = ref(false)
  const selectedConfra = ref(confras[0])

  function selectConfra(confra) {
    selectedConfra.value = confra
    confraPopup.value = false
  }
</script>

<style scoped>
  .home-header {
    background: linear-gradient(135deg, #7f00ff, #3c6ef3);
    border-radius: 0 0 24px 24px;
  }

  .confra-btn {
    background: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(4px);
    color: white;
    font-weight: 600;
  }
</style>
