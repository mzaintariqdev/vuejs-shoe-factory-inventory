<template>
  <a-layout-sider
    :style="{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0, top: 0, bottom: 0 }"
  >
    <div style="padding-top: 60px;" class="logo" />
    <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
      <template v-for="route in routes" :key="route.path">
        <router-link :to="route.path">
          <a-menu-item :key="route.path">
            <component :is="route.icon" />
            <span class="nav-text">{{ route.name }}</span>
          </a-menu-item>
        </router-link>
      </template>
    </a-menu>
  </a-layout-sider>
</template>


<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { SidebarRoutes } from './constants';

const route = useRoute();
const selectedKeys = ref(['/']);

onMounted(() => {
  // Set the default selected key based on the current route
  selectedKeys.value = [route.path];
});

// Array of routes
const routes = ref(SidebarRoutes);
</script>
