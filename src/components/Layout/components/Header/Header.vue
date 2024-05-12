<template>
  <div>
    <a-layout-header class="header">
      <div class="mobile-sidebar" @click="openSidebar">
          <MenuOutlined class="icon" />
      </div>
      <a-popover v-model:visible="visible" trigger="click" placement="bottomLeft">
        <template #content class="popover-content">
          <div>
            <p @click="goToProfile" style="cursor: pointer">Profile</p>
            <p @click="signOut" style="cursor: pointer">Sign Out</p>
          </div>
        </template>
        <a-avatar :src="avatarSrc" style="cursor: pointer" />
      </a-popover>
    </a-layout-header>
    <Drawer 
      :drawerTitle="drawerTitle" 
      :placement="placement" 
      :open="drawerOpen" 
      @closed="handleDrawerClosed"
    >
      <Sidebar />
    </Drawer>
  </div>
</template>

<script setup>
import Drawer from '@/components/Drawer/Drawer.vue';
import { MenuOutlined } from '@ant-design/icons-vue';
import { ref, watchEffect } from 'vue';
import Sidebar from '../Sidebar/Sidebar.vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const drawerTitle = 'My Drawer Title';
const placement = 'left';
const drawerOpen = ref(false);
const windowSize = ref(window.innerWidth);
const visible = ref(false);
const router = useRouter()
const store = useStore();

const goToProfile = () => {
  // Navigate to the profile route
  router.push('/profile');
  hide();
};

const signOut = () => {
  // Perform sign-out logic
  store.dispatch('signout');
  console.log('Signing out...');
  hide();
};

const hide = () => {
  visible.value = false;
};

watchEffect(() => {
  const handleResize = () => {
    windowSize.value = window.innerWidth;
    if(window.innerWidth<=986){
      handleDrawerClosed();
    }
  };

  // Listen for window resize events
  window.addEventListener('resize', handleResize);

  // Remove the event listener when the component is unmounted
  return () => {
    window.removeEventListener('resize', handleResize);
  };
});

const openSidebar = () => {
  drawerOpen.value = true;
};

const handleDrawerClosed = () => {
  drawerOpen.value = false;
};

</script>

<style scoped lang="scss">
@import './Header.scss';
</style>
