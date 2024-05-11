<template>
    <a-statistic class="custom-stats" :title="title" :value="value">
      <template #prefix>
        <component :is="icon" />
      </template>
    </a-statistic>
</template>


<style scoped lang="scss">
@import './StatisticContainer.scss';
</style>

<script setup>

const props = defineProps({
  title: {
    type: String,
    default: '',
    required: true,
  },
  value: {
    type: Number,
    default: 0,
  },
  icon: {
    type: Object,
  }
})
console.log(props)
</script>