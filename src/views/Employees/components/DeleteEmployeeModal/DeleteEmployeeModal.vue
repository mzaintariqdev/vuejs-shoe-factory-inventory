<template>
  <Modal
    @onCloseHandle="onCloseHandle"
    @OnOkHandle="onSubmit"
    :visible="props.visible"
    :title="props.title"
    onOkTitle="Yes">
  <a-spin :spinning="isLoading">
      <p class="employee-delete__modal-content">Are you sure can want to Delete Employee: <span>{{ rowData?.name }}</span>?</p>
  </a-spin>
  </Modal>
</template> 

<script setup>
import Modal from '@/components/Modal/Modal.vue';
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const isLoading = computed(()=>store.getters.isOperationEmployeeLoading);
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

const onSubmit = () =>{
  store.dispatch('deleteEmployee', props.rowData?.id);
}

const onCloseHandle = () =>{
  emits('closeHandle');
}
</script>

<style lang="scss" scoped>
@import './DeleteEmployeeModal.scss';
</style>