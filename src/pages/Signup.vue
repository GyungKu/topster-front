<template>
  <div class="form-signup w-100 m-auto">
      <h1 class="h3 mb-3 fw-normal">Please sign in</h1>

      <div class="form-floating">
        <input type="username" class="form-control" id="floatingInput" placeholder="name@example.com" v-model="state.form.username">
        <label for="floatingInput">아이디를 입력해 주세요</label>
      </div>
      <div class="form-floating">
        <input type="nickname" class="form-control" id="floatingInput" placeholder="nickname" v-model="state.form.nickname">
        <label for="floatingInput">닉네임을 입력해 주세요</label>
      </div>
    <div class="form-floating">
      <input type="password" class="form-control" id="floatingPassword" placeholder="Password" v-model="state.form.password">
      <label for="floatingPassword">비밀번호를 입력해 주세요</label>
    </div>
    <div class="form-floating">
      <input type="email" class="form-control" id="floatingInput" placeholder="email" v-model="state.form.email">
      <label for="floatingInput">이메일을 입력해 주세요</label>
    </div>
    <div class="form-floating">
      <input type="intro" class="form-control" id="floatingInput" placeholder="intro" v-model="state.form.intro">
      <label for="floatingInput">자기소개를 입력해 주세요</label>
    </div>

      <button class="btn btn-primary w-100 py-2" @click="submit()">회원 가입</button>
      <p class="mt-5 mb-3 text-body-secondary">&copy; 2017–2023</p>
  </div>
</template>

<script>
import {reactive} from "vue";
import axios from "axios";
import store from "@/scripts/store";

export default {
  setup() {
    const state = reactive({
      form :{
        username:"",
        nickname:"",
        password:"",
        email:"",
        intro:""
      }
    })

    const submit = () => {
      axios.post("/users/signup", state.form)
      .then((res) => {
        store.commit("setUser", res.data)
        window.alert("로그인 성공");
      })
      .catch((err) => {
        console.log(err);
        window.alert("로그인 실패")
      })
    }

    return{state, submit}
  }
}
</script>

<style scoped>
.form-signup {
  max-width: 330px;
  padding: 1rem;
}

.form-signup .form-floating:focus-within {
  z-index: 2;
}

.form-signup input {
  margin-bottom: 10px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
</style>