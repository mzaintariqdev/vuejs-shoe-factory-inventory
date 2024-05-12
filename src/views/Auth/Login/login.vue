<template>
  <div class="login-page">
    <div class="LogInForm">
      <a-form :requiredMark="false" @finish="onSubmit" :layout="formLayout.layout" ref="formRef" :model="formState" :rules="rules" class="login-form">
        <p class="login-form__title">Login</p>
        <div class="login-form__container">
          <a-form-item label="Email" name="email">
            <a-input v-model:value="formState.email" placeholder="Enter your email" />
          </a-form-item>
          <a-form-item label="Password" name="password">
            <a-input v-model:value="formState.password" type="password" placeholder="Enter your password" />
          </a-form-item>
          <div className="actions">
            <a-button type="text" class="forget-btn" >
              <router-link :to="forgetPassUrl">
                Forgot Password?
              </router-link>
            </a-button>
          <a-form-item>
            <a-button type="primary" htmlType="submit" class="login-button">Login</a-button>
          </a-form-item>
        </div>
        </div>
      </a-form>
    </div>
  </div>
</template>

<script setup>
import { forgetPassUrl } from '@/routes/urls';
import { reactive, ref } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const formLayout = reactive({
  layout: 'vertical'
});
const formRef = ref();
const formState = ref({
  email: '',
  password: ''
});

const rules = {
  email: [
    {
      required: true,
      message: 'Please enter your email',
      trigger: 'blur'
    },
    {
      type: 'email',
      message: 'Please enter a valid email',
      trigger: ['blur', 'change']
    }
  ],
  password: [
    {
      required: true,
      message: 'Please enter your password',
      trigger: 'blur'
    }
  ]
};

const onSubmit = () => {
  formRef.value.validate()
    .then(() => {
      // Form is valid, handle login logic here
      store.dispatch('login', { email: formState.value.email, password: formState.value.password });
      console.log('Login successful',formState.value); 
    })
    .catch(() => {
      // Form validation failed
      console.log('Form validation failed');
    });
};
</script>

<style scoped lang="scss">
@import './Login.scss';
</style>
