<template>
  
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
    @onViewIconClick="handleDetailDrawer"
    @onChange="handleOnChange"
    @onSizeChange="handleOnSizeChange"
    @OnAddBtnClick="handleAddBtnDrawer"
  />
  <AddShoeArticleDrawer :open="openDrawer" title="Add Shoe Article" @onDrawerClose="handleCloseDrawer" />
  <ShoeArticleDeleteModal :rowData="selectedRow" :visible="visibleModal" @closeHandle="closeModal" />
  <ShoeArticleDetailDrawer :rowData="selectedRow" :open="openDetailDrawer" title="Shoe Article Details" @onDrawerClose="handleCloseDetailDrawer" />
</template>
<script setup>
import { shoeArticleColumns } from '@/utils/columns.js';
import Table from '@/components/Table/Table.vue';
import { onMounted, ref, watch } from 'vue';
import { mockShoeArticle } from '@/utils/mocks/mockShoeArticles';
import AddShoeArticleDrawer from './components/AddShoeArticleDrawer/AddShoeArticleDrawer.vue';
import ShoeArticleDeleteModal from './components/ShoeArticleDeleteModal/ShoeArticleDeleteModal.vue';
import ShoeArticleDetailDrawer from './components/ShoeArticleDetailDrawer/ShoeArticleDetailDrawer.vue';

const data = mockShoeArticle;
const visibleModal = ref(false);
const openDetailDrawer = ref(false);
const selectedRow = ref(null);
const openDrawer = ref(false);
const currentPage = ref(1);
const limit = ref(5);
const tableData= ref([]);
const total= ref(data.length);


const handleDetailDrawer = (record) => {
  selectedRow.value = record;
  openDetailDrawer.value= true;
}

const handleCloseDetailDrawer =()=>{
  openDetailDrawer.value=false;
}

const showModal = (record) => {
  selectedRow.value = record;
  visibleModal.value = true;
};

const closeModal = () => {
  visibleModal.value = false;
};

const handleOnChange=(page)=>{
  currentPage.value=page;
}


const handleAddBtnDrawer =()=>{
  openDrawer.value=true;
}


const handleCloseDrawer =()=>{
  openDrawer.value=false;
}

const handleOnSizeChange=(pageSize)=>{
  limit.value=pageSize;
}




const fetchData = () => {
  // Simulated API call to fetch data based on current page and page size
  // Adjust this logic according to your actual data fetching mechanism
  const startIndex = (currentPage.value - 1) * limit.value;
  const endIndex = startIndex + limit.value;
  tableData.value = data.slice(startIndex, endIndex);
}

// Watch for changes in currentPage and limit and trigger data fetching
watch([currentPage, limit], () => {
  fetchData();
});

onMounted(() => {
  fetchData();
});

</script>
<style scoped>

</style>

