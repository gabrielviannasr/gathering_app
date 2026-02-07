<template>
  <q-page class="page-bg">
    <!-- FORM DO EVENTO -->
    <div class="q-pa-md">
      <q-card class="q-pa-md form-card">
        <!-- Title -->
        <div class="form-section-title">Evento</div>

        <div class="q-col-gutter-md">
          <!-- Formato -->
          <GlobalSelect
            label="Formato"
            :options="formatOptions"
            v-model="form.idFormat"
            placeholder="Selecione o formato"
            emit-value
            map-options
          />

          <GlobalNumberInput
            label="Inscrição do evento"
            placeholder="Digite a inscrição do evento"
            v-model="form.confraFee"
            :min="0"
            :step="5"
          />

          <GlobalNumberInput
            label="Inscrição por Rodada"
            placeholder="Digite a inscrição por rodada"
            v-model="form.roundFee"
            :min="0"
            :step="5"
          />
        </div>
      </q-card>
    </div>

    <!-- CONFIGURAÇÕES DE TAXAS -->
    <div class="q-pa-md">
      <q-card class="q-pa-md form-card">
        <div class="form-section-title">Configurações de Taxas</div>

        <div class="row justify-center q-mt-sm">
          <q-btn rounded unelevated no-caps class="add-btn" @click="addConfig">
            <q-icon name="add" class="q-mr-sm" />
            Adicionar Configuração
          </q-btn>
        </div>
      </q-card>

      <!-- LISTA DINÂMICA -->
      <div v-for="(cfg, index) in form.fees" :key="index" class="q-mt-md">
        <q-card class="q-pa-md form-card">
          <div class="row q-col-gutter-md">
            <GlobalNumberInput
              v-model="cfg.players"
              label="Jogadores"
              placeholder="Digite o nº de jogadores"
              :min="1"
              :max="99"
            />

            <GlobalNumberInput
              v-model="cfg.prizeFee"
              label="Premiação"
              placeholder="Digite a taxa da premiação"
              :min="1"
              :step="5"
            />

            <GlobalNumberInput
              v-model="cfg.loserFee"
              label="Pote dos Derrotados"
              placeholder="Digite a taxa dos derrotados"
              :min="1"
              :step="5"
            />
          </div>

          <!-- Botão remover -->
          <div class="q-mt-sm row justify-center">
            <q-btn
              color="negative"
              flat
              no-caps
              rounded
              icon="delete"
              label="Remover"
              @click="removeConfig(index)"
            />
          </div>
        </q-card>
      </div>
    </div>

    <!-- BOTÕES FINAIS -->
    <div class="row q-col-gutter-md q-pa-md">
      <div class="col">
        <q-btn outline color="grey-8" no-caps rounded class="full-width" @click="cancel">
          Cancelar
        </q-btn>
      </div>

      <div class="col">
        <q-btn class="add-btn full-width" no-caps rounded unelevated @click="save"> Salvar </q-btn>
      </div>
    </div>
  </q-page>
</template>

<script setup>
  import GlobalNumberInput from 'components/ui/GlobalNumberInput.vue'
  import GlobalSelect from 'components/ui/GlobalSelect.vue'
  import { ref, onMounted, computed } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { useEventStore } from 'src/stores/event'
  import { useFormatStore } from 'src/stores/format'

  const eventStore = useEventStore()
  const formatStore = useFormatStore()

  const route = useRoute()
  const router = useRouter()

  const id = route.params.id
  const isEdit = !!id

  // ---------------------------------------------
  // FORMAT OPTIONS (do Pinia)
  // ---------------------------------------------
  const formatOptions = computed(() =>
    formatStore.formats.map(f => ({
      label: f.name,
      value: f.id
    }))
  )

  // ---------------------------------------------
  // FORM DEFAULT (NOVO EVENTO)
  // ---------------------------------------------
  const form = ref({
    id: null,
    idFormat: null,
    confraFee: null,
    roundFee: null,
    fees: []
  })

  // ---------------------------------------------
  // CARREGAR EVENTO (EDIÇÃO)
  // ---------------------------------------------
  onMounted(async () => {
    if (isEdit) {
      const event = await eventStore.getEvent(id)

      form.value = {
        id: event.id,
        idGathering: event.idGathering,
        idFormat: event.idFormat,
        confraFee: event.confraFee,
        roundFee: event.roundFee,
        fees: event.fees.map(f => ({
          id: f.id,
          idEvent: f.idEvent,
          players: f.players,
          prizeFee: f.prizeFee,
          loserFee: f.loserFee
        }))
      }
    }
  })

  // ---------------------------------------------
  // CONFIGURAÇÕES DE TAXAS (ADD/REMOVE)
  // ---------------------------------------------
  function addConfig() {
    form.value.fees.push({
      id: null,
      players: null,
      prize: null,
      loserPot: null
    })
  }

  function removeConfig(index) {
    form.value.fees.splice(index, 1)
  }

  async function save() {
    try {
      if (isEdit) {
        await eventStore.updateEvent(id, form.value)
      } else {
        await eventStore.createEvent(form.value)
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
