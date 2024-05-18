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
    @onDeleteIconClick="showModal"
    @onEditIconClick="redirectToEditPage"
    @onViewIconClick="handleDetailDrawer"
    @onChange="handleOnChange"
    @onSizeChange="handleOnSizeChange"
    @OnAddBtnClick="handleAddBtnDrawer"
  />
  <AddEmployeeDrawer :open="openDrawer" title="Add Employee" @onDrawerClose="handleCloseDrawer" />
  <DeleteEmployeeModal :rowData="selectedRow" :visible="visibleModal" @closeHandle="closeModal" />
  <EmployeeDetailDrawer :rowData="selectedRow" :open="openDetailDrawer" title="Employee Details" @onDrawerClose="handleCloseDetailDrawer" />

</template>
<script setup>
import AddEmployeeDrawer from './components/AddEmployeeDrawer/AddEmployeeDrawer.vue';
import { employeeColumns } from '@/utils/columns.js';
import Table from '@/components/Table/Table.vue';
import { onMounted, ref, watch } from 'vue';
import { mockEmployees } from '@/utils/mocks/mockEmployees';
import DeleteEmployeeModal from './components/DeleteEmployeeModal/DeleteEmployeeModal.vue';
import EmployeeDetailDrawer from './components/EmployeeDetailDrawer/EmployeeDetailDrawer.vue';
import { useRouter } from 'vue-router';
import { employeesUrl } from '@/routes/urls';

const visibleModal = ref(false);
const selectedRow = ref(null);
const data = mockEmployees;
const openDrawer = ref(false);
const openDetailDrawer = ref(false);
const currentPage = ref(1);
const limit = ref(5);
const tableData= ref([]);
const total= ref(data.length);
const router = useRouter();

const redirectToEditPage = (id) =>{
  router.push(`${employeesUrl}/${id}`)
}

const handleOnChange=(page)=>{
  currentPage.value=page;
}

const showModal = (record) => {
  selectedRow.value = record;
  visibleModal.value = true;
};

const closeModal = () => {
  visibleModal.value = false;
};

const handleAddBtnDrawer =()=>{
  openDrawer.value=true;
}

const handleDetailDrawer = (record) => {
  selectedRow.value = record;
  openDetailDrawer.value= true;
}

const handleCloseDetailDrawer =()=>{
  openDetailDrawer.value=false;
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

