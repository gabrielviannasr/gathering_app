<template>
  <q-input v-bind="$attrs" outlined rounded dense class="global-field">
    <!-- PREPEND -->
    <template #prepend>
      <slot name="prepend" />
    </template>

    <!-- APPEND -->
    <template #append>
      <slot name="append" />
    </template>

    <!-- BEFORE -->
    <template #before>
      <slot name="before" />
    </template>

    <!-- AFTER -->
    <template #after>
      <slot name="after" />
    </template>

    <!-- HINT -->
    <template #hint>
      <slot name="hint" />
    </template>

    <!-- COUNTER -->
    <!-- <template #counter>
      <slot name="counter" />
    </template> -->
  </q-input>
</template>

<script setup>
  defineOptions({ inheritAttrs: false })
</script>
