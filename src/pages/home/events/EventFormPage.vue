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
            v-model="form.formatId"
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

      <!-- LISTA DINÂMICA (cada config é um card separado) -->
      <!-- LISTA DINÂMICA -->
      <div v-for="(cfg, index) in form.configs" :key="index" class="q-mt-md">
        <q-card class="q-pa-md form-card">
          <!-- Linha dos labels -->
          <!-- <div class="row q-col-gutter-md q-mb-xs items-center">
            <div class="col-4 text-center config-label">Jogadores</div>
            <div class="col-4 text-center config-label">Premiação</div>
            <div class="col-4 text-center config-label">Pote dos Derrotados</div>
          </div> -->

          <!-- Linha dos inputs -->
          <!-- <div class="row q-col-gutter-md items-center">
            <div class="col-12">
              <GlobalInput type="number" label="" v-model="cfg.players" />
              <GlobalNumberInput v-model="cfg.players" label="Jogadores" :min="1" :max="99" />
            </div>

            <div class="col-4">
              <GlobalInput type="number" label="" v-model="cfg.prize" />
              <GlobalNumberInput v-model="cfg.prize" :min="0" :step="5" />
            </div>

            <div class="col-4">
              <GlobalInput type="number" label="" v-model="cfg.loserPot" />
              <GlobalNumberInput v-model="cfg.loserPot" :min="0" :step="5" />
            </div>
          </div> -->

          <div class="row q-col-gutter-md">
            <GlobalNumberInput
              v-model="cfg.players"
              label="Jogadores"
              placeholder="Digite o nº de jogadores"
              :min="1"
              :max="99"
            />

            <GlobalNumberInput
              v-model="cfg.prize"
              label="Premiação"
              placeholder="Digite a taxa da premiação"
              :min="1"
              :step="5"
            />

            <GlobalNumberInput
              v-model="cfg.loserPot"
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
  // import GlobalInput from 'components/ui/GlobalInput.vue'
  import GlobalNumberInput from 'components/ui/GlobalNumberInput.vue'
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
