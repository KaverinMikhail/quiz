<template>
  <div class="login__wrapper">
    <div class="login">
      <div>
        <input type="text" placeholder="Login" v-model="login" />
      </div>
      <div>
        <input type="text" placeholder="Password" v-model="password" />
      </div>
      <button @click="checkUser">Войти</button>
    </div>
  </div>
</template>

<script setup>
import users from "../db/dB-users.js";
import { computed, ref } from "vue";

import { useStore } from "vuex";

const login = ref("");
const password = ref("");

const store = useStore();

const checkUser = function () {
  let access = false;
  users.forEach(function (user) {
    if (user.login === login.value && user.password === password.value) {
      access = true;
      store.state.user.name = login.value;
    }
  });
  login.value = "";
  password.value = "";
  if (access) {
    store.state.user.status = true;
  } else {
    alert("Неверный логин или пароль");
  }
};

const changeUser = function () {
  store.state.user.name = "";
  store.state.user.status = false;
};
</script>

<style scoped>
.login__wrapper {
  display: flex;
  justify-content: center;
}

.login {
  margin-top: 150px;
  display: flex;
  align-items: center;
  flex-direction: column;
}
input {
  width: 200px;
  margin-top: 5px;
  margin-bottom: 10px;
  height: 35px;
  font-size: 18px;
}
</style>
