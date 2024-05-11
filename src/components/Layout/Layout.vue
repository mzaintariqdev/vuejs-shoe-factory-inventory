<template>
  <a-layout has-sider>
    <div class="layout-sidebar">
      <Sidebar />
    </div>
    <a-layout class="layout-content">
      <Header />
      <a-layout-content class="content">
        <div class="content-container">
          <router-view></router-view>
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script setup>
import Header from './components/Header/Header.vue';
import Sidebar from './components/Sidebar/Sidebar.vue';

</script>

<style scoped>
@import './Layout.scss';
</style>

