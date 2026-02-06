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

        <!-- Botões -->
        <div class="row q-col-gutter-md q-mt-md">
          <div class="col">
            <q-btn outline color="grey-8" no-caps rounded class="full-width" @click="cancel">
              Cancelar
            </q-btn>
          </div>

          <div class="col">
            <q-btn type="submit" class="add-btn full-width" no-caps rounded unelevated>
              Salvar
            </q-btn>
          </div>
        </div>
      </div>
    </q-form>
  </q-page>
</template>

<script setup>
  import GlobalInput from 'src/components/ui/GlobalInput.vue'
  import { onMounted, ref } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { usePlayerStore } from 'src/stores/player'

  const playerStore = usePlayerStore()

  const route = useRoute()
  const router = useRouter()

  const id = route.params.id
  const isEdit = !!id

  const form = ref({
    name: ''
  })

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

  onMounted(async () => {
    if (isEdit) {
      const player = await playerStore.getPlayer(id)

      form.value = {
        name: player.name
      }
    }
  })
</script>
