<template>
  <TableHeader
    v-show="showHeader"
    :showAddBtn="showAddBtn" 
    :AddBtnText="AddBtnText"
    :headerText="headerText"
  />
  <a-table
    class="custom-table"
    :pagination="hidePagination ? false : paginationConfig"
    :columns="columns"
    :data-source="data"
    bordered
  >
    <template #bodyCell="{ column, text }">
      <template v-if="column.dataIndex === 'operation'">
        <span class="actions">
            <EyeOutlined />
        </span>
        <span class="actions">
            <DeleteOutlined />
        </span>
        <span class="actions" >
          <EditOutlined />
        </span>
      </template>
    </template>
  </a-table>
</template>

<script setup>
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons-vue';
import TableHeader from './component/TableHeader/TableHeader.vue';


const emits =defineEmits(['onChange', 'onSizeChange'])

const props = defineProps({
  hidePagination: {
    type: Boolean,
    default: false,
  },
  showHeader: {
    type: Boolean,
    default: true,
  },
  showAddBtn: {
    type: Boolean,
    default: true,
  },
  AddBtnText: {
    type: String,
  },
  headerText: {
    type: String,
  },
  total: {
    type: Number,
    default: 0
  },
  currentPage: {
    type: Number,
    default: 1
  },
  limit: {
    type: Number,
    default: 5
  },
  columns: {
    type:  Array,
    required: true,
  },
  data: {
    type: Array,
    default: []
  }
});

const onChangeHandle = (page) => {
  emits('onChange', page);
  paginationConfig.current=Number(page);
}

const onSizeChangeHandle = (_,showSizeChange) => {
  emits('onSizeChange', showSizeChange);
  paginationConfig.pageSize=Number(showSizeChange);
}

const paginationConfig = {
  current: Number(props.currentPage), // Bind directly to reactive ref
  pageSize: Number(props.limit),
  pageSizeOptions: ['5', '10', '20', '30', '40'], // Page size options
  showSizeChanger: true,
  total: Number(props.total),
  onChange: onChangeHandle,
  onShowSizeChange: onSizeChangeHandle,
}

</script>

<style scoped lang="scss">
@import './Table.scss';
</style>
