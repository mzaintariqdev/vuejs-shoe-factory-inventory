export const employeeColumns = [
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Email',
    dataIndex: 'email',
  },
  {
    title: 'Department',
    dataIndex: 'department',
  },
  {
    title: '',
    dataIndex: 'operation',
    scopedSlots: { customRender: 'operation' },
  },
];


export const shoeArticleColumns = [
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Colors',
    dataIndex: 'colors',
  },
  {
    title: 'Article No',
    dataIndex: 'articleNo',
  },
  {
    title: '',
    dataIndex: 'operation',
    scopedSlots: { customRender: 'operation' },
  },
];