import {createStore} from 'vuex'
import axios from "axios";

// Create a new store instance.
const store = createStore({
  state() {
    const accessToken = JSON.parse(localStorage.getItem("accessToken"));
    if (accessToken && Date.now() < accessToken.expire) {
      return {
        token: accessToken.token
      };
    }
    return {
      token: null
    };
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
      return {state};
    },
  },
  actions: {

    logout({commit}) {
      alert('로그아웃 성공');
      localStorage.removeItem("accessToken");
      commit("setToken", null);
      axios.defaults.headers.common['Authorization'] = null;
    }
  },

})
export default store;