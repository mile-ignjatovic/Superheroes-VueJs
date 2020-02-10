import axios from 'axios';
import store from '../src/store/index';

const instance = axios.create({
    baseURL: 'https://superheroes-7bfaa.firebaseio.com/'
})

instance.interceptors.response.use(res => {
    return res;
}, () => {
    store.commit('hasConnectionFailed', true)
    setTimeout(() => {
        store.commit('hasConnectionFailed', false);
    }, 2500)
});

export default instance