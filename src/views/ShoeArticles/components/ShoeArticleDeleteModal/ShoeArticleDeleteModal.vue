<template>
  <Modal
    @onCloseHandle="onCloseHandle"
    :visible="props.visible"
    :title="props.title"
    onOkTitle="Yes">
      <p class="shoe-delete__modal-content">Are you sure can want to Delete Shoe Article: <span>{{ rowData?.name }}</span>?</p>
  </Modal>
</template> 

<script setup>
import Modal from '@/components/Modal/Modal.vue';
const emits = defineEmits(['closeHandle']);
const props = defineProps({
  rowData: {
    type: Object,
    required: true,
  },
  title: {
    type: String,
    default: "Delete Shoe Article"
  },
  visible: {
    type: Boolean,
    required: true,
    default: false,
  }
});

const onCloseHandle = () =>{
  emits('closeHandle');
}
</script>

<style lang="scss" scoped>
@import './ShoeArticleDeleteModal.scss';
</style>