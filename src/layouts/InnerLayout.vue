<template>
  <q-layout view="lHh Lpr lFf" class="inner-layout">
    <DefaultHeader />

    <q-page-container>
      <PageWrapper>
        <router-view />
      </PageWrapper>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import DefaultHeader from 'src/components/layout/DefaultHeader.vue'
import PageWrapper from 'src/components/layout/PageWrapper.vue'
</script>
