<template>
  <q-page class="page-bg">
    <div class="q-pa-md">
      <q-card class="q-pa-md form-card">
        <!-- Title -->
        <div class="form-section-title">Confra</div>

        <!-- Nome -->
        <GlobalInput label="Nome" v-model="form.name" placeholder="Digite o nome da confra" />
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
  /* COMPONENTS */
  import GlobalInput from 'src/components/ui/GlobalInput.vue'

  /* VUE */
  import { onMounted, ref } from 'vue'
  import { useRoute, useRouter } from 'vue-router'

  /* STORES */
  import { useConfraStore } from 'src/stores/confra'

  /* NAVIGATION */
  const route = useRoute()
  const router = useRouter()

  const id = route.params.id
  const isEdit = !!id

  /* STORES */
  const confraStore = useConfraStore()

  /* FORM */
  const form = ref({
    name: ''
  })

  /* LIFECYCLE */
  onMounted(async () => {
    if (isEdit) {
      const confra = await confraStore.getConfra(id)

      form.value = {
        name: confra.name
      }
    }
  })

  /* FUNCTIONS */
  function cancel() {
    router.back()
  }

  async function save() {
    try {
      if (isEdit) {
        await confraStore.updateConfra(id, form.value)
      } else {
        await confraStore.createConfra(form.value)
      }

      router.back()
    } catch (err) {
      console.error(err)
    }
  }
</script>
