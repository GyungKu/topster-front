import Home from "@/pages/Home.vue";
import Login from "@/pages/Login.vue";
import Mypage from "@/pages/Mypage.vue";
import {createRouter, createWebHistory} from "vue-router";
import Signup from "@/pages/Signup.vue";
import PostRegister from "@/pages/PostRegister.vue";
import PostDetail from "@/pages/PostDetail.vue";
import TopsterRegister from "@/pages/TopsterRegister.vue";
import Board from "@/pages/Board.vue";

const routes = [
  {name: 'home', path: '/', component: Home},
  {name: 'login', path: '/login', component: Login},
  {name: 'mypage', path: '/mypage', component: Mypage},
  {name: 'topsterRegister', path: '/topster', component: TopsterRegister},
  {name: 'signup', path: '/signup', component: Signup},
  {name: 'postRegister', path: '/topster/:topsterId/posts', component: PostRegister},
  {name: 'postDetail', path: '/posts/:postId', component: PostDetail},
  {name: 'board', path: '/posts', component: Board}
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router;