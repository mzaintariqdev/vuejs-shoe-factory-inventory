<template>
  <TableHeader
    @-on-add-btn-click="OnAddBtnClick"
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
    <template #bodyCell="{ column, record }">
      <template v-if="column.dataIndex === 'colors'">
        {{ record?.colors?.length }}
      </template>
      <template v-if="column.dataIndex === 'operation'">
        <span @click="onView(record)" class="actions">
            <EyeOutlined />
        </span>
        <span @click="onDelete(record)" class="actions">
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


const emits =defineEmits(['onChange', 'onSizeChange', 'onAddBtnClick', 'onDeleteIconClick', 'onViewIconClick'])

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

const onView = (record) => {
  emits('onViewIconClick', record)
}

const onDelete = (record)=>{
  emits('onDeleteIconClick', record)
}

const onSizeChangeHandle = (_,showSizeChange) => {
  emits('onSizeChange', showSizeChange);
  paginationConfig.pageSize=Number(showSizeChange);
}

const OnAddBtnClick = ()=> {
  emits('onAddBtnClick');
  console.log('consol')
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
