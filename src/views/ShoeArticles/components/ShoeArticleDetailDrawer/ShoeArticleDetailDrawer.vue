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
    <LabelValueComp label="Name" :value="props.rowData?.name" />
    <LabelValueComp label="Article No" :value="props.rowData?.articleNo" />
    <LabelValueComp label="Type" :value="props.rowData?.type" />
    <TagLabelValueComp label="Colors" :value="props.rowData?.colors" />

      <div class="shoe-article-detail__actions">
          <a-button type="primary" @click.prevent="onSubmit" class="close-button">Close</a-button>
      </div>
    </Drawer>
  </div>
</template>

<script setup>
import Drawer from '@/components/Drawer/Drawer.vue';
import LabelValueComp from '@/components/LabelValueComp/LabelValueComp.vue';
import TagLabelValueComp from '@/components/TagLabelValueComp/TagLabelValueComp.vue';

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
    closeDrawer();
};

// Method to close the drawer
const closeDrawer = () => {
  emits('onDrawerClose');
};

</script>

<style scoped lang="scss">
@import './ShoeArticleDetailDrawer.scss';
</style>