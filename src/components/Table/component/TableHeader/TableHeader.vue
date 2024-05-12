<template >
  <div class="custom-header">
    <p class="custom-header__title">{{ headerText }}</p>
    <a-button v-show="showAddBtn" @click.prevent="onAddBtnClick" class="custom-header__btn" type="primary" >
    <template #icon>
      <PlusOutlined />
      Add {{ AddBtnText }}
    </template>
  </a-button>
  </div>
</template>


<style scoped lang="scss">
@import './TableHeader.scss';

</style>
<script setup>
import { PlusOutlined } from '@ant-design/icons-vue';
const emits =defineEmits(['OnAddBtnClick']);
const props = defineProps({
  showAddBtn: {
    type: Boolean,
    default: true,
  },
  AddBtnText: {
    type: String,
  },
  headerText: {
    type: String,
  }
})

const onAddBtnClick = ()=>{
  console.log('sasa')
  emits('OnAddBtnClick');
}
</script>