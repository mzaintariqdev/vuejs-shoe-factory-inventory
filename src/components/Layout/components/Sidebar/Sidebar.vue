<template>
  <a-layout-sider
    class="sidebar"
    :style="{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0, top: 0, bottom: 0 }"
  >
    <div class="logo">
      <p>The Shoes Inventory</p>
    </div>
    <a-menu v-model:selectedKeys="selectedKeys" theme="dark">
      <template v-for="route in allowedRoutes" :key="route.path">
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
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { SidebarRoutes } from './constants';
import { roles } from '@/routes/roles';

const route = useRoute();
const selectedKeys = ref(['/']);

onMounted(() => {
  // Set the default selected key based on the current route
  selectedKeys.value = [route.path];
});

// Array of routes
const routes = ref(SidebarRoutes);
const userRole = roles.admin;

const allowedRoutes = ref([]);

const updateAllowedRoutes = () => {
  allowedRoutes.value = routes.value.filter(route => route.acceptedTypes.includes(userRole));
};

// Update allowed routes when the component is mounted
onMounted(updateAllowedRoutes);

// Watch for changes to the user's role and update allowed routes accordingly
watch(() => userRole, () => {
  updateAllowedRoutes();
});

// Watch for changes to the route and update selectedKeys accordingly
watch(() => route.path, (newPath) => {
  selectedKeys.value = [newPath];
});
</script>

<style lang="scss" scoped>
@import './Sidebar.scss';
</style>
