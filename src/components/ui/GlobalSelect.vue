<template>
  <q-select v-bind="$attrs" outlined rounded dense class="global-field">
    <template #prepend>
      <slot name="prepend" />
    </template>

    <template #append>
      <slot name="append" />
    </template>

    <template #before>
      <slot name="before" />
    </template>

    <template #after>
      <slot name="after" />
    </template>

    <template #hint>
      <slot name="hint" />
    </template>
  </q-select>
</template>

<script setup>
  defineOptions({ inheritAttrs: false })
</script>
