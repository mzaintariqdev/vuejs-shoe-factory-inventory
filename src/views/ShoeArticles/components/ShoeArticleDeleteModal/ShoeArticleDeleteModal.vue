<template>
  <Modal
    @onCloseHandle="onCloseHandle"
    @OnOkHandle="onSubmit"
    :visible="props.visible"
    :title="props.title"
    onOkTitle="Yes">
    <a-spin :spinning="isLoading">
      <p class="shoe-delete__modal-content">Are you sure can want to Delete Shoe Article: <span>{{ rowData?.name }}</span>?</p>
    </a-spin>
  </Modal>
</template> 

<script setup>
import Modal from '@/components/Modal/Modal.vue';import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const isLoading = computed(()=>store.getters.isOperationShoeArticleLoading);
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


const onSubmit = () =>{
  store.dispatch('deleteShoeArticle', props.rowData?.id);
}

const onCloseHandle = () =>{
  emits('closeHandle');
}
</script>

<style lang="scss" scoped>
@import './ShoeArticleDeleteModal.scss';
</style>