import { roles } from "@/routes/roles";

const mockAuthUsers = [
  {
    userId: '1234-5678-4321-0000',
    userType: roles.admin,
    userName: 'admin',
    password: 'admin123',
    email: 'admin@gmail.com',
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMjM0LTU2NzgtNDMyMS0wMDAwIiwidXNlclR5cGUiOiJBRE1JTiIsInVzZXJOYW1lIjoiYWRtaW4iLCJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSJ9.wlAYNAzOqV6dMu7vxDewVDfWT7UVJSZNjA0ZYbfpccs',
  },
  {
    userId: '1234-5678-4321-1111',
    userType: roles.employee,
    userName: 'employee',
    password: 'employee123',
    email: 'employee@gmail.com',
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMjM0LTU2NzgtNDMyMS0xMTExIiwidXNlclR5cGUiOiJFTVBMT1lFRSIsInVzZXJOYW1lIjoiZW1wbG95ZWUiLCJlbWFpbCI6ImVtcGxveWVlQGdtYWlsLmNvbSJ9.FjmHLwsamcBztlCtgfySG4AxnKSODkQX5okh7B-Q6K8',
  },
];

export default mockAuthUsers;
