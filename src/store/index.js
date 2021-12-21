import Vue from 'vue'
import Vuex from 'vuex'
import * as fb from '../firebase'
import router from '../router/index'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userProfile: {},
    isAuthenticated: false,
    error: ""

  },
  mutations: {
    setUserProfile(state, val, authState) {
      state.isAuthenticated = !state.isAuthenticated
      state.userProfile = val
    },
    error(state, value) {
      state.error = value
    }
  },
  actions: {
    async join({ dispatch }, form) {
      //signup user
      const { user } = await fb.auth.createUserWithEmailAndPassword(form.email, form.password)
        .catch((error) => {
          console.log(error.message);
          const err = error.message
          this.commit('error', err)
        });
      //create user profile
      await fb.usersCollection.doc(user.uid).set({
        name: form.name
      })

      //fetch user profile
      dispatch('fetchUserProfile', user)
    },
    async enter({ dispatch }, form) {
      //signin user
      const { user } = await fb.auth.signInWithEmailAndPassword(form.email, form.password)
        .catch((error) => {
          console.log(error.message);
          const err = error.message
          this.commit('error', err)
        });

      //fetch user profile
      dispatch('fetchUserProfile', user)
    },

    async fetchUserProfile({ commit }, user) {
      //fetch user profile
      const userProfile = await fb.usersCollection.doc(user.uid).get()

      //set user profile
      commit('setUserProfile', userProfile.data())

      //redirect
      router.push('/dashboard')
    },

    async exit({ commit }) {
      await fb.auth.signOut()
      commit('setUserProfile', {})
      router.push('/')
    }
  },
  modules: {
  }
})
