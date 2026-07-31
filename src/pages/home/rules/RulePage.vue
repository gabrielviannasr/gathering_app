<template>
  <q-page class="page-bg q-pa-md">
    <!-- ==============================
         SUMÁRIO
    =============================== -->
    <q-card class="q-pa-md form-card q-mb-xl" id="top">
      <div class="form-section-title q-mb-sm">Sumário</div>

      <div class="column q-gutter-xs">
        <q-btn
          v-for="(item, index) in summary"
          :key="item.id"
          flat
          no-caps
          align="left"
          color="primary"
          class="text-bold"
          @click="scrollTo(item.id)"
        >
          {{ index + 1 }}. {{ item.label }}
        </q-btn>
      </div>
    </q-card>

    <!-- ==============================
         SEÇÕES
    =============================== -->
    <section
      v-for="(section, index) in sections"
      :key="section.id"
      :id="section.id"
      class="q-mb-xl"
    >
      <q-card class="q-pa-md form-card">
        <div class="text-h6 text-bold q-mb-sm">{{ index + 1 }}. {{ section.title }}</div>

        <div v-html="section.content" class="rule-content"></div>

        <q-btn flat no-caps color="primary" class="q-mt-md" @click="scrollTo('top')">
          Voltar ao Sumário ↑
        </q-btn>
      </q-card>
    </section>
  </q-page>
</template>

<script setup>
  import { ruleSections } from './RuleSections'

  // SUMÁRIO
  const summary = ruleSections.map(section => ({
    id: section.id,
    label: section.title
  }))

  // SEÇÕES
  const sections = ruleSections

  // FUNÇÃO DE SCROLL
  function scrollTo(id) {
    const top = document.getElementById(id)?.offsetTop - 10
    if (top === undefined) return

    window.scrollTo({
      top,
      behavior: 'smooth'
    })
  }
</script>
