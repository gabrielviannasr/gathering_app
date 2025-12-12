<template>
  <div class="full-width">
    <label v-if="label" class="gn-label text-center">{{ label }}</label>

    <div class="gn-wrapper">
      <q-btn round dense flat class="gn-btn" @click="decrement">
        <q-icon name="remove" />
      </q-btn>

      <q-input
        :model-value="displayValue"
        @update:model-value="emitValue"
        type="number"
        dense
        outlined
        rounded
        class="gn-input"
        input-class="text-center"
        :placeholder="placeholder"
      />

      <q-btn round dense flat class="gn-btn" @click="increment">
        <q-icon name="add" />
      </q-btn>
    </div>
  </div>
</template>

<script setup>
  import { computed, ref, watch } from 'vue'

  const props = defineProps({
    modelValue: Number,
    label: String,
    placeholder: String,
    min: Number,
    max: Number,
    step: { type: Number, default: 1 }
  })

  const emit = defineEmits(['update:model-value'])

  const internalValue = ref(props.modelValue)

  watch(
    () => props.modelValue,
    v => (internalValue.value = v)
  )

  // placeholder funciona quando valor é null ou ""
  const displayValue = computed(() =>
    internalValue.value === 0 || internalValue.value === null ? '' : internalValue.value
  )

  function emitValue(v) {
    let n = Number(v)
    if (isNaN(n)) n = null

    if (props.min !== null && n < props.min) n = props.min
    if (props.max !== null && n > props.max) n = props.max

    emit('update:model-value', n)
  }

  function increment() {
    emitValue((internalValue.value || 0) + props.step)
  }

  function decrement() {
    emitValue((internalValue.value || 0) - props.step)
  }
</script>

<style scoped>
  .gn-label {
    font-weight: 700;
    margin-bottom: 5px;
    display: block;
  }

  .gn-wrapper {
    display: flex;
    align-items: center; /* <-- FIX REAL DO ALINHAMENTO */
    gap: 10px;
  }

  .gn-input {
    flex: 1;
  }

  .gn-btn {
    background: #f0f3f8;
    border: 1px solid #dfe4ea;
  }

  .gn-btn:hover {
    background: #e5e9f0;
  }
</style>
