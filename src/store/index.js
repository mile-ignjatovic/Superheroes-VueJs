import globalAxios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../axios-auth'
import axiosFirebase from '../axios-firebase'
import router from '../router/index'


Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        idToken: null,
        userId: null,
        user: null,
        superheroes: null,
        heroesLoading: false,
        allSuperheroes: null
    },
    mutations: {
        authUser(state, userData) {
            state.idToken = userData.token
            state.userId = userData.userId
        },
        storeUser(state, user) {
            state.user = user
        },
        clearAuthData(state) {
            state.idToken = null
            state.userId = null
        },
        clearSuperheroes(state) {
            state.superheroes = null;
        },
        storeSuperheroes(state, superheroes) {
            state.superheroes = superheroes;
        },
        areHeroesLoading(state, isLoading) {
            state.heroesLoading = isLoading
        },
        storeAllSuperheroes(state, allHeroes) {
            state.allSuperheroes = allHeroes;
        }
    },
    actions: {
        setLogoutTimer({ commit }, expirationTime) {
            setTimeout(() => {
                commit('clearAuthData')
            }, expirationTime * 1000)
        },
        signup({ commit, dispatch }, authData) {
            axios.post('/signupNewUser?key=AIzaSyBNMIBxtYRULlEhFbNzF9Gl9PcrhJheEoA', {
                email: authData.email,
                password: authData.password,
                returnSecureToken: true
            })
                .then(res => {
                    commit('authUser', {
                        token: res.data.idToken,
                        userId: res.data.localId
                    });

                    storeUserToLocalStorage(res);

                    dispatch('storeUser', authData)
                    dispatch('setLogoutTimer', res.data.expiresIn)
                    router.replace('/dashboard');
                })
                .catch(() => {
                    // TODO: handle error
                })
        },
        login({ commit, dispatch }, authData) {
            axios.post('/verifyPassword?key=AIzaSyBNMIBxtYRULlEhFbNzF9Gl9PcrhJheEoA', {
                email: authData.email,
                password: authData.password,
                returnSecureToken: true
            })
                .then(res => {
                    storeUserToLocalStorage(res);
                    commit('authUser', {
                        token: res.data.idToken,
                        userId: res.data.localId
                    })
                    dispatch('setLogoutTimer', res.data.expiresIn)
                    router.replace('/dashboard');
                })
                .catch(() => {
                    // TODO: handle errors
                })
        },
        tryAutoLogin({ commit }) {
            const token = localStorage.getItem('token')
            if (!token) {
                return
            }
            const expirationDate = localStorage.getItem('expirationDate')
            const now = new Date()
            if (now >= expirationDate) {
                return
            }
            const userId = localStorage.getItem('userId')
            commit('authUser', {
                token: token,
                userId: userId
            });
            router.replace('/dashboard');
        },
        logout({ commit }) {
            commit('clearAuthData')
            commit('clearSuperheroes')
            localStorage.removeItem('expirationDate')
            localStorage.removeItem('token')
            localStorage.removeItem('userId')
            localStorage.removeItem('allHeroes')
            router.replace('/')
        },
        storeUser({ state }, userData) {
            if (!state.idToken) {
                return
            }
            axiosFirebase.post('/users.json' + '?auth=' + state.idToken, userData)
                .then(() => { })
                .catch(() => {
                    // TODO: handle error
                })
        },
        fetchSuperheroesByName({ commit }, payload) {
            commit('areHeroesLoading', true);
            commit('storeSuperheroes', []);
            globalAxios.get('/search/' + payload).then(res => {
                commit('storeSuperheroes', res.data.results);
                commit('areHeroesLoading', false);
            }).catch(() => {
                commit('areHeroesLoading', false);
                // TODO: handle error
            })
        },
        fetchSuperheroesByPowers({ commit, state }, payload) {
            if (state.allSuperheroes) {
                // TODO:
                const finalArr = state.allSuperheroes.filter(x => {
                    if ((payload.intelligence && payload.intelligence === x.powerstats.intelligence) &&
                        (payload.strength && payload.strength === x.powerstats.strength) &&
                        (payload.speed && payload.speed === x.powerstats.speed) &&
                        (payload.durability && payload.durability === x.powerstats.durability) &&
                        (payload.power && payload.power === x.powerstats.power) &&
                        (payload.combat && payload.combat === x.powerstats.combat)) {
                        return x
                    }
                })
                commit('storeSuperheroes', finalArr);
            }
        },
        async fetchAllSuperheroes({ commit }) {
            commit('areHeroesLoading', true);
            let alphabetArray = 'aeioutqx'.split('');
            let resultsArray = [];
            for (let i = 0; i < alphabetArray.length; i++) {
                if (i < alphabetArray.length - 1) {
                    await globalAxios.get('/search/' + alphabetArray[i]).then((res) => {
                        resultsArray.push(...res.data.results);
                    }).catch(() => {
                        // TODO: handle error
                    });
                } else {
                    await globalAxios.get('/search/' + 'x').then((res) => {
                        resultsArray.push(...res.data.results);
                        commit('areHeroesLoading', false);
                    }).catch(() => {
                        commit('areHeroesLoading', false);
                        // TODO: handle error
                    })
                }
            }
            const unique = [...new Set(resultsArray.map(item => item))];
            commit('storeAllSuperheroes', unique);
        }
    },
    getters: {
        user(state) {
            return state.user
        },
        isAuthenticated(state) {
            return state.idToken !== null
        },
        superheroes(state) {
            return state.superheroes;
        },
        heroesLoading(state) {
            return state.heroesLoading;
        },
        allSuperheroes(state) {
            return state.allSuperheroes
        }
    }
});

const storeUserToLocalStorage = (res) => {
    const now = new Date()
    const expirationDate = new Date(now.getTime() + res.data.expiresIn * 1000)
    localStorage.setItem('token', res.data.idToken)
    localStorage.setItem('userId', res.data.localId)
    localStorage.setItem('expirationDate', expirationDate)
}
