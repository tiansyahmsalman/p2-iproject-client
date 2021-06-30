import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../../config/axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoggedIn: false,
    communities: [],
    news: []
  },
  mutations: {
    SET_LOGGED_IN (state, payload) {
      state.isLoggedIn = payload
    },
    LOGOUT (state, payload) {
      localStorage.clear()
      state.isLoggedIn = false
    },
    ALL_COMMUNITY (state, payload) {
      state.communities = payload
    },
    ALL_NEWS (state, payload) {
      state.news = payload
    }
  },
  actions: {
    login (context, payload) {
      return new Promise((resolve, reject) => {
        axios({
          url: '/login',
          method: 'post',
          data: payload
        })
          .then(({ data }) => {
            localStorage.setItem('access_token', data.access_token)
            localStorage.setItem('firstName', data.firstName)
            localStorage.setItem('lastName', data.lastName)
            context.commit('SET_LOGGED_IN', true)
            resolve(data)
          })
          .catch(err => {
            reject(err.response)
          })
      })
    },
    register (context, payload) {
      return new Promise((resolve, reject) => {
        axios({
          url: '/register',
          method: 'post',
          data: payload
        })
          .then(({ data }) => {
            resolve(data)
          })
          .catch(err => {
            reject(err.response)
          })
      })
    },
    allCommunities (context, payload) {
      axios({
        url: '/communities',
        method: 'get',
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(({ data }) => {
          context.commit('ALL_COMMUNITY', data)
        })
        .catch(err => {
          console.log(err.response)
        })
    },
    allNews (context, payload) {
      axios({
        url: '/news',
        method: 'get',
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(({ data }) => {
          context.commit('ALL_NEWS', data)
        })
        .catch(err => {
          console.log(err.response)
        })
    }
  },
  modules: {
  }
})