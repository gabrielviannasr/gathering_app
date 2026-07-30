<template>
  <q-page class="page-bg">
    <q-form @submit.prevent="save">
      <div class="q-pa-md">
        <q-card class="q-pa-md form-card">
          <!-- Title -->
          <div class="form-section-title">Formato</div>

          <div class="q-col-gutter-md">
            <!-- Nome -->
            <GlobalInput label="Nome" v-model="form.name" />

            <!-- Pontos de Vida -->
            <GlobalNumberInput v-model="form.lifeCount" label="Pontos de Vida" :min="1" :step="5" />
          </div>
        </q-card>

        <!-- BOTÕES FINAIS -->
        <div class="row q-col-gutter-md q-mt-md">
          <!-- Botão Cancelar -->
          <div class="col-6">
            <q-btn
              no-caps
              rounded
              outline
              label="Cancelar"
              color="grey-8"
              class="full-width"
              @click="cancel"
            />
          </div>

          <!-- Botão Salvar -->
          <div class="col-6">
            <q-btn Push no-caps rounded label="Salvar" class="add-btn full-width" @click="save" />
          </div>
        </div>
      </div>
    </q-form>
  </q-page>
</template>

<script setup>
  /* VUE */
  import { onMounted, ref } from 'vue'
  import { useRoute, useRouter } from 'vue-router'

  /* STORES */
  import { useFormatStore } from 'src/stores/format'

  /* COMPONENTS */
  import GlobalInput from 'src/components/ui/GlobalInput.vue'
  import GlobalNumberInput from 'components/ui/GlobalNumberInput.vue'

  /* ROUTES */
  const route = useRoute()
  const router = useRouter()

  /* PARAMS */
  const id = route.params.id
  const isEdit = !!id

  /* ROUTES */
  const formatStore = useFormatStore()

  /* FORM */
  const form = ref({
    name: '',
    lifeCount: null,
    idFormatType: null
  })

  /* LIFECYCLE */
  onMounted(async () => {
    if (isEdit) {
      const format = await formatStore.getFormat(id)

      form.value = {
        name: format.name,
        lifeCount: format.lifeCount,
        idFormatType: format.idFormatType
      }
    }
  })

  /* FUNCTIONS */
  async function save() {
    try {
      if (isEdit) {
        await formatStore.updateFormat(id, form.value)
      } else {
        await formatStore.createFormat(form.value)
      }

      router.back()
    } catch (err) {
      console.error(err)
    }
  }

  function cancel() {
    router.back()
  }
</script>
