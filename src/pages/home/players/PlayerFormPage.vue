<template>
  <q-page class="page-bg">
    <q-form @submit.prevent="save">
      <div class="q-pa-md">
        <q-card class="q-pa-md form-card">
          <!-- Title -->
          <div class="form-section-title">Jogador</div>

          <!-- Nome -->
          <GlobalInput label="Nome" v-model="form.name" placeholder="Digite o nome do jogador" />
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
            <q-btn push no-caps rounded label="Salvar" class="add-btn full-width" @click="save" />
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
  import { usePlayerStore } from 'src/stores/player'

  /* COMPONENTS */
  import GlobalInput from 'src/components/ui/GlobalInput.vue'

  /* ROUTES */
  const route = useRoute()
  const router = useRouter()

  /* PARAMS */
  const id = route.params.id
  const isEdit = !!id

  /* STORES */
  const playerStore = usePlayerStore()

  /* FORM */
  const form = ref({
    name: ''
  })

  /* LIFECYCLE */
  onMounted(async () => {
    if (isEdit) {
      const player = await playerStore.getPlayer(id)

      form.value = {
        name: player.name
      }
    }
  })

  /* FUNCTIONS */
  async function save() {
    try {
      if (isEdit) {
        await playerStore.updatePlayer(id, form.value)
      } else {
        await playerStore.createPlayer(form.value)
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
