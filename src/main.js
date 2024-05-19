import { createApp } from 'vue'
import App from './App.vue'
import router from './routes/routes'
import store from './store/index'

import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';
import './styles/index.scss';

const app = createApp(App);

app.use(Antd);
app.use(store);
app.use(router);
app.mount('#app')

// <!-- i have to create follwoign componnets and flow

// 3. create login form
// 4. create signup form
// 5. create reset password form
// 6. create table component 
// 7. create employee list 
// 8. shoe article list
// 9. employee creation drawer
// 10. employee delete model
// 11. edit employee page
// 12. employee details drawer