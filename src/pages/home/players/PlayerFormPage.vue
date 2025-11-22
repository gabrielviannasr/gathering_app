<template>
  <q-page class="page-bg">
    <div class="q-pa-md">
      <q-card class="q-pa-md form-card">
        <!-- Title -->
        <div class="form-section-title">Jogador</div>

        <!-- Nome -->
        <GlobalInput label="Nome" v-model="form.name" placeholder="Digite o nome do jogador" />
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
  import GlobalInput from 'src/components/ui/GlobalInput.vue'
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'

  const router = useRouter()

  // formulário
  const form = ref({
    name: ''
  })

  function cancel() {
    router.back()
  }

  function save() {
    console.log('Salvar jogador:', form.value)
    router.back()
  }
</script>
