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

            <!-- <GlobalSelect
              label="Tipo do Jogo"
              :options="typeOptions"
              v-model="form.idFormatType"
              placeholder="Selecione o tipo"
              emit-value
              map-options
            /> -->
          </div>
        </q-card>

        <!-- BOTÕES FINAIS -->
        <div class="row q-col-gutter-md q-mt-md">
          <!-- Botão Cancelar -->
          <div class="col-6">
            <q-btn no-caps rounded outline color="grey-8" class="full-width" @click="cancel">
              Cancelar
            </q-btn>
          </div>

          <!-- Botão Salvar -->
          <div class="col-6">
            <q-btn push no-caps rounded type="submit" class="add-btn full-width"> Salvar </q-btn>
          </div>
        </div>
      </div>
    </q-form>
  </q-page>
</template>

<script setup>
  import GlobalInput from 'src/components/ui/GlobalInput.vue'
  import GlobalNumberInput from 'components/ui/GlobalNumberInput.vue'
  // import GlobalSelect from 'src/components/ui/GlobalSelect.vue'

  import { onMounted, ref } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { useFormatStore } from 'src/stores/format'
  // import { useFormatTypeStore } from 'src/stores/formatType'

  const route = useRoute()
  const router = useRouter()

  const formatStore = useFormatStore()
  // const typeStore = useFormatTypeStore()

  const id = route.params.id
  const isEdit = !!id

  const form = ref({
    name: '',
    lifeCount: null,
    idFormatType: null
  })

  // const typeOptions = computed(() =>
  //   typeStore.types.map(t => ({
  //     label: t.label,
  //     value: t.id,
  //     icon: t.icon
  //   }))
  // )

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
</script>
