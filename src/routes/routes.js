import { createRouter, createWebHistory } from "vue-router";
import {
  editEmployeeUrl,
  editShoeArticleUrl,
  employeesUrl,
  forgetPassUrl,
  homeUrl,
  loginUrl,
  profileUrl,
  shoeArticlesUrl,
  signUpUrl,
} from "./urls";
import { roles } from "./roles";
import Home from "@/views/Home/home.vue";
import Employees from "@/views/Employees/employees.vue";
import ShoeArticles from "@/views/ShoeArticles/shoeArticles.vue";
import EditEmployee from "@/views/EditEmployee/editEmployee.vue";
import EditShoeArticle from "@/views/EditShoeArticle/editShoeArticle.vue";
import Settings from "@/views/Settings/settings.vue";
import Login from "@/views/Auth/Login/Login.vue";
import SignUp from "@/views/Auth/Signup/signUp.vue";
import ForgetPassword from "@/views/Auth/ForgetPassword/forgetPassword.vue";
import Layout from "@/components/Layout/Layout.vue";
import store from "@/store";

const routes = [
    {
      path: homeUrl,
      component: Layout,
      children: [
        {
          path: '',
          component: Home, 
          meta: { requiresAuth: true }
        },
        { 
          path: employeesUrl,
          component: Employees,
          meta: { requiresAuth: true, roles: [roles.admin] },
        },
        { 
          path: shoeArticlesUrl,
          component: ShoeArticles,
          meta: { requiresAuth: true, roles: [roles.admin] }
        },
        { 
          path: editEmployeeUrl,
          component: EditEmployee,
          meta: { requiresAuth: true, roles: [roles.admin] }
        },
        { 
          path: editShoeArticleUrl,
          component: EditShoeArticle,
          meta: { requiresAuth: true, roles: [roles.admin] }
        },
        { 
          path: profileUrl,
          component: Settings,
          meta: { requiresAuth: true, roles: [roles.admin, roles.employee] }
        },
      ],
    },
  { 
    path: forgetPassUrl,
    component: ForgetPassword
  },
  { 
    path: signUpUrl,
    component: SignUp
  },
  { 
    path: loginUrl,
    component: Login
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next)=>{
   // Check if the route requires authentication
   const isAuthenticated = store.getters.isAuthenticated; /* logic to check if the user is authenticated */
   if (to.meta.requiresAuth) {
    if (!isAuthenticated) {
      // If not authenticated, redirect to login page
      next(loginUrl);
    } else {
      // If authenticated, check roles if required
      
      if (
        to.path === loginUrl ||
        to.path === forgetPassUrl ||
        to.path === signUpUrl
      ) {
        // If trying to access login, forget password, or sign up while authenticated, redirect to home page
        next(homeUrl);
      } 
      else {
        const user = store.getters.getUser;/* logic to get the user's roles */
        const userRoles = user?.userType;
        if (to.meta.roles && !to.meta.roles.some(role => userRoles.includes(role))) {
          // If user doesn't have required roles, redirect to home page
          next(homeUrl);
        } else {
          // Otherwise, proceed to the route
          next();
        }
      }
     
    }
  } else {
    if(isAuthenticated) {
      next(homeUrl);
    }else {
      // If route doesn't require authentication, proceed to the route
    if (to.path === loginUrl || to.path === forgetPassUrl || to.path === signUpUrl) {
      next();
      }
      else{
        next(loginUrl);
      }
    }
  }
})

export default router;


