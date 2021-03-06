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
        allSuperheroes: null,
        searchFailed: false,
        connectionFailed: false
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
        },
        hasSearchFailed(state, searchFailed) {
            state.searchFailed = searchFailed;
        },
        hasConnectionFailed(state, connectionFailed) {
            state.connectionFailed = connectionFailed;
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
                });
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
                });
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
        },
        fetchSuperheroesByName({ commit }, payload) {
            commit('areHeroesLoading', true);
            commit('storeSuperheroes', []);
            globalAxios.get('/search/' + payload).then(res => {
                commit('storeSuperheroes', res.data.results);
                commit('areHeroesLoading', false);
            }).catch(() => {
                commit('areHeroesLoading', false);
            })
        },
        fetchSuperheroesByPowers({ commit, state }, payload) {
            let finalArr = [];
            if (payload.name) {
                if (!state.superheroes || state.superheroes.length === 0) {
                    commit('storeSuperheroes', state.allSuperheroes);
                }
                finalArr = state.superheroes.filter(x => {
                    if ((payload.stats.intelligence == 0 || payload.stats.intelligence == 1 || payload.stats.intelligence >= x.powerstats.intelligence) &&
                        (payload.stats.strength == 0 || payload.stats.strength == 1 || payload.stats.strength >= x.powerstats.strength) &&
                        (payload.stats.speed == 0 || payload.stats.speed == 1 || payload.stats.speed >= x.powerstats.speed) &&
                        (payload.stats.durability == 0 || payload.stats.durability == 1 || payload.stats.durability >= x.powerstats.durability) &&
                        (payload.stats.power == 0 || payload.stats.power == 1 || payload.stats.power >= x.powerstats.power) &&
                        (payload.stats.combat == 0 || payload.stats.combat == 1 || payload.stats.combat >= x.powerstats.combat) &&
                        (x.name.includes(payload.name))) {
                        return x
                    }
                })
                if (finalArr.length === 0) {
                    dispatchError(commit);
                    return
                } else {
                    commit('hasSearchFailed', false);
                    commit('storeSuperheroes', finalArr);
                }
                return
            }
            if (state.allSuperheroes && !payload.name) {
                finalArr = state.allSuperheroes.filter(x => {
                    if ((payload.stats.intelligence == 0 || payload.stats.intelligence == 1 || payload.stats.intelligence >= x.powerstats.intelligence) &&
                        (payload.stats.strength == 0 || payload.stats.strength == 1 || payload.stats.strength >= x.powerstats.strength) &&
                        (payload.stats.speed == 0 || payload.stats.speed == 1 || payload.stats.speed >= x.powerstats.speed) &&
                        (payload.stats.durability == 0 || payload.stats.durability == 1 || payload.stats.durability >= x.powerstats.durability) &&
                        (payload.stats.power == 0 || payload.stats.power == 1 || payload.stats.power >= x.powerstats.power) &&
                        (payload.stats.combat == 0 || payload.stats.combat == 1 || payload.stats.combat >= x.powerstats.combat)) {
                        return x
                    }
                })
                if (finalArr.length === 0) {
                    dispatchError(commit)
                    return
                } else {
                    commit('hasSearchFailed', false);
                    commit('storeSuperheroes', finalArr);
                }
                return
            }
        },
        async fetchAllSuperheroes({ commit }) {
            commit('areHeroesLoading', true);
            let alphabetArray = 'aeioutqx'.split('');
            let resultsArray = [];
            for (let i = 0; i < alphabetArray.length; i++) {
                if (i < alphabetArray.length - 1) {
                    await globalAxios.get('/search/' + alphabetArray[ i ]).then((res) => {
                        resultsArray.push(...res.data.results);
                    });
                } else {
                    await globalAxios.get('/search/' + 'x').then((res) => {
                        resultsArray.push(...res.data.results);
                        commit('areHeroesLoading', false);
                    }).catch(() => {
                        commit('areHeroesLoading', false);
                    })
                }
            }
            const uniqes = getUniques(resultsArray);
            commit('storeAllSuperheroes', uniqes);
        },
        hideWarning({ commit }) {
            commit('hasSearchFailed', false);
        },
        hideConnectionFailed({ commit }) {
            commit('hasConnectionFailed', false);
        }
    },
    getters: {
        user(state) {
            return state.user;
        },
        isAuthenticated(state) {
            return state.idToken !== null;
        },
        superheroes(state) {
            return state.superheroes;
        },
        heroesLoading(state) {
            return state.heroesLoading;
        },
        allSuperheroes(state) {
            return state.allSuperheroes;
        },
        searchFailed(state) {
            return state.searchFailed;
        },
        connectionFailed(state) {
            return state.connectionFailed;
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

const getUniques = (arr) => {
    const result = [];
    const map = new Map();
    for (const item of arr) {
        if (!map.has(item.id)) {
            map.set(item.id, true);
            result.push(item);
        }
    }
    return result;
}

const dispatchError = (commit) => {
    commit('hasSearchFailed', true);
    setTimeout(() => {
        commit('hasSearchFailed', false);
    }, 4000)
}
