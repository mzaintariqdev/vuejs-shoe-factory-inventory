<template>
  
  <Table
    :showHeader="true"
    :showAddBtn="true"
    :columns="employeeColumns"
    :data="tableData"
    :total="total"
    :currentPage="currentPage"
    :limit="limit"
    AddBtnText="Employees"
    headerText="Employees"
    @onChange="handleOnChange"
    @onSizeChange="handleOnSizeChange"
  />
</template>
<script setup>
import { employeeColumns } from '@/utils/columns.js';
import Table from '@/components/Table/Table.vue';
import { onMounted, ref, watch } from 'vue';
import { dummyEmployees } from '@/utils/dmmyData';

const data = dummyEmployees;

const currentPage = ref(1);
const limit = ref(5);
const tableData= ref([]);
const total= ref(data.length);
const handleOnChange=(page)=>{
  currentPage.value=page;
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

