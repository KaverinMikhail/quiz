<template>
  <MyHeader></MyHeader>
  <div class="btnHome">
    <router-link to="/">
      <button class="header__nav__login">Назад</button>
    </router-link>
  </div>
  <div class="user__wrapper">
    <div class="user">
      <div class="user__info">
        <div>
          Количество выполненных заданий -
          {{ $store.state.userInfo.numberCompletedTask }}
        </div>
        <div>
          Количество правильных ответов -
          {{ $store.state.userInfo.numberRightsTask }}
        </div>
        <div>
          Процент правильных ответов -
          {{
            $store.state.userInfo.numberCompletedTask == 0
              ? 0
              : $store.getters.percent
          }}
          %
        </div>
        <div class="lookTasks">
          <div class="lookTasks__header">
            <div class="lookTasks__title">История заданий:</div>
            <select name="" id="" v-model="select" class="lookTasks__select">
              <option value="" disabled>Выберите из списка</option>
              <option value="right">Правильные</option>
              <option value="mistake">Неправильные</option>
            </select>
          </div>
          <hr />
          <div class="lookTasks__select__view">
            <div v-for="item in sort">
              <strong>Задание {{ item.id }}. Вопрос: </strong>
              {{ item.name }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import MyHeader from "../components/MyHeader";
import { ref } from "vue";
import { useStore } from "vuex";
import { computed } from "vue";
import { watch } from "vue";

const store = useStore();

let sort = "";

let select = ref("");

watch(select, function () {
  if (select.value == "right") {
    sort = store.state.userInfo.completedTask;
    sort.sort((a, b) => a.id - b.id);
  }
  if (select.value == "mistake") {
    sort = store.state.userInfo.mistakeTask;
    sort.sort((a, b) => a.id - b.id);
  }
});
</script>

<style scoped>
.btnHome {
  margin-top: 15px;
  position: absolute;
  right: 20px;
}

.user__wrapper {
}
.user {
}
.user__info {
  margin-top: 25px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}
.lookTasks {
  margin-top: 15px;
}
.lookTasks__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.lookTasks__title {
  margin-bottom: 15px;
}
.lookTasks__select {
  margin-bottom: 15px;
}
.lookTasks__select__view {
  width: 750px;
}
</style>
