<template>
  <a-spin :spinning="isShoeArticleLoading">
    <Table
      :showHeader="true"
      :showAddBtn="true"
      :columns="shoeArticleColumns"
      :data="tableData"
      :total="total"
      :currentPage="currentPage"
      :limit="limit"
      AddBtnText="Shoe Article"
      headerText="Shoe Articles"
      @onDeleteIconClick="showModal"
      @onEditIconClick="redirectToEditPage"
      @onViewIconClick="handleDetailDrawer"
      @onChange="handleOnChange"
      @onSizeChange="handleOnSizeChange"
      @OnAddBtnClick="handleAddBtnDrawer"
    />
  </a-spin>
  <AddShoeArticleDrawer :open="openDrawer" title="Add Shoe Article" @onDrawerClose="handleCloseDrawer" />
  <ShoeArticleDeleteModal :rowData="selectedRow" :visible="visibleModal" @closeHandle="closeModal" />
  <ShoeArticleDetailDrawer :rowData="selectedRow" :open="openDetailDrawer" title="Shoe Article Details" @onDrawerClose="handleCloseDetailDrawer" />
</template>
<script setup>
import { shoeArticleColumns } from '@/utils/columns.js';
import Table from '@/components/Table/Table.vue';
import { computed, onMounted, ref, watch } from 'vue';
import AddShoeArticleDrawer from './components/AddShoeArticleDrawer/AddShoeArticleDrawer.vue';
import ShoeArticleDeleteModal from './components/ShoeArticleDeleteModal/ShoeArticleDeleteModal.vue';
import ShoeArticleDetailDrawer from './components/ShoeArticleDetailDrawer/ShoeArticleDetailDrawer.vue';
import { useRouter } from 'vue-router';
import { shoeArticlesUrl } from '@/routes/urls';
import { useStore } from 'vuex';

const visibleModal = computed(()=>store.getters.isShoeArticleModalOpen);
const openDetailDrawer = ref(false);
const selectedRow = ref(null);
const openDrawer = computed(()=>store.getters.isShoeArticleDrawerOpen);
const currentPage = ref(1);
const limit = ref(5);
const isShoeArticleLoading = computed(() => store.getters.isShoeArticleLoading);
const tableData = computed(() => store.getters.allShoeArticles);
const total = computed(() => store.getters.allShoeArticles.length);
const router = useRouter();
const store = useStore();

const redirectToEditPage = (id) =>{
  router.push(`${shoeArticlesUrl}/${id}`)
}


const handleDetailDrawer = (record) => {
  selectedRow.value = record;
  openDetailDrawer.value= true;
}

const handleCloseDetailDrawer =()=>{
  openDetailDrawer.value=false;
}

const showModal = (record) => {
  selectedRow.value = record;
  store.dispatch('setOpenShoeArticleModal', true);
};

const closeModal = () => {
  store.dispatch('setOpenShoeArticleModal', false);
};

const handleOnChange=(page)=>{
  currentPage.value=page;
}


const handleAddBtnDrawer =()=>{
  store.dispatch('setOpenShoeArticleDrawer', true)
}


const handleCloseDrawer =()=>{
  store.dispatch('setOpenShoeArticleDrawer', false);
}

const handleOnSizeChange=(pageSize)=>{
  limit.value=pageSize;
}




const fetchData = () => {
  // Simulated API call to fetch data based on current page and page size
  // Adjust this logic according to your actual data fetching mechanism
  const startIndex = (currentPage.value - 1) * limit.value;
  const endIndex = startIndex + limit.value;
  tableData.value = tableData.value.slice(startIndex, endIndex);
}

// Watch for changes in currentPage and limit and trigger data fetching
watch([currentPage, limit], () => {
  fetchData();
});

onMounted(() => {
  if(tableData.value?.length <1){
  store.dispatch('fetchShoeArticles');
    fetchData();
  }
});
</script>
<style scoped>

</style>

