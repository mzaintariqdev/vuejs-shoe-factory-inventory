<template>
  <div>
    <Drawer
      class="custom-drawer"
      :drawerTitle="title"
      :placement="'right'" 
      :closeable="true" 
      :open="open"
      @closed="closeDrawer" 
    >
    <LabelValueComp label="Email" :value="props.rowData?.email" />
    <LabelValueComp label="Name" :value="props.rowData?.name" />
    <LabelValueComp label="Phone no" :value="props.rowData?.phoneNumber" />
    <LabelValueComp label="Department" :value="props.rowData?.department" />
    <LabelValueComp label="Age" :value="props.rowData?.age" />
    <LabelValueComp label="Address" :value="props.rowData?.address" />

      <div class="employee-detail__actions">
          <a-button type="primary" @click.prevent="onSubmit" class="close-button">Close</a-button>
      </div>
    </Drawer>
  </div>
</template>

<script setup>
import Drawer from '@/components/Drawer/Drawer.vue';
import LabelValueComp from '@/components/LabelValueComp/LabelValueComp.vue';

const emits = defineEmits(['onDrawerClose']);
const props = defineProps({
  open: {
    type: Boolean,
    default: false,
  },
  title : {
    type: String,
    default: '',
  }, 
  rowData: {
    type: Object,
    required: true,
  }
})



const onSubmit = () => {
  // validate()
  //   .then(res => {
  //     console.log(res, toRaw(modelRef));
  //     resetFields();
      closeDrawer();
    // })
    // .catch(err => {
    //   console.log('error', err);
    // });
};

// Method to close the drawer
const closeDrawer = () => {
  emits('onDrawerClose');
};

</script>

<style scoped lang="scss">
@import './EmployeeDetailDrawer.scss';
</style>