import { getEmployees, getEmployeeByIdService, addEmployeeService, EditEmployeeApiService, deleteEmployeeApiService } from '@/services/employeeServices';
import showNotifications from '@/utils/helpers';

const employeesModule = {
  state: {
    employees: [],
    employee: null,
    isEmployeeLoading: false,
    openEmployeeModal: false,
    openEmployeeDrawer: false,
    isEmployeeOperationLoading: false,
  },
  mutations: {
    SET_EMPLOYEE_DRAWER(state, open) {
      state.openEmployeeDrawer = open;
    },
    SET_EMPLOYEE_MODAL(state, open) {
      state.openEmployeeModal = open;
    },
    SET_EMPLOYEES(state, employees) {
      state.employees = employees;
    },
    SET_EMPLOYEE(state, employee) {
      state.employee = employee;
    },
    ADD_EMPLOYEE(state, employeeData) {   
      state.employees.push({id: state.employees?.length, ...employeeData});
    },
    UPDATE_EMPLOYEE(state, updatedEmployee) {
      const index = state.employees.findIndex(emp => emp.id === updatedEmployee.id);
      if (index !== -1) {
        state.employees.splice(index, 1, updatedEmployee);
      }
    },
    DELETE_EMPLOYEE(state, employeeId) {
      state.employees = state.employees.filter(emp => emp.id !== employeeId);
    },
    SET_IS_EMPLOYEE_LOADING(state, isEmployeeLoading) {
      state.isEmployeeLoading = isEmployeeLoading;
    },
    SET_IS_OPERATION_EMPLOYEE_LOADING(state, isLoading) {
      state.isEmployeeOperationLoading = isLoading;
    },
  },
  actions: {
    setOpenEmployeeDrawer({ commit }, value) {
      commit('SET_EMPLOYEE_DRAWER', value);
    },
    setOpenEmployeeModal({ commit }, value) {
      commit('SET_EMPLOYEE_MODAL', value);
    },
    async fetchEmployees({ commit }) {
      commit('SET_IS_EMPLOYEE_LOADING', true);
      try {
        const response = await getEmployees();
        if(response?.error){
          showNotifications('Unable to fetch Employees', true, 401);
        }
        else {
          commit('SET_EMPLOYEES', response.data);
        }
      } catch (error) {
        showNotifications('Something went wrong', true, 500);
      } finally {
        commit('SET_IS_EMPLOYEE_LOADING', false);
      }
    },
    async fetchEmployeeById({ commit }, employeeId) {
      commit('SET_IS_EMPLOYEE_LOADING', true);
      try {
        const response = await getEmployeeByIdService(Number(employeeId));
        if(response?.error){
          showNotifications('Unable to fetch Employee', true, 401);
        }
        else {
          console.log(response?.data, employeeId)
          commit('SET_EMPLOYEE', response.data);
        }
      } catch (error) {
        showNotifications('Something went wrong', true, 500);
      } finally {
        commit('SET_IS_EMPLOYEE_LOADING', false);
      }
    },
    async addEmployee({ commit }, employeeData) {
      commit('SET_IS_OPERATION_EMPLOYEE_LOADING', true);
      try {
        const response = await addEmployeeService(employeeData);
        if(response?.error){
          showNotifications('Unable to Add Employee', true, 401);
        }
        else {
          showNotifications('Employee Add successfully');
          commit('ADD_EMPLOYEE', employeeData);
          commit('SET_IS_OPERATION_EMPLOYEE_LOADING', false);
          commit('SET_EMPLOYEE_DRAWER', false);
        }
      } catch (error) {
        showNotifications('Something went wrong', true, 500);
      } finally {
        commit('SET_IS_OPERATION_EMPLOYEE_LOADING', false);
      }
    },
    async updateEmployee({ commit }, employee) {
      commit('SET_IS_EMPLOYEE_LOADING', true);
      try {
        const response = await EditEmployeeApiService(employee?.id);
        if(response?.error) {
          showNotifications('Unable to Update Employee', true, 401);
        }
        else {
          showNotifications(response?.data?.message);
          commit('UPDATE_EMPLOYEE', employee);
        }
      } catch (error) {
        showNotifications('Something went wrong', true, 500);
      } finally {
        commit('SET_IS_EMPLOYEE_LOADING', false);
      }
    },
    async deleteEmployee({ commit }, employeeId) {
      commit('SET_IS_OPERATION_EMPLOYEE_LOADING', true);
      try {
        const response = await deleteEmployeeApiService(employeeId);
        if (response?.error) {
          showNotifications(response?.data?.message, true, 401);
        } else {
          commit('DELETE_EMPLOYEE', employeeId);
          commit('SET_IS_OPERATION_EMPLOYEE_LOADING', false);
          commit('SET_EMPLOYEE_MODAL', false);
          showNotifications(response?.data?.message);
        }
      } catch (error) {
        showNotifications('Something went wrong', true, 500);
      } finally {
        commit('SET_IS_OPERATION_EMPLOYEE_LOADING', false);
      }
    },
  },
  getters: {
    allEmployees: state => state.employees,
    getEmployeeById: state => state.employee,
    isEmployeeLoading: state => state.isEmployeeLoading,
    isOperationEmployeeLoading: state => state.isEmployeeOperationLoading,
    isEmployeeModalOpen: state => state.openEmployeeModal,
    isEmployeeDrawerOpen: state => state.openEmployeeDrawer,
  },
};

export default employeesModule;
