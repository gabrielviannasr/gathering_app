<template>
  <q-page class="page-bg">
    <!-- FORM DO EVENTO -->
    <div class="q-pa-md">
      <q-card class="q-pa-md form-card">
        <div class="form-section-title">Evento</div>

        <!-- Formato -->
        <GlobalSelect
          label="Formato"
          :options="formatOptions"
          v-model="form.formatId"
          placeholder="Selecione o formato"
          emit-value
          map-options
        />

        <!-- Taxa da Confra -->
        <GlobalInput
          class="q-mt-md"
          label="Taxa da Confra"
          type="number"
          v-model="form.confraFee"
          placeholder="Digite a taxa da confra"
        />

        <!-- Taxa da Rodada -->
        <GlobalInput
          class="q-mt-md"
          label="Taxa da Rodada"
          type="number"
          v-model="form.roundFee"
          placeholder="Digite a taxa da rodada"
        />
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

      <!-- LISTA DINÂMICA (cada config é um card separado) -->
      <div v-for="(cfg, index) in form.configs" :key="index" class="q-mt-md">
        <q-card class="q-pa-md form-card">
          <div class="row q-col-gutter-md">
            <div class="col-12">
              <GlobalInput type="number" label="Jogadores" v-model="cfg.players" />
            </div>

            <div class="col-12">
              <GlobalInput type="number" label="Premiação" v-model="cfg.prize" />
            </div>

            <div class="col-12">
              <GlobalInput type="number" label="Pote dos Derrotados" v-model="cfg.loserPot" />
            </div>
          </div>

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
        <q-btn outline color="grey-8" no-caps rounded class="full-width" @click="goBack">
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
  import { ref, onMounted } from 'vue'
  import { useRoute, useRouter } from 'vue-router'

  // COMPONENTES GLOBAIS
  import GlobalInput from 'components/ui/GlobalInput.vue'
  import GlobalSelect from 'components/ui/GlobalSelect.vue'

  const route = useRoute()
  const router = useRouter()

  const eventId = route.params.id ?? null

  // ---------------------------------------------
  // MOCK: lista de formatos
  // (irá vir da API futuramente)
  // ---------------------------------------------
  const formatOptions = [
    { label: 'Commander', value: 1 },
    { label: 'Conquest', value: 2 },
    { label: 'Tiny Leaders', value: 3 }
  ]

  // ---------------------------------------------
  // FORM DEFAULT (novo)
  // ---------------------------------------------
  const form = ref({
    id: null,
    formatId: null,
    confraFee: '',
    roundFee: '',
    configs: []
  })

  // ---------------------------------------------
  // MOCK DE EVENTO (edição)
  // ---------------------------------------------
  const mockEvent = {
    id: 1,
    formatId: 1,
    confraFee: 20.0,
    roundFee: 10.0,
    configs: [
      { id: 1, players: 5, prize: 40.0, loserPot: 10.0 },
      { id: 2, players: 6, prize: 45.0, loserPot: 15.0 }
    ]
  }

  // ---------------------------------------------
  // AO ENTRAR NA ROTA
  // ---------------------------------------------
  onMounted(() => {
    if (eventId) {
      loadEvent(eventId)
    }
  })

  // Carrega evento mock
  // eslint-disable-next-line no-unused-vars
  function loadEvent(id) {
    form.value = JSON.parse(JSON.stringify(mockEvent))
  }

  // ---------------------------------------------
  // CONFIGURAÇÕES (ADD/REMOVE)
  // ---------------------------------------------
  function addConfig() {
    form.value.configs.push({
      id: null,
      players: '',
      prize: '',
      loserPot: ''
    })
  }

  function removeConfig(index) {
    form.value.configs.splice(index, 1)
  }

  // ---------------------------------------------
  // AÇÕES
  // ---------------------------------------------
  function goBack() {
    router.back()
  }

  function save() {
    console.log('Salvar evento:', form.value)

    // futuramente: chamada no backend

    router.push('/app/eventos')
  }
</script>
