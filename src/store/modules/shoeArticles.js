import { addShoeArticleService, deleteShoeArticleApiService, EditShoeArticleApiService, getShoeArticleByIdService, getShoeArticles } from '@/services/shoeArticleServices';
import showNotifications from '@/utils/helpers';

const shoesArticlesModule = {
  state: {
    shoeArticles: [],
    shoeArticle: null,
    isShoeArticleLoading: false,
    openShoeArticleModal: false,
    openShoeArticleDrawer: false,
    isShoeArticleOperationLoading: false,
  },
  mutations: {
    SET_SHOE_ARTICLE_DRAWER(state, open) {
      state.openShoeArticleDrawer = open;
    },
    SET_SHOE_ARTICLE_MODAL(state, open) {
      state.openShoeArticleModal = open;
    },
    SET_SHOE_ARTICLES(state, shoeArticles) {
      state.shoeArticles = shoeArticles;
    },
    SET_SHOE_ARTICLE(state, shoeArticle) {
      state.shoeArticle = shoeArticle;
    },
    ADD_SHOE_ARTICLE(state, shoeArticleData) {   
      state.shoeArticles.push({id: state.employees?.length, ...shoeArticleData});
    },
    UPDATE_SHOE_ARTICLE(state, updatedShoeArticle) {
      const index = state.shoeArticles.findIndex(emp => emp.id === updatedShoeArticle.id);
      if (index !== -1) {
        state.shoeArticles.splice(index, 1, updatedShoeArticle);
      }
    },
    DELETE_SHOE_ARTICLE(state, shoeArticleId) {
      state.shoeArticles = state.shoeArticles.filter(emp => emp.id !== shoeArticleId);
    },
    SET_IS_SHOE_ARTICLE_LOADING(state, isShoeArticleLoading) {
      state.isShoeArticleLoading = isShoeArticleLoading;
    },
    SET_IS_SHOE_ARTICLE_OPERATION_LOADING(state, isLoading) {
      state.isShoeArticleOperationLoading = isLoading;
    },
  },
  actions: {
    setOpenShoeArticleDrawer({ commit }, value) {
      commit('SET_SHOE_ARTICLE_DRAWER', value);
    },
    setOpenShoeArticleModal({ commit }, value) {
      commit('SET_SHOE_ARTICLE_MODAL', value);
    },
    async fetchShoeArticles({ commit }) {
      commit('SET_IS_SHOE_ARTICLE_LOADING', true);
      try {
        const response = await getShoeArticles();
        console.log(response)
        if(response?.error){
          showNotifications('Unable to fetch Shoe Articles', true, 401);
        }
        else {
          commit('SET_SHOE_ARTICLES', response.data);
        }
      } catch (error) {
        showNotifications('Something went wrong', true, 500);
      } finally {
        commit('SET_IS_SHOE_ARTICLE_LOADING', false);
      }
    },
    async fetchShoeArticleById({ commit }, shoeArticleId) {
      commit('SET_IS_SHOE_ARTICLE_LOADING', true);
      try {
        const response = await getShoeArticleByIdService(Number(shoeArticleId));
        if(response?.error){
          showNotifications('Unable to fetch Shoe Article', true, 401);
        }
        else {
          commit('SET_SHOE_ARTICLE', response.data);
        }
      } catch (error) {
        showNotifications('Something went wrong', true, 500);
      } finally {
        commit('SET_IS_SHOE_ARTICLE_LOADING', false);
      }
    },
    async addShoeArticle({ commit }, shoeArticleData) {
      commit('SET_IS_SHOE_ARTICLE_OPERATION_LOADING', true);
      try {
        const response = await addShoeArticleService(shoeArticleData);
        if(response?.error){
          showNotifications('Unable to Add Shoe Article', true, 401);
        }
        else {
          showNotifications('Shoe Article Add successfully');
          commit('ADD_SHOE_ARTICLE', shoeArticleData);
          commit('SET_IS_SHOE_ARTICLE_OPERATION_LOADING', false);
          commit('SET_SHOE_ARTICLE_DRAWER', false);
        }
      } catch (error) {
        showNotifications('Something went wrong', true, 500);
      } finally {
        commit('SET_IS_SHOE_ARTICLE_OPERATION_LOADING', false);
      }
    },
    async updateShoeArticle({ commit }, shoeArticle) {
      commit('SET_IS_SHOE_ARTICLE_LOADING', true);
      try {
        const response = await EditShoeArticleApiService(shoeArticle?.id);
        if(response?.error) {
          showNotifications('Unable to Update Shoe Article', true, 401);
        }
        else {
          showNotifications(response?.data?.message);
          commit('UPDATE_SHOE_ARTICLE', shoeArticle);
        }
      } catch (error) {
        showNotifications('Something went wrong', true, 500);
      } finally {
        commit('SET_IS_SHOE_ARTICLE_LOADING', false);
      }
    },
    async deleteShoeArticle({ commit }, shoeArticleId) {
      commit('SET_IS_SHOE_ARTICLE_OPERATION_LOADING', true);
      try {
        const response = await deleteShoeArticleApiService(shoeArticleId);
        if (response?.error) {
          showNotifications(response?.data?.message, true, 401);
        } else {
          commit('DELETE_SHOE_ARTICLE', shoeArticleId);
          commit('SET_IS_SHOE_ARTICLE_OPERATION_LOADING', false);
          commit('SET_SHOE_ARTICLE_MODAL', false);
          showNotifications(response?.data?.message);
        }
      } catch (error) {
        showNotifications('Something went wrong', true, 500);
      } finally {
        commit('SET_IS_SHOE_ARTICLE_OPERATION_LOADING', false);
      }
    },
  },
  getters: {
    allShoeArticles: state => state.shoeArticles,
    getShoeArticleById: state => state.shoeArticle,
    isShoeArticleLoading: state => state.isShoeArticleLoading,
    isOperationShoeArticleLoading: state => state.isShoeArticleOperationLoading,
    isShoeArticleModalOpen: state => state.openShoeArticleModal,
    isShoeArticleDrawerOpen: state => state.openShoeArticleDrawer,
  },
};

export default shoesArticlesModule;
