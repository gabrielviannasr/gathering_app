<template>
  <q-page class="page-bg">
    <div class="q-pa-md">
      <q-card class="q-pa-md form-card">
        <!-- Nome -->
        <q-input
          filled
          dense
          label="Nome"
          v-model="form.name"
          placeholder="Digite o nome do formato"
        />

        <!-- Pontos de vida -->
        <q-input
          filled
          dense
          type="number"
          label="Pontos de Vida"
          v-model="form.hp"
          placeholder="Digite os pontos de vida"
          class="q-mt-md"
        />

        <!-- Tipo -->
        <q-select
          filled
          dense
          label="Tipo do Jogo"
          v-model="form.type"
          placeholder="Selecione o tipo"
          :options="typeOptions"
          emit-value
          map-options
          class="q-mt-md"
        />
      </q-card>

      <!-- Botões -->
      <div class="row q-col-gutter-md q-mt-md">
        <div class="col">
          <q-btn outline color="grey-8" no-caps rounded class="full-width" @click="cancel">
            Cancelar
          </q-btn>
        </div>

        <div class="col">
          <q-btn class="add-btn full-width" no-caps rounded unelevated @click="save">
            Salvar
          </q-btn>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'

  const router = useRouter()

  const form = ref({
    name: '',
    hp: '',
    type: null
  })

  const typeOptions = [
    { label: 'Cartas', value: 'cartas' },
    { label: 'Eletrônicos', value: 'eletronicos' },
    { label: 'Imaginação', value: 'imaginacao' },
    { label: 'Papel e Caneta', value: 'papel' },
    { label: 'Tabuleiro', value: 'tabuleiro' }
  ]

  function cancel() {
    router.back()
  }

  function save() {
    console.log('Salvar formato:', form.value)
    router.back()
  }
</script>
