<template>
  <a-spin :spinning="isLoading">
    <div class="edit-show-article__container">
        <p class="edit-show-article__container-heading">
          Edit Shoe Article
        </p>
        <a-form layout="vertical" class="edit-show-article__container-form">
        <a-row gutter="12" class="input__container">
          <a-col span="12">
            <a-form-item class="edit-shoe-article__form-input" label="Name" v-bind="validateInfos['name']">
              <a-input v-model:value="modelRef.name" />
            </a-form-item>
          </a-col>
          <a-col span="12">
            <a-form-item class="edit-shoe-article__form-input" label="Article No" v-bind="validateInfos['articleNo']">
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
            <a-button type="primary" @click.prevent="onSubmit" class="edit-show-article-button">Update</a-button>
          </a-form-item>
          <a-form-item>
            <a-button  @click.prevent="goBack" class="cancel-button">Go Back</a-button>
          </a-form-item>
        </div>
    </a-form>
    </div>
  </a-spin>
</template>

<script setup>
import { computed, reactive, onMounted, watch } from 'vue';
import { Form } from 'ant-design-vue';
import { useRoute, useRouter } from 'vue-router';
import { shoeArticlesUrl } from '@/routes/urls';
import { colorOptions, typeOptions } from '@/utils/constants';
import { useStore } from 'vuex';
const useForm = Form.useForm;
const router = useRouter();
const route = useRoute();
const store = useStore();
const shoeArticleId = route.params.id;
const isLoading = computed(()=>store.getters.isShoeArticleLoading);
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
      store.dispatch('updateShoeArticle', {
          id: Number(shoeArticleId),
          colors: modelRef.colors,
          name: modelRef.name,
          articleNo: modelRef.articleNo,
          type: modelRef.type,
    });
    })
    .catch(err => {
      console.log('error', err);
    });
};

// Method to close the drawer
const goBack = () => {
  resetFields();
  router.push(shoeArticlesUrl);
};


onMounted(() => {
  store.dispatch('fetchShoeArticleById', shoeArticleId);
});

watch(
  () => store.getters.getShoeArticleById,
  (shoeArticle) => {
    if (shoeArticle) {
      modelRef.name = shoeArticle.name;
      modelRef.colors = shoeArticle.colors;
      modelRef.type = shoeArticle.type;
      modelRef.articleNo = shoeArticle.articleNo;
    }
  },
  { immediate: true }
);

</script>

<style scoped lang="scss">
@import './EditShoeArticle.scss';
</style>