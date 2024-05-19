<template>
  <a-form layout="vertical" class="reset-form">
    <a-form-item class="reset-input" label="Reset Password" v-bind="validateInfos['password']">
      <a-input v-model:value="modelRef.password" />
    </a-form-item>
    <a-form-item>
      <a-button type="primary" @click.prevent="onSubmit"class="reset-button">Reset Password</a-button>
    </a-form-item>
  </a-form>
</template>
<script setup>
import { reactive, toRaw } from 'vue';
import { Form } from 'ant-design-vue';
import { useStore } from 'vuex';
const useForm = Form.useForm;
const store = useStore();
const user = store.getters.getUser;
const modelRef = reactive({
  password: '',
});
const { resetFields, validate, validateInfos } = useForm(
  modelRef,
  reactive({
    password: [
      {
        required: true,
        message: 'Please Enter naw password',
      },
    ],
  }),
);
const onSubmit = () => {
  validate()
    .then(res => {
      store.dispatch('resetPassword', {email: user?.email, password: modelRef.password} )
      resetFields();
    })
    .catch(err => {
      console.log('error', err);
    });
};

</script>

<style scoped lang="scss">
@import './ResetPasswordForm.scss';
</style>