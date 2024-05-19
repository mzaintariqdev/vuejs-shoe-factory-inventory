<template>
  <a-spin :spinning="isLoading">
    <div class="settings">
      <p class="settings__profile">User Profile</p>
      <LabelValueComp label="User Email" :value="user?.email"/>
      <LabelValueComp label="User name" :value="user?.userName"/>
      <LabelValueComp label="User Role Type" :value="user?.userType"/>
      <ResetPasswordForm />
    </div>
  </a-spin>
</template>

<script setup>
import LabelValueComp from '@/components/LabelValueComp/LabelValueComp.vue';
import ResetPasswordForm from '@/components/ResetPasswordForm/ResetPasswordForm.vue';
import { computed, toRaw } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const user = toRaw(store.getters.getUser);
const isLoading = computed(() => store.getters.isLoading);

</script>

<style scoped>
@import './settings.scss';
</style>