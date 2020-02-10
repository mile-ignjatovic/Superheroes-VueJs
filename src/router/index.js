import Vue from 'vue'
import VueRouter from 'vue-router'
import SigninPage from '../components/auth/signin.vue'
import SignupPage from '../components/auth/signup.vue'
import store from '../store/index'
import DashboardPage from '../views/dashboard/dashboard.vue'
import WelcomePage from '../views/welcome/welcome.vue'



Vue.use(VueRouter)

const routes = [
    {
        path: '/', component: WelcomePage,
        beforeEnter(to, from, next) {
            if (store.state.idToken) {
                next('/dashboard')
            } else {
                next()
            }
        }
    },
    {
        path: '/signup', component: SignupPage,
        beforeEnter(to, from, next) {
            if (store.state.idToken) {
                next('/dashboard')
            } else {
                next()
            }
        }
    },
    {
        path: '/signin', component: SigninPage,
        beforeEnter(to, from, next) {
            if (store.state.idToken) {
                next('/dashboard')
            } else {
                next()
            }
        }
    },
    {
        path: '/dashboard',
        component: DashboardPage,
        beforeEnter(to, from, next) {
            if (store.state.idToken) {
                next()
            } else {
                next('/signin')
            }
        }
    },
    { path: '*', redirect: '/' }
]

const router = new VueRouter({
    routes
})

export default router
