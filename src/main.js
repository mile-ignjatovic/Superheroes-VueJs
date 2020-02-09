import axios from 'axios';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false

// TODO: change the url to matsh superheroes
axios.defaults.baseURL = 'https://superheroes-7bfaa.firebaseio.com/'
axios.defaults.headers.get[ 'Accepts' ] = 'application/json'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
