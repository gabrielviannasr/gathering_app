<template>
  <q-page class="page-bg">
    <!-- CARD DO PLAYER -->
    <div class="q-pa-md">
      <PlayerCard
        :wallet="{
          playerName: player.name,
          wallet: walletAmount,
          events: 1
        }"
        :showWalletInfo="true"
        :showArrow="false"
      />
    </div>

    <!-- SALDO DA CARTEIRA -->
    <div class="q-pa-md">
      <PlayerWalletCard :wallet="walletAmount" />
    </div>

    <!-- CARD DA TRANSAÇÃO -->
    <div class="q-pa-md">
      <q-card class="q-pa-md form-card">
        <div class="form-section-title">Transação</div>

        <!-- Tipo -->
        <div class="q-mt-md">
          <GlobalSelect
            label="Tipo"
            :options="walletTypeOptions"
            v-model="form.idTransactionType"
            emit-value
            map-options
            placeholder="Selecione o tipo"
          >
            <template #prepend>
              <q-icon :name="getType(form.idTransactionType)?.icon || 'payments'" />
            </template>
          </GlobalSelect>
        </div>

        <!-- Valor -->
        <div class="q-mt-md">
          <GlobalInput
            v-model="form.amountMasked"
            label="Valor"
            placeholder="0,00"
            @input="handleAmountMasked"
          >
            <template #prepend>
              <q-icon name="attach_money" />
            </template>
          </GlobalInput>
        </div>
      </q-card>
    </div>

    <!-- BOTÕES FINAIS -->
    <div class="q-pa-md">
      <div class="row q-col-gutter-sm">
        <!-- Excluir (somente edit) -->
        <div class="col" v-if="!isNew">
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
          <q-btn
            rounded
            no-caps
            class="add-btn full-width"
            label="Salvar"
            @click="confirmSave = true"
          />
        </div>
      </div>
    </div>

    <!-- DIALOG CONFIRMAR SALVAR -->
    <q-dialog v-model="confirmSave">
      <q-card class="q-pa-md">
        <div class="text-h6 q-mb-sm">Confirmar Transação</div>
        <div class="q-mb-md">
          {{ typeName }} de R$ {{ numericAmount.toFixed(2).replace('.', ',') }}?
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
  /* -------------------- IMPORTS -------------------- */
  import { computed, ref } from 'vue'
  import { useRoute, useRouter } from 'vue-router'

  import PlayerCard from 'src/components/players/PlayerCard.vue'
  import PlayerWalletCard from 'src/components/players/PlayerWalletCard.vue'
  import GlobalInput from 'src/components/ui/GlobalInput.vue'
  import GlobalSelect from 'src/components/ui/GlobalSelect.vue'

  import { usePlayerStore } from 'src/stores/player'
  import { useTransactionStore } from 'src/stores/transaction'
  import { useTransactionTypeStore } from 'src/stores/transactionType'

  /* -------------------- ROUTE -------------------- */
  const route = useRoute()
  const router = useRouter()

  const playerId = Number(route.params.idPlayer)
  const idTransaction = route.params.idTransaction
  const isNew = idTransaction === undefined

  /* -------------------- STORES -------------------- */
  const playerStore = usePlayerStore()
  const transactionStore = useTransactionStore()
  const typeStore = useTransactionTypeStore()

  /* -------------------- PLAYER -------------------- */
  const player = computed(() => playerStore.getPlayer(playerId))

  const walletAmount = computed(() =>
    transactionStore.transactions
      .filter(t => t.idPlayer === playerId)
      .reduce((acc, t) => acc + t.amount, 0)
  )

  /* -------------------- WALLET TYPES -------------------- */
  const walletTypeOptions = computed(() =>
    typeStore.getWalletTypes().map(t => ({
      label: t.name,
      value: t.id
    }))
  )

  const getType = id => typeStore.getType(id)
  const typeName = computed(() => getType(form.value.idTransactionType)?.name || '')

  /* -------------------- FORM -------------------- */
  const form = ref({
    id: null,
    idPlayer: playerId,
    idTransactionType: null,
    amount: 0,
    amountMasked: '',
    createdAt: new Date().toISOString()
  })

  /* EDIT MODE */
  if (!isNew) {
    const stored = transactionStore.getById(Number(idTransaction))
    if (stored) {
      form.value = {
        ...stored,
        amountMasked: stored.amount.toFixed(2).replace('.', ',')
      }
    }
  }

  /* -------------------- MASK LOGIC -------------------- */
  function handleAmountMasked(v) {
    const clean = v.replace(/[^\d]/g, '')
    const num = Number(clean) / 100
    form.value.amountMasked = num.toFixed(2).replace('.', ',')
  }

  /* Amount numérico */
  const numericAmount = computed(() => {
    const n = Number(form.value.amountMasked.replace(',', '.'))
    return isNaN(n) ? 0 : n
  })

  /* -------------------- SAVE -------------------- */
  const confirmSave = ref(false)
  async function save() {
    const type = form.value.idTransactionType
    const amount = numericAmount.value

    // depósito = positivo | saque = negativo
    form.value.amount = type === 3 ? amount : -amount

    if (isNew) {
      transactionStore.add(form.value)
    } else {
      transactionStore.update(form.value)
    }

    confirmSave.value = false
    router.back()
  }

  /* -------------------- DELETE -------------------- */
  const confirmDelete = ref(false)
  async function deleteTransaction() {
    transactionStore.remove(form.value.id)
    confirmDelete.value = false
    router.back()
  }

  /* -------------------- CANCEL -------------------- */
  function cancel() {
    router.back()
  }
</script>

<style scoped>
  .item-row {
    padding: 10px 0;
    border-bottom: 1px solid #eee;
  }
  .item-row:last-child {
    border-bottom: none;
  }
</style>
