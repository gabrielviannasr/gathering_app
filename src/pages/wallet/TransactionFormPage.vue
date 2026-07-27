<template>
  <q-page class="page-bg">
    <!-- CARD DO PLAYER COM CARTEIRA -->
    <div class="q-pa-md">
      <WalletCard :wallet="wallet" :showArrow="false" v-if="wallet" />
    </div>

    <q-form greedy @submit="onSubmit">
      <!-- CARD DA TRANSAÇÃO -->
      <div class="q-pa-md">
        <q-card class="q-pa-md form-card">
          <div class="form-section-title">Transação</div>

          <!-- Tipo -->
          <div class="q-mt-md">
            <GlobalSelect
              label="Tipo:"
              :options="walletTypeOptions"
              v-model="form.idTransactionType"
              emit-value
              map-options
              placeholder="Selecione o tipo"
              :rules="[val => !!val || 'Campo obrigatório!']"
            >
              <template #prepend>
                <q-icon :name="getType(form.idTransactionType)?.icon || 'payments'" />
              </template>
            </GlobalSelect>
          </div>

          <!-- Valor -->
          <div class="">
            <GlobalNumberInput
              v-model="form.amount"
              label="Valor:"
              placeholder="0"
              :min="0"
              :step="5"
              :rules="[
                val => !!val || 'Campo obrigatório!',
                val => val > 0 || 'O valor deve ser maior que zero!'
              ]"
            />
          </div>

          <!-- DESCRIÇÃO / TIPO DE DESCRIÇÃO -->
          <div class="q-mt-md">
            <GlobalSelect
              label="Descrição: (Sugerida)"
              v-model="form.description"
              :options="descriptionOptions"
              emit-value
              map-options
            />
          </div>

          <!-- CAMPO DE DESCRIÇÃO MANUAL -->
          <div class="q-mt-md">
            <GlobalInput
              v-model="form.description"
              label="Descrição:"
              type="textarea"
              maxlength="25"
              counter
              autogrow
              clearable
              placeholder="Digite a descrição..."
              :rules="[val => !!val || 'Campo obrigatório!']"
            />
          </div>
        </q-card>
      </div>

      <!-- BOTÕES FINAIS -->
      <div class="q-pa-md">
        <div class="row q-col-gutter-sm">
          <!-- Excluir (somente edit) -->
          <div class="col" v-if="isEditMode">
            <q-btn
              outline
              color="negative"
              rounded
              no-caps
              class="full-width"
              label="Excluir"
              @click="confirmDelete = true"
            />
          </div>

          <!-- Cancelar -->
          <div class="col">
            <q-btn outline rounded no-caps class="full-width" label="Cancelar" @click="cancel" />
          </div>

          <!-- Salvar -->
          <div class="col">
            <q-btn type="submit" rounded no-caps class="add-btn full-width" label="Salvar" />
          </div>
        </div>
      </div>
    </q-form>

    <!-- DIALOG CONFIRMAR SALVAR -->
    <q-dialog v-model="confirmSave">
      <q-card class="q-pa-md">
        <div class="text-h6 q-mb-sm">Confirmar Transação</div>
        <div class="q-mb-md">
          {{ typeName }} de R$ {{ form.amount.toFixed(2).replace('.', ',') }}?
        </div>

        <div class="row q-gutter-sm justify-end">
          <q-btn flat label="Cancelar" color="primary" v-close-popup />
          <q-btn flat label="Confirmar" color="positive" @click="save" />
        </div>
      </q-card>
    </q-dialog>

    <!-- DIALOG CONFIRMAR EXCLUSÃO -->
    <q-dialog v-model="confirmDelete">
      <q-card class="q-pa-md">
        <div class="text-h6 q-mb-sm">Excluir Transação</div>
        <div class="q-mb-md">Deseja excluir esta transação?</div>

        <div class="row q-gutter-sm justify-end">
          <q-btn flat label="Cancelar" color="primary" v-close-popup />
          <q-btn flat label="Excluir" color="negative" @click="deleteTransaction" />
        </div>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
  /* COMPONENTS */
  import GlobalInput from 'src/components/ui/GlobalInput.vue'
  import GlobalNumberInput from 'components/ui/GlobalNumberInput.vue'
  import GlobalSelect from 'src/components/ui/GlobalSelect.vue'
  import WalletCard from 'src/components/wallet/WalletCard.vue'

  /* VUE */
  import { computed, onMounted, ref } from 'vue'
  import { useRoute, useRouter } from 'vue-router'

  /* PINIA */
  import { useConfraStore } from 'src/stores/confra'
  import { useDashboardStore } from 'src/stores/dashboard'
  import { useTransactionStore } from 'src/stores/transaction'
  import { useTransactionTypeStore } from 'src/stores/transactionType'

  /* ROUTE */
  const route = useRoute()
  const router = useRouter()

  /* PARAMS */
  const idPlayer = Number(route.params.idPlayer)
  const idTransaction = route.params.idTransaction
  const isEditMode = idTransaction !== undefined

  /* STORES */
  const confraStore = useConfraStore()
  const dashboardStore = useDashboardStore()
  const transactionStore = useTransactionStore()
  const typeStore = useTransactionTypeStore()

  /* COMPUTED */
  const confra = computed(() => confraStore.selectedConfra)
  const transaction = computed(() => transactionStore.transaction ?? {})
  const wallet = computed(() => dashboardStore.wallet)

  const descriptionOptions = [
    { label: 'Pix', value: 'Pix' },
    { label: 'Dinheiro', value: 'Dinheiro' },
    { label: 'Dinheiro + Pix', value: 'Dinheiro + Pix' },
    { label: 'Outro', value: 'Outro' }
  ]

  const walletTypeOptions = computed(() =>
    typeStore.getWalletTypes().map(type => ({
      label: type.name,
      value: type.id
    }))
  )

  const getType = id => typeStore.getType(id)
  const typeName = computed(() => getType(form.value.idTransactionType)?.name || '')

  /* FORM */
  const form = ref({
    idGathering: confra.value.id,
    idPlayer: idPlayer,
    idTransactionType: null,
    amount: 0,
    description: null
  })

  /* LIFECYCLE */
  onMounted(async () => {
    await load()
  })

  /* FUNCTIONS */
  async function load() {
    await dashboardStore.getWallet(confra.value.id, idPlayer)

    if (isEditMode) {
      await transactionStore.getTransaction(idTransaction)

      if (transaction.value) {
        form.value = {
          idGathering: transaction.value.gathering.id,
          idPlayer: transaction.value.player.id,
          idTransactionType: transaction.value.type.id,
          amount: Math.abs(transaction.value.amount),
          description: transaction.value.description
        }
      }
    }
  }

  /* -------------------- SAVE -------------------- */
  const confirmSave = ref(false)

  async function onSubmit() {
    confirmSave.value = true
  }

  async function save() {
    const type = form.value.idTransactionType
    const amount = form.value.amount

    // depósito = positivo | saque = negativo
    form.value.amount = type === 3 ? amount : -amount

    if (isEditMode) {
      await transactionStore.updateTransaction(idTransaction, form.value)
    } else {
      await transactionStore.createTransaction(form.value)
    }

    confirmSave.value = false
    router.back()
  }

  /* -------------------- DELETE -------------------- */
  const confirmDelete = ref(false)
  async function deleteTransaction() {
    await transactionStore.deleteTransaction(idTransaction)
    confirmDelete.value = false
    router.back()
  }

  /* -------------------- CANCEL -------------------- */
  function cancel() {
    router.back()
  }
</script>
