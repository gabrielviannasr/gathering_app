<template>
  <q-layout view="lHh Lpr lFf" class="layout">
    <HomeHeader />

    <q-page-container>
      <PageWrapper>
        <router-view />
      </PageWrapper>
    </q-page-container>

    <AppFooterTabs />
  </q-layout>
</template>

<script setup>
  import AppFooterTabs from 'src/components/layout/AppFooterTabs.vue'
  import HomeHeader from 'src/components/layout/HomeHeader.vue'
  import PageWrapper from 'src/components/layout/PageWrapper.vue'
</script>
