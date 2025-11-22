<template>
  <q-layout view="lHh Lpr lFf">
    <DefaultHeader />

    <q-page-container>
      <PageWrapper>
        <router-view />
      </PageWrapper>
    </q-page-container>

    <AppFooterTabs />
  </q-layout>
</template>

<script setup>
  import DefaultHeader from 'src/components/layout/DefaultHeader.vue'
  import AppFooterTabs from 'src/components/layout/AppFooterTabs.vue'
  import PageWrapper from 'src/components/layout/PageWrapper.vue'
</script>
