import { createStore } from "vuex";
import employeesModule from "./modules/employees";
import shoesArticlesModule from "./modules/shoeArticles";
import workSpaceModule from "./modules/workSpace";

const store = createStore({
  modules: {
    employees: employeesModule,
    shoeArticles: shoesArticlesModule,
    workSpace: workSpaceModule
  }
});

export default store;