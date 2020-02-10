import axios from 'axios';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Vue from 'vue';
import Vuelidate from 'vuelidate';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.use(Vuelidate);

Vue.config.productionTip = false

axios.defaults.baseURL = 'https://www.superheroapi.com/api.php/10222452547211270';

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
