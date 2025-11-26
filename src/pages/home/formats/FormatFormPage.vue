<template>
  <q-page class="page-bg">
    <div class="q-pa-md">
      <q-card class="q-pa-md form-card">
        <div class="form-section-title">Formato</div>

        <div class="q-col-gutter-md">
          <GlobalInput label="Nome" v-model="form.name" />

          <GlobalNumberInput v-model="form.lifeCount" label="Pontos de Vida" :min="1" :step="5" />

          <GlobalSelect
            label="Tipo do Jogo"
            :options="typeOptions"
            v-model="form.idFormatType"
            placeholder="Selecione o tipo"
            emit-value
            map-options
          />
        </div>
      </q-card>

      <div class="row q-col-gutter-md q-mt-md">
        <div class="col">
          <q-btn outline color="grey-8" no-caps rounded class="full-width" @click="cancel">
            Cancelar
          </q-btn>
        </div>

        <div class="col">
          <q-btn class="add-btn full-width" no-caps rounded unelevated @click="save">
            Salvar
          </q-btn>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
  import GlobalInput from 'src/components/ui/GlobalInput.vue'
  import GlobalNumberInput from 'components/ui/GlobalNumberInput.vue'
  import GlobalSelect from 'src/components/ui/GlobalSelect.vue'

  import { ref, computed } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { useFormatStore } from 'src/stores/format'
  import { useFormatTypeStore } from 'src/stores/formatType'

  const route = useRoute()
  const router = useRouter()

  const formatStore = useFormatStore()
  const typeStore = useFormatTypeStore()

  const isEdit = computed(() => !!route.params.id)
  const formatId = computed(() => Number(route.params.id))

  const form = ref({
    name: '',
    lifeCount: null,
    idFormatType: null
  })

  if (isEdit.value) {
    const f = formatStore.getFormat(formatId.value)
    if (f) Object.assign(form.value, f)
  }

  const typeOptions = computed(() =>
    typeStore.types.map(t => ({
      label: t.label,
      value: t.id,
      icon: t.icon
    }))
  )

  function cancel() {
    router.back()
  }

  function save() {
    console.log('Salvar formato:', form.value)
    router.back()
  }
</script>
