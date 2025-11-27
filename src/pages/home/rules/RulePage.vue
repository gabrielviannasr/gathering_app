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
  const summary = ruleSections.map(s => ({
    id: s.id,
    label: s.title
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

<style scoped>
  .rule-content p {
    margin-bottom: 10px;
    line-height: 1.5;
  }

  .rule-content ul,
  .rule-content ol {
    margin-left: 16px;
  }

  .rule-content table {
    width: 100%;
    margin-top: 10px;
    border-collapse: collapse;
  }

  .rule-content th,
  .rule-content td {
    border: 1px solid #ddd;
    padding: 6px;
  }

  .rule-content th {
    background: #f3f3f3;
  }

  .rule-content .formula {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 8px;
    font-family: monospace;
    font-size: 16px;
    padding: 8px 0;
    text-align: center;
  }

  .rule-content .formula span {
    white-space: nowrap;
  }
</style>
