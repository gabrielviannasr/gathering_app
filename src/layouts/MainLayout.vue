<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <router-view />
    </q-page-container>

    <!-- Bottom Navigation -->
    <AppFooterTabs />
  </q-layout>
</template>

<script setup>
  import AppFooterTabs from 'src/components/layout/AppFooterTabs.vue'
</script>
