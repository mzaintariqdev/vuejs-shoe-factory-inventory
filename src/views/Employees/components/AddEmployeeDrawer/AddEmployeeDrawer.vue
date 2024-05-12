<template>
  <div>
    <Drawer
      class="custom-drawer"
      :drawerTitle="title"
      :placement="'right'" 
      :closeable="true" 
      :open="open"
      @closed="closeDrawer" 
    >
    <a-form layout="vertical" class="add-employee__form">
      <a-row gutter="12" class="input__container">
        <a-col span="12">
          <a-form-item class="add-employee__form-input" label="Name" v-bind="validateInfos['name']">
            <a-input v-model:value="modelRef.name" />
          </a-form-item>
        </a-col>
        <a-col span="12">
          <a-form-item class="add-employee__form-input" label="Email" v-bind="validateInfos['email']">
            <a-input v-model:value="modelRef.email" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row gutter="12" class="input__container">
        <a-col span="12">
          <a-form-item class="add-employee__form-input" label="Department" v-bind="validateInfos['department']">
            <a-select v-model:value="modelRef.department" placeholder="please select your zone">
              <a-select-option value="shanghai">Zone one</a-select-option>
              <a-select-option value="beijing">Zone two</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col span="12">
          <a-form-item class="add-employee__form-input" label="Password" v-bind="validateInfos['password']">
            <a-input v-model:value="modelRef.password" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row gutter="12" class="input__container">
        <a-col span="12">
          <a-form-item class="add-employee__form-input" label="Phone Number" v-bind="validateInfos['phoneNumber']">
            <a-input v-model:value="modelRef.phoneNumber" />
          </a-form-item>
        </a-col>
        <a-col span="12">
          <a-form-item class="add-employee__form-input" label="Age" v-bind="validateInfos['age']">
            <a-input-number v-model:value="modelRef.age" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row gutter="12" class="input__container">
        <a-col span="24">
          <a-form-item class="add-employee__form-input" label="Address" v-bind="validateInfos['address']">
              <a-textarea :rows="4" v-model:value="modelRef.address" />
          </a-form-item>
        </a-col>
      </a-row>
      <div class="actions">
        <a-form-item>
          <a-button type="primary" @click.prevent="onSubmit" class="add-employee-button">Add Employee</a-button>
        </a-form-item>
        <a-form-item>
          <a-button  @click.prevent="closeDrawer" class="cancel-button">Close</a-button>
        </a-form-item>
      </div>
  </a-form>
    </Drawer>
  </div>
</template>

<script setup>
import Drawer from '@/components/Drawer/Drawer.vue';
import { ref } from 'vue';
import { reactive, toRaw } from 'vue';
import { Form } from 'ant-design-vue';
const useForm = Form.useForm;
const emits = defineEmits(['onDrawerClose']);
const props = defineProps({
  open: {
    type: Boolean,
    default: false,
  },
  title : {
    type: String,
    default: '',
  }
})

const modelRef = reactive({
  password: '',
  name: '',
  department: '',
  age: 18,
  email: '',
  phoneNumber: '',
  address: '',
});

const { resetFields, validate, validateInfos } = useForm(
  modelRef,
  reactive({
    phoneNumber: [
  {
    required: true,
    validator: (rule, value) => {
      // If the field is empty, return a resolved Promise
      if (!value) {
        return Promise.reject('Please enter a valid phone number');
      }

      // Validate phone number format
      const phoneRegex = /^\+?[0-9]{10,16}$/;
      if (!phoneRegex.test(value)) {
        return Promise.reject('Please enter a valid phone number');
      }

      // If the phone number passes both format and length validations, return a resolved Promise
      return Promise.resolve();
    },
    trigger: ['blur', 'change'],
  }
],
    address: [
    {
      required: true,
      message: 'Please Enter the address',
      trigger: 'blur',
    },
  ],
    department: [
    {
      required: true,
      message: 'Please select a department',
      trigger: 'change',
    },
  ],
    age: [{ type: 'number', min: 18, max: 99, required: true }],
    email: [{ type: 'email', required: true }],
    name: [
    {
      required: true,
      message: 'Please Enter name',
      trigger: 'change',
    },
    {
      min: 4,
      message: 'Min Length should be 4',
      trigger: ['blur', 'change'],
    },
  ],
    password: [
      {
        required: true,
        message: 'Please Enter naw password',
        trigger: ['focus', 'submit']
      },
      {
        min: 4,
        message: 'Min Length should be 4',
        trigger: ['blur', 'change'],
    },
    ],
  }),
);

const onSubmit = () => {
  validate()
    .then(res => {
      console.log(res, toRaw(modelRef));
      // resetFields();
    })
    .catch(err => {
      console.log('error', err);
    });
};

// Method to close the drawer
const closeDrawer = () => {
  resetFields();
  emits('onDrawerClose');
};

</script>

<style scoped lang="scss">
@import './AddEmployeeDrawer.scss';
</style>