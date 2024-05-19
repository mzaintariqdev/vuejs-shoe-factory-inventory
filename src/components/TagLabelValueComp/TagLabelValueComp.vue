<template>
  <div class="tag-label-comp">
    <p class="tag-label-comp__label">{{ label }}</p>
    <div class="tag-label-comp__value">
      <a-tag
        v-for="(color, index) in value"
        :key="index"
        :color="color"
      >
        {{ color==="#FFE5B4"? 'Peach':color }}
      </a-tag>
    </div>
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
      type: Array,
      default: [],
      required: true,
    }
  })
</script>

<style scoped lang="scss">
@import './TagLabelValueComp.scss';
</style>