import { sleep } from '@/utils/helpers';
import { mockEmployees } from '@/utils/mocks/mockEmployees';

export const addEmployeeService = async (formData) => {
  await sleep(2000);
  return {
    data: formData,
    error: false,
    status: 200,
  };
};

export const getEmployees = async () => {
  await sleep(2000);
  return {
    data: mockEmployees,
    error: false,
    status: 200,
  };
};

export const deleteEmployeeApiService = (id) => ({
  data: { message: 'Employee deleted SuccessFully', id },
  error: false,
  status: 200,
});

export const EditEmployeeApiService = async (id) => {
  await sleep(2000);
  return {
    data: { message: 'Employee Updated SuccessFully', id },
    error: false,
    status: 200,
  };
};

export const getEmployeeByIdService = async (id) => {
  await sleep(2000);
  const employeeById = mockEmployees.find((employee) => employee.id === id);

  return {
    data: employeeById,
    error: false,
    status: 200,
  };
};
