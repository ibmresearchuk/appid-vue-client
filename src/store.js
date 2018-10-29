import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      logged: false,
      loggedInAs: {
        name: "",
        email: ""
      }
    }
  },
  mutations: {
    setUser(state, u) {
      state.user = u;
    }
  },
  actions: {

  }
})
