<template>
  <a-row class="home-stats" gutter="12">
    <a-col>
      <StatisticContainer title="Total Employees" value="5" :icon="UserOutlined"/>  
    </a-col>
    <a-col>
      <StatisticContainer title="Total Shoe Articles" value="5" :icon="FileTextOutlined"/>  
    </a-col>
  </a-row>
</template>


<script setup>
import StatisticContainer from '@/components/StatisticContainer/StatisticContainer.vue';
import { UserOutlined, FileTextOutlined } from '@ant-design/icons-vue';
</script>

<style scoped>
@import './home.scss';
</style>