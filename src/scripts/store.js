import {createStore} from 'vuex'
import axios from "axios";
import router from "@/scripts/router";

// Create a new store instance.
const store = createStore({
  state() {
    const accessToken = JSON.parse(localStorage.getItem("accessToken"));
    if (accessToken != null) {
      return {
        token: accessToken.token
      }
    }
    return {
      token: '',
    }
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
      return {state};
    },
  },
  actions: {
    login({ commit }, userData) {
      axios.post("/users/login", userData, {withCredentials: true})
      .then((res) => {
        global.alert("로그인 성공");
        const token = res.headers['authorization'];
        const accessToken = {
          token: token,
          expire: Date.now() + (60 * 60 * 1000),
        }
        commit('setToken', token);
        localStorage.setItem("accessToken", JSON.stringify(accessToken));
        router.push({path: '/'})
      })
      .catch(() => {
        global.alert("로그인 실패")
      })
    },

    logout({ commit }) {
      global.alert('로그아웃 성공');
      localStorage.removeItem("accessToken");
      commit("setToken", '');
      router.push({path: '/'});
    }
  },

})
export default store;