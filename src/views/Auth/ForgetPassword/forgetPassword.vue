<template>
  <a-spin :spinning="isLoading">
    <div class="forget-page">
      <div class="forgetPasswordForm">
        <a-form :requiredMark="false" @finish="onSubmit" :layout="formLayout.layout" ref="formRef" :model="formState" :rules="rules" class="forget-form">
          <p class="forget-form__title">Forget Password</p>
          <div class="forget-form__container">
            <a-form-item label="Email" name="email">
              <a-input v-model:value="formState.email" placeholder="Enter your email" />
            </a-form-item>
            <div className="actions">
              <a-button type="text" class="login-btn" >
                <router-link :to="loginUrl">
                  Go back to Login
                </router-link>
              </a-button>
            <a-form-item>
              <a-button type="primary" htmlType="submit" class="forget-button">Get Reset Link</a-button>
            </a-form-item>
          </div>
          </div>
        </a-form>
      </div>
    </div>
  </a-spin>
</template>

<script setup>
import { loginUrl } from '@/routes/urls';
import { computed, reactive, ref } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const isLoading = computed(() => store.getters.isLoading);

const formLayout = reactive({
  layout: 'vertical'
});
const formRef = ref();
const formState = ref({
  email: '',
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
};

const onSubmit = () => {
  formRef.value.validate()
    .then(() => {
      store.dispatch('forgetPasswordLink', { email: formState.value.email });
      formState.value.email = '';
    })
    .catch(() => {
      // Form validation failed
      console.log('Form validation failed');
    });
};
</script>

<style scoped lang="scss">
@import './ForgetPassword.scss';
</style>
