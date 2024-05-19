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
    <a-spin :spinning="isLoading">
      <a-form layout="vertical" class="add-shoe-article__form">
        <a-row gutter="12" class="input__container">
          <a-col span="12">
            <a-form-item class="add-shoe-article__form-input" label="Name" v-bind="validateInfos['name']">
              <a-input v-model:value="modelRef.name" />
            </a-form-item>
          </a-col>
          <a-col span="12">
            <a-form-item class="add-shoe-article__form-input" label="Article No" v-bind="validateInfos['articleNo']">
              <a-input v-model:value="modelRef.articleNo" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row gutter="12" class="input__container">
          <a-col span="12">
            <a-form-item class="add-shoe-article__form-input" label="Type" v-bind="validateInfos['type']">
              <a-select v-model:value="modelRef.type" placeholder="please select Type">
                <a-select-option v-for="typeOption in typeOptions" :key="typeOption.value" :value="typeOption.value">
                  {{ typeOption.label }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col span="12">
            <a-form-item class="add-shoe-article__form-input" label="Colors" v-bind="validateInfos['colors']">
              <a-select
                v-model:value="modelRef.colors"
                mode="multiple"
                placeholder="Please select"
                :options="colorOptions"
              >
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <div class="actions">
          <a-form-item>
            <a-button type="primary" @click.prevent="onSubmit" class="add-shoe-article-button">Add Shoe Article</a-button>
          </a-form-item>
          <a-form-item>
            <a-button  @click.prevent="closeDrawer" class="cancel-button">Close</a-button>
          </a-form-item>
        </div>
      </a-form>
    </a-spin>
    </Drawer>
  </div>
</template>

<script setup>
import Drawer from '@/components/Drawer/Drawer.vue';
import { computed, ref } from 'vue';
import { reactive, toRaw } from 'vue';
import { Form } from 'ant-design-vue';
import { useStore } from 'vuex';
import { colorOptions, typeOptions } from '@/utils/constants';
const store = useStore();
const isLoading = computed(()=>store.getters.isOperationShoeArticleLoading);

const useForm = Form.useForm;
const emits = defineEmits(['onDrawerClose']);
const props = defineProps({
  open: {
    type: Boolean,
    default: false,
  },
  title : {
    type: String,
    default: '',
  }
})

const modelRef = reactive({
  name: '',
  articleNo: '',
  colors: [],
  type: '',
});


const { resetFields, validate, validateInfos } = useForm(
  modelRef,
  reactive({
    colors:  [
        {
          type: 'array',
          required: true,
          message: 'Please select at least one Color',
          trigger: 'change',
        },
      ],
    type: [
    {
      required: true,
      message: 'Please select a Type',
      trigger: 'change',
    },
  ],
   articleNo: [
    {
      required: true,
      message: 'Please Enter Article No',
      trigger: 'change',
    },
    {
      min: 2,
      message: 'Min Length should be 2',
      trigger: ['blur', 'change'],
    },
  ],
    name: [
    {
      required: true,
      message: 'Please Enter name',
      trigger: 'change',
    },
    {
      min: 4,
      message: 'Min Length should be 4',
      trigger: ['blur', 'change'],
    },
  ],
  }),
);

const onSubmit = () => {
  validate()
    .then(res => {
      store.dispatch('addShoeArticle', {
          name: modelRef.name,
          articleNo: modelRef.articleNo,
          type: modelRef.type,
          colors: modelRef.colors,
    })
    })
    .catch(err => {
      console.log('error', err);
    });
};

// Method to close the drawer
const closeDrawer = () => {
  resetFields();
  emits('onDrawerClose');
};

</script>

<style scoped lang="scss">
@import './AddShoeArticleDrawer.scss';
</style>