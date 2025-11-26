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

      <!-- LISTA DINÂMICA -->
      <div v-for="(cfg, index) in form.configs" :key="index" class="q-mt-md">
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
  import { ref, onMounted, computed } from 'vue'
  import { useRoute, useRouter } from 'vue-router'

  import GlobalNumberInput from 'components/ui/GlobalNumberInput.vue'
  import GlobalSelect from 'components/ui/GlobalSelect.vue'

  // STORES
  import { useEventStore } from 'src/stores/event'
  import { useFormatStore } from 'src/stores/format'

  const route = useRoute()
  const router = useRouter()

  const eventStore = useEventStore()
  const formatStore = useFormatStore()

  const eventId = route.params.id ? Number(route.params.id) : null

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
    formatId: null,
    confraFee: null,
    roundFee: null,
    configs: []
  })

  // ---------------------------------------------
  // CARREGAR EVENTO (EDIÇÃO)
  // ---------------------------------------------
  onMounted(() => {
    if (eventId) {
      const ev = eventStore.getEvent(eventId)
      if (ev) {
        form.value = {
          id: ev.id,
          formatId: ev.idFormat,
          confraFee: ev.confraFee,
          roundFee: ev.roundFee,
          configs: ev.fees.map(f => ({
            id: f.id,
            players: f.players,
            prize: f.prizeFee,
            loserPot: f.loserFee
          }))
        }
      }
    }
  })

  // ---------------------------------------------
  // CONFIGURAÇÕES DE TAXAS (ADD/REMOVE)
  // ---------------------------------------------
  function addConfig() {
    form.value.configs.push({
      id: null,
      players: null,
      prize: null,
      loserPot: null
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

    if (eventId) {
      // atualizar futuramente
    } else {
      // criar futuramente
    }

    router.push({ name: 'eventos' })
  }
</script>
