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
            clearable
            v-model="form.idFormat"
            label="Formato"
            placeholder="Selecione o formato"
            :options="formats"
            option-label="name"
            option-value="id"
            map-options
            emit-value
          />

          <!-- ConfraFee -->
          <GlobalNumberInput
            label="Inscrição do evento"
            placeholder="Digite a inscrição do evento"
            v-model="form.confraFee"
            :min="0"
            :step="5"
          />

          <!-- RoundFee -->
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
          <q-btn push no-caps rounded class="add-btn" @click="addConfig">
            <q-icon name="add" class="q-mr-sm" />
            Adicionar Configuração
          </q-btn>
        </div>
      </q-card>

      <!-- LISTA DINÂMICA -->
      <div v-for="(config, index) in form.fees" :key="index" class="q-mt-md">
        <q-card class="q-pa-md form-card">
          <div class="row q-col-gutter-md">
            <!-- Jogadores -->
            <GlobalNumberInput
              v-model="config.players"
              label="Jogadores"
              placeholder="Digite o nº de jogadores"
              :min="1"
              :max="99"
            />

            <!-- PrizeFee -->
            <GlobalNumberInput
              v-model="config.prizeFee"
              label="Premiação"
              placeholder="Digite a taxa da premiação"
              :min="1"
              :step="5"
            />

            <!-- LoserFee -->
            <GlobalNumberInput
              v-model="config.loserFee"
              label="Pote dos Derrotados"
              placeholder="Digite a taxa dos derrotados"
              :min="1"
              :step="5"
            />
          </div>

          <!-- Botão Remover -->
          <div class="q-mt-sm row justify-center">
            <q-btn
              flat
              no-caps
              rounded
              icon="delete"
              label="Remover"
              color="negative"
              @click="removeConfig(index)"
            />
          </div>
        </q-card>
      </div>
    </div>

    <!-- BOTÕES FINAIS -->
    <div class="row q-col-gutter-md q-pa-md">
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
  </q-page>
</template>

<script setup>
  /* VUE */
  import { computed, onMounted, ref } from 'vue'
  import { useRoute, useRouter } from 'vue-router'

  /* STORES */
  import { useEventStore } from 'src/stores/event'
  import { useFormatStore } from 'src/stores/format'
  import { useGatheringStore } from 'src/stores/gathering'

  /* COMPONENTS */
  import GlobalNumberInput from 'components/ui/GlobalNumberInput.vue'
  import GlobalSelect from 'components/ui/GlobalSelect.vue'

  /* ROUTE */
  const route = useRoute()
  const router = useRouter()

  /* PARAMS */
  const id = route.params.id
  const isEdit = !!id

  /* STORES */
  const eventStore = useEventStore()
  const formatStore = useFormatStore()
  const gatheringStore = useGatheringStore()

  /* COMPUTED */
  const formats = computed(() => formatStore.formats ?? [])
  const gathering = computed(() => gatheringStore.gatheringSelected)

  /* FORM */
  const form = ref({
    idGathering: gathering.value.id,
    idFormat: null,
    confraFee: null,
    roundFee: null,
    fees: []
  })

  /* LIFECYCLE */
  onMounted(async () => {
    await formatStore.getFormats()

    if (isEdit) {
      const event = await eventStore.getEvent(id)

      form.value = {
        id: event.id,
        idGathering: event.idGathering,
        idFormat: event.idFormat,
        confraFee: event.confraFee,
        roundFee: event.roundFee,
        fees: event.fees.map(fee => ({
          id: fee.id,
          idEvent: fee.idEvent,
          players: fee.players,
          prizeFee: fee.prizeFee,
          loserFee: fee.loserFee
        }))
      }
    }
  })

  /* FUNCTIONS */
  function addConfig() {
    form.value.fees.push({
      players: null,
      prizeFee: null,
      loserFee: null
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
