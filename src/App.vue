<template>
    <RouterView />
</template>

<script setup>
import { onMounted } from 'vue';
import { RouterView } from 'vue-router';
import { useStore } from 'vuex';

const store = useStore(); // Access the Vuex store instance

// Dispatch action to check if the user is authenticated when the component is mounted
onMounted(() => {
  store.dispatch('checkIsUserAuthenticated');
});
</script>