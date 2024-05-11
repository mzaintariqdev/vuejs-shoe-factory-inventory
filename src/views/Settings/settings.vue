<template>
  <div class="settings">
    <p class="settings__profile">User Profile</p>
    <LabelValueComp label="User Email" value="mzaintariqdev@gmail.com"/>
    <LabelValueComp label="User name" value="mzaintariq"/>
    <LabelValueComp label="User Role Type" value="Admin"/>
    <ResetPasswordForm />
  </div>
</template>

<script setup>
import LabelValueComp from '@/components/LabelValueComp/LabelValueComp.vue';
import ResetPasswordForm from '@/components/ResetPasswordForm/ResetPasswordForm.vue';

</script>

<style scoped>
@import './settings.scss';
</style>