<template>
  <Modal
    @onCloseHandle="onCloseHandle"
    :visible="props.visible"
    :title="props.title"
    onOkTitle="Yes">
      <p class="employee-delete__modal-content">Are you sure can want to Delete Employee: <span>{{ rowData?.name }}</span>?</p>
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
    default: "Delete Employee"
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
@import './DeleteEmployeeModal.scss';
</style>