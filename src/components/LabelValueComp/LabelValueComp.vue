<template>
  <div class="label-value-comp">
    <p class="label-value-comp__label">{{ label }}</p>
    <p class="label-value-comp__value">{{ value }}</p>
  </div>
</template>

<script setup>
  const props  = defineProps({
    label: {
      type: String,
      default: '',
      required: true,
    },
    value: {
      type: String,
      default: '',
      required: true,
    }
  })
</script>

<style scoped lang="scss">
@import './LabelValueComp.scss';
</style>