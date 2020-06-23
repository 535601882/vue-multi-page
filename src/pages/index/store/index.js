import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    welcome:window.sessionStorage.getItem('welcome') || "欢迎回来"
  },
  mutations: {
    toogleWelcome(state,data){
      state.welcome = data
      window.sessionStorage.setItem('welcome',data)
    }
  },
  actions: {
  },
  modules: {
  }
})
