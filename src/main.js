import {createApp} from 'vue'
import store from "@/scripts/store";
import router from "@/scripts/router";
import App from './App.vue'
import axios from "axios";

const app = createApp(App);

axios.defaults.baseURL = 'http://localhost:8080/api/v1';
axios.defaults.headers.common['Content-Type'] = 'application/json';
const accessToken = localStorage.getItem("accessToken");
// 로그인이 필요한 페이지
const needLogin = ['mypage', 'topsterRegister', 'postRegister'];

router.beforeEach((to) => {
  if (needLogin.includes(to.name) && accessToken == null) {
    return {name:'login'}
  }
})

if (accessToken !== null) { // accessToken 이 존재한다면
  const token = JSON.parse(accessToken);
  if (Date.now() >= token.expire) { // 만료기간이 지났다면 localStorage에서 제거
    localStorage.removeItem("accessToken");
  } else { // 안 지났다면 store에 넣기
    axios.defaults.headers.common['Authorization'] = token.token;
  }
}

app.config.globalProperties.axios = axios;


app.use(store).use(router).mount('#app');
