<template>
  <div v-if="$store.state.user.status == false">
    <MyLogin></MyLogin>
  </div>
  <div v-else>
    <MyHeader></MyHeader>
    <div class="btnUser">
      <router-link to="/user">
        <button class="btnUser__toUser">Личный кабинет</button>
      </router-link>
      <button class="btnUser__toRemoveUser" @click="removeUser">
        Сменить пользователя
      </button>
    </div>
    <MyTask></MyTask>
  </div>
</template>

<script setup>
import MyHeader from "../components/MyHeader";
import MyTask from "../components/MyTask";
import MyLogin from "../components/Mylogin";
import { useStore } from "vuex";

const store = useStore();

const removeUser = function () {
  store.state.user.status = false;
  store.state.userInfo.numberCompletedTask = 0;
  store.state.userInfo.numberRightsTask = 0;
  store.state.userInfo.completedTask = [];
  store.state.userInfo.mistakeTask = [];
};
</script>

<style scoped>
.btnUser {
  margin-top: 15px;
  position: absolute;
  right: 20px;
}
.btnUser__toUser {
  width: 200px;
  margin-right: 15px;
}
.btnUser__toRemoveUser {
  width: 200px;
}
</style>
