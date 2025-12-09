<template>
  <q-card class="q-pa-md form-card">
    <div class="text-h6 text-bold">Jogos por Formato</div>

    <q-list bordered class="q-mt-md">
      <q-item v-for="item in formats" :key="item.idFormat">
        <q-item-section>
          <div class="text-subtitle2 text-bold">{{ item.formatName }}</div>
          <div class="text-caption text-grey">{{ item.rounds }} rodadas jogadas</div>
        </q-item-section>

        <q-item-section side>
          <q-icon name="chevron_right" />
        </q-item-section>
      </q-item>
    </q-list>
  </q-card>
</template>

<script setup>
  defineProps({
    formats: Array
  })
</script>
