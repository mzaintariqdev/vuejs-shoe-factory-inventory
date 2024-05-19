<template>
  <a-spin :spinning="isLoading">
    <div class="edit-employee__container">
        <p class="edit-employee__container-heading">
          Edit Employee
        </p>
        <a-form layout="vertical" class="edit-employee__container-form">
          <a-row gutter="12" class="input__container">
            <a-col span="12">
              <a-form-item class="edit-employee__form-input" label="Name" v-bind="validateInfos['name']">
                <a-input v-model:value="modelRef.name" />
              </a-form-item>
            </a-col>
            <a-col span="12">
              <a-form-item class="edit-employee__form-input" label="Email" v-bind="validateInfos['email']">
                <a-input v-model:value="modelRef.email" />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row gutter="12" class="input__container">
            <a-col span="12">
              <a-form-item class="edit-employee__form-input" label="Department" v-bind="validateInfos['department']">
                <a-select v-model:value="modelRef.department" placeholder="please select your department">
                  <a-select-option v-for="departmentOption in departmentOptions" :key="departmentOption.value" :value="departmentOption.value">
                    {{ departmentOption.label }}
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col span="12">
              <a-form-item class="edit-employee__form-input" label="Age" v-bind="validateInfos['age']">
                <a-input-number v-model:value="modelRef.age" />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row gutter="12" class="input__container">
            <a-col span="12">
              <a-form-item class="edit-employee__form-input" label="Phone Number" v-bind="validateInfos['phoneNumber']">
                <a-input v-model:value="modelRef.phoneNumber" />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row gutter="12" class="input__container">
            <a-col span="24">
              <a-form-item class="edit-employee__form-input" label="Address" v-bind="validateInfos['address']">
                  <a-textarea :rows="4" v-model:value="modelRef.address" />
              </a-form-item>
            </a-col>
          </a-row>
          <div class="actions">
            <a-form-item>
              <a-button type="primary" @click.prevent="onSubmit" class="edit-employee-button">Update</a-button>
            </a-form-item>
            <a-form-item>
              <a-button  @click.prevent="goBack" class="cancel-button">Go Back</a-button>
            </a-form-item>
          </div>
      </a-form>
    </div>
  </a-spin>
</template>

<script setup>
import { computed, onMounted, reactive, toRaw, watch } from 'vue';
import { Form } from 'ant-design-vue';
import { employeesUrl } from '@/routes/urls';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { departmentOptions } from '@/utils/constants';

const useForm = Form.useForm;
const router = useRouter();
const route = useRoute();
const store = useStore();
const employeeId = route.params.id;
const isLoading = computed(()=>store.getters.isEmployeeLoading);
const modelRef = reactive({
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
      store.dispatch('updateEmployee', {
          id: Number(employeeId),
          password: modelRef.password,
          name: modelRef.name,
          department: modelRef.department,
          age: modelRef.age,
          email: modelRef.email,
          phoneNumber: modelRef.phoneNumber,
          address: modelRef.address
    });
    })
    .catch(err => {
      console.log('error', err);
    });
};

// Method to close the drawer
const goBack = () => {
  router.push(employeesUrl)
};

onMounted(() => {
  store.dispatch('fetchEmployeeById', employeeId);
});

watch(
  () => store.getters.getEmployeeById,
  (employee) => {
    if (employee) {
      modelRef.name = employee.name;
      modelRef.department = employee.department;
      modelRef.age = employee.age;
      modelRef.email = employee.email;
      modelRef.phoneNumber = employee.phoneNumber;
      modelRef.address = employee.address;
    }
  },
  { immediate: true }
);

</script>

<style scoped lang="scss">
@import './EditEmployee.scss';
</style>
