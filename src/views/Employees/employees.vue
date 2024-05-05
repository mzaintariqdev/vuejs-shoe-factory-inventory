<template>
  
  <Table
    :showHeader="true"
    :showAddBtn="true"
    :columns="employeeColumns"
    :data="tableData"
    total="40"
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

const currentPage = ref(1);
const limit = ref(5);
const tableData= ref([]);
const handleOnChange=(page)=>{
  currentPage.value=page;
}


const handleOnSizeChange=(pageSize)=>{
  limit.value=pageSize;
}

const data = [
  {
    key: '1',
    name: 'John Brown',
    money: '￥300,000.00',
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    name: 'Jim Green',
    money: '￥1,256,000.00',
    address: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    name: 'Joe Black',
    money: '￥120,000.00',
    address: 'Sidney No. 1 Lake Park',
  },
  {
    key: '4',
    name: 'John Brown',
    money: '￥300,000.00',
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '5',
    name: 'Jim Green',
    money: '￥1,256,000.00',
    address: 'London No. 1 Lake Park',
  },
  {
    key: '6',
    name: 'Joe Black',
    money: '￥120,000.00',
    address: 'Sidney No. 1 Lake Park',
  },
  {
    key: '7',
    name: 'John Brown',
    money: '￥300,000.00',
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '8',
    name: 'Jim Green',
    money: '￥1,256,000.00',
    address: 'London No. 1 Lake Park',
  },
  {
    key: '9',
    name: 'Joe Black',
    money: '￥120,000.00',
    address: 'Sidney No. 1 Lake Park',
  },
  {
    key: '10',
    name: 'John Brown',
    money: '￥300,000.00',
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '11',
    name: 'Jim Green',
    money: '￥1,256,000.00',
    address: 'London No. 1 Lake Park',
  },
  {
    key: '12',
    name: 'Joe Black',
    money: '￥120,000.00',
    address: 'Sidney No. 1 Lake Park',
  },
  {
    key: '13',
    name: 'John Brown',
    money: '￥300,000.00',
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '14',
    name: 'Jim Green',
    money: '￥1,256,000.00',
    address: 'London No. 1 Lake Park',
  },
  {
    key: '15',
    name: 'Joe Black',
    money: '￥120,000.00',
    address: 'Sidney No. 1 Lake Park',
  },
];


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

