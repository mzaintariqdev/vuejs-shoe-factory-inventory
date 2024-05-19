import router from "@/routes/routes";
import { loginApiService, resetPasswordApiService, resetPasswordLinkApiService } from "@/services/authServices";
import showNotifications from "@/utils/helpers";
import { jwtDecode } from "jwt-decode";

const workSpaceModule = {
  state: {
    user: {
      userType: '',
      userId: '',
      userName: '',
      email: '',
    },
    isAuthenticated: false,
    isAuthenticationChecked: false,
    isLoading: false,
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user;
    },
    SET_IS_AUTHENTICATED(state, isAuthenticated) {
      state.isAuthenticated = isAuthenticated;
    },
    SET_IS_AUTHENTICATION_CHECKED(state, isAuthenticationChecked) {
      state.isAuthenticationChecked = isAuthenticationChecked;
    },
    SET_IS_LOADING(state, isLoading) {
      state.isLoading = isLoading;
    },
  },
  actions: {
    async resetPassword({commit}, credentials) {
      commit('SET_IS_LOADING', true);
      try {
        // Call the login API service
        const response = await resetPasswordApiService(credentials);
        if (response?.message) {
          // Set user and authentication status if login is successful
          showNotifications(response?.message);
        } else {
          showNotifications('Wrong Email Entered', true, 401);
        }
      } catch (error) {
        // Handle network or server error
        showNotifications('Something went wrong', true, 500);
      } finally {
        commit('SET_IS_LOADING', false);
      }

    },
    async forgetPasswordLink({commit}, credentials) {
      commit('SET_IS_LOADING', true);
      try {
        // Call the login API service
        const response = await resetPasswordLinkApiService(credentials);
        if (response?.message) {
          // Set user and authentication status if login is successful
          showNotifications(response?.message);
        } else {
          showNotifications('Wrong Email Entered', true, 401);
        }
      } catch (error) {
        // Handle network or server error
        showNotifications('Something went wrong', true, 500);
      } finally {
        commit('SET_IS_LOADING', false);
      }

    },
    async login({ commit }, credentials) {
      commit('SET_IS_LOADING', true);
      try {
        // Call the login API service
        const response = await loginApiService(credentials);
        if (response.data) {
          // Set user and authentication status if login is successful
          showNotifications('Login successfully');
          commit('SET_USER', response.data);
          commit('SET_IS_AUTHENTICATED', true);
          commit('SET_IS_AUTHENTICATION_CHECKED', true);
          const { token } = response.data;
          window.localStorage.setItem('token', token);
          router.push('/' );
        } else {
          // Handle login error if user not found or wrong credentials
          showNotifications('Wrong credentials', true, 401);
        }
      } catch (error) {
        // Handle network or server error
        showNotifications('Something went wrong', true, 500);
      } finally {
        commit('SET_IS_LOADING', false);
      }
    },
    async signout({ commit }) {
      // Simulate API call for signout
      commit('SET_IS_LOADING', true);
      try {
        // Simulate successful signout
        localStorage.removeItem('token');
        commit('SET_USER', {});
        commit('SET_IS_AUTHENTICATED', false);
        commit('SET_IS_AUTHENTICATION_CHECKED', true);
        showNotifications('Logout successfully');
        router.push('/login' );
      } catch (error) {
        // Handle signout error
        showNotifications('Something went wrong', true, 410);
      } finally {
        commit('SET_IS_LOADING', false);
      }
    },

    async checkIsUserAuthenticated ({commit}) {
      const token = localStorage.getItem('token');

      if (token) {
        const user = jwtDecode(token);
        commit('SET_USER', user);
        commit('SET_IS_AUTHENTICATED', true);
      } else {
        router.push('/login' );
      }
    }
  },
  getters: {
    getUser: state => state.user,
    isAuthenticated: state => state.isAuthenticated,
    isAuthenticationChecked: state => state.isAuthenticationChecked,
    isLoading: state => state.isLoading,
  },
};

export default workSpaceModule;
