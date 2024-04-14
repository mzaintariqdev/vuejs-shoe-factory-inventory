<template>
  <a-layout has-sider>
   <Sidebar />
    <a-layout :style="{ marginLeft: '200px' }">
      <Header />
      <a-layout-content :style="{ padding: '25px', margin: '24px 16px 0', overflow: 'initial' }">
        <div :style="{ padding: '24px' }">
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


