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

        <div class="col">
          <q-btn push no-caps rounded class="add-btn full-width" @click="save"> Salvar </q-btn>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
  /* VUE */
  import { onMounted, ref } from 'vue'
  import { useRoute, useRouter } from 'vue-router'

  /* STORES */
  import { useGatheringStore } from 'src/stores/gathering'

  /* COMPONENTS */
  import GlobalInput from 'src/components/ui/GlobalInput.vue'

  /* ROUTES */
  const route = useRoute()
  const router = useRouter()

  /* PARAMS */
  const id = route.params.id
  const isEdit = !!id

  /* STORES */
  const gatheringStore = useGatheringStore()

  /* FORM */
  const form = ref({
    name: ''
  })

  /* LIFECYCLE */
  onMounted(async () => {
    if (isEdit) {
      const gathering = await gatheringStore.getGathering(id)

      form.value = {
        name: gathering.name
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
        await gatheringStore.updateGathering(id, form.value)
      } else {
        await gatheringStore.createGathering(form.value)
      }

      router.back()
    } catch (err) {
      console.error(err)
    }
  }
</script>
