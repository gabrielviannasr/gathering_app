<template>
  <q-layout view="lHh Lpr lFf">
    <DefaultHeader />

    <q-page-container>
      <router-view />
    </q-page-container>

    <AppFooterTabs />
  </q-layout>
</template>

<script setup>
  import DefaultHeader from 'src/components/layout/DefaultHeader.vue'
  import AppFooterTabs from 'src/components/layout/AppFooterTabs.vue'
</script>
