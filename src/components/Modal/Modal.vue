<template>
  <div>
    <a-modal class="custom-modal" @cancel="onCloseHandle" :maskClosable="true" :visible="visible" :title="props.title" footer="null">
      <slot></slot>
      <div class="custom-footer">
          <a-button type="primary" @click.prevent="handleOk" class="sub-button">{{ props.onOkTitle }}</a-button>
          <a-button  @click.prevent="onCloseHandle" class="cancel-button">Close</a-button>
      </div>
    </a-modal>
  </div>
</template>
<script setup>
    const props = defineProps({
      onOkTitle: {
        type: String,
        default: "OK",
      },
      title:{
        type: String,
        default: 'Title',
        required: true,
      },
      visible: {
        type: Boolean,
        required: true,
        default: false,
      }
    })

    const emits = defineEmits(['onCloseHandle']);

    const onCloseHandle = () =>{
      emits('onCloseHandle');
    }

    const handleOk = e => {
      emits('onCloseHandle');
    };

</script>

<style scoped lang="scss">
@import './Modal.scss';
</style>