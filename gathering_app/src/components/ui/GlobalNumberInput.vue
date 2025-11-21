<template>
  <div class="full-width">
    <!-- Label opcional -->
    <label v-if="label" class="gn-label text-center">{{ label }}</label>

    <div class="gn-wrapper row items-center no-wrap">
      <q-btn round dense flat class="gn-btn" @click="decrement">
        <q-icon name="remove" />
      </q-btn>

      <q-input
        v-model.number="internalValue"
        type="number"
        dense
        rounded
        outlined
        class="gn-input"
        input-class="text-center"
        :placeholder="placeholder"
        @update:model-value="emitValue"
      />

      <q-btn round dense flat class="gn-btn" @click="increment">
        <q-icon name="add" />
      </q-btn>
    </div>
  </div>
</template>

<script setup>
  import { ref, watch } from 'vue'

  const props = defineProps({
    modelValue: { type: Number, default: 0 },
    label: { type: String, default: '' },
    placeholder: { type: String, default: '' },
    min: { type: Number, default: 0 },
    max: { type: Number, default: null },
    step: { type: Number, default: 1 }
  })

  const emit = defineEmits(['update:model-value'])

  const internalValue = ref(props.modelValue)

  // Atualiza interno quando v-model muda
  watch(
    () => props.modelValue,
    v => (internalValue.value = v)
  )

  function emitValue(v) {
    let n = Number(v)

    if (isNaN(n)) n = props.min
    if (props.min !== null && n < props.min) n = props.min
    if (props.max !== null && n > props.max) n = props.max

    emit('update:model-value', n)
  }

  function increment() {
    emitValue(internalValue.value + props.step)
  }

  function decrement() {
    emitValue(internalValue.value - props.step)
  }
</script>

<style scoped>
  .gn-label {
    font-size: 14px;
    font-weight: 700;
    color: #0d1a26;
    margin-bottom: 6px;
    display: block;
  }

  .gn-wrapper {
    display: flex;
    gap: 10px;
  }

  .gn-input {
    flex: 1; /* ocupa todo o espaço restante */
    text-align: center;
  }

  .gn-btn {
    background: #f0f3f8;
    color: #333;
    border: 1px solid #dfe4ea;
  }

  .gn-btn:hover {
    background: #e5e9f0;
  }
</style>
