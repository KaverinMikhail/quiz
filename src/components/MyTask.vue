<template>
  <main>
    <div v-if="status">
      <div class="tasks__wrapper">
        <div class="tasks" v-for="task in tasksTitle">
          <button @click="gameStart(task.id)" class="tasks__btn__all">
            {{ task.name }}
          </button>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="quiz__wrapper">
        <div class="quiz">
          <div class="quiz__progressbar">
            <progress
              :value="progressBar"
              :max="totalTasks"
              :style="styleProgressBar"
            ></progress>
          </div>
          <div class="quiz__title" :style="styleWonOrLoss">{{ taskTitle }}</div>
          <div class="quiz__answers" :style="styleVisability">
            <div class="quiz__answers__item__one">
              <button @click="btnAns(taskAnsOne)">
                {{ taskAnsOne }}
              </button>
            </div>
            <div class="quiz__answers__item__two">
              <button @click="btnAns(taskAnsTwo)">{{ taskAnsTwo }}</button>
            </div>
            <div class="quiz__answers__item__three">
              <button @click="btnAns(taskAnsThree)">{{ taskAnsThree }}</button>
            </div>
            <div class="quiz__answers__item__four">
              <button @click="btnAns(taskAnsFour)">{{ taskAnsFour }}</button>
            </div>
          </div>
        </div>
        <div>
          <button class="quiz__btnNext" @click="nextTask" v-if="btnOn">
            Следующий вопрос
          </button>
          <button class="quiz__btnNext" @click="backTask" v-if="btnOff">
            Назад
          </button>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref } from "vue";
import { watch } from "vue";
import { useStore } from "vuex";

import dataBaseTasksTitle from "../db/dB-tasksTitle.js";
import dataBaseTasks from "../db/dB-tasks.js";

const store = useStore();

const tasksTitle = dataBaseTasksTitle;
const tasks = dataBaseTasks;

let btnOn = ref(true);
let btnOff = ref(false);

let styleWonOrLoss = "";

const styleWon = {
  "background-color": "green",
  color: "white",
  "font-size": "34px",
  "border-radius": "13px",
};
const styleLoss = {
  "background-color": "red",
  color: "black",
  "font-size": "34px",
  "border-radius": "13px",
};

let styleVisability = "";
let styleProgressBar = "";

const styleVis = {
  visibility: "visible",
};

const styleInvis = {
  visibility: "hidden",
};

let status = ref(1);

let startGame = ref(0);

let progressBar = ref(0);

let taskTitle = ref("");

let taskAnsOne = ref("");
let taskAnsTwo = ref("");
let taskAnsThree = ref("");
let taskAnsFour = ref("");

let rightAnswer = ref(0);

let trueAnswers = 0;

let totalTasks = ref(0);

let allTask = "";

const gameStart = function (taskId) {
  status.value = 0;
  btnOn.value = false;
  let arr = tasks.filter((item) => item.id == taskId);

  allTask = arr;

  totalTasks.value = arr.length - 1;

  rightAnswer.value = arr[startGame.value].rightAnswer;

  taskTitle.value = arr[startGame.value].name;
  taskAnsOne.value = arr[startGame.value].answers[0];
  taskAnsTwo.value = arr[startGame.value].answers[1];
  taskAnsThree.value = arr[startGame.value].answers[2];
  taskAnsFour.value = arr[startGame.value].answers[3];

  watch(startGame, function () {
    rightAnswer.value = arr[startGame.value].rightAnswer;
    taskTitle.value = arr[startGame.value].name;
    taskAnsOne.value = arr[startGame.value].answers[0];
    taskAnsTwo.value = arr[startGame.value].answers[1];
    taskAnsThree.value = arr[startGame.value].answers[2];
    taskAnsFour.value = arr[startGame.value].answers[3];
  });
};

const btnAns = function (answers) {
  styleVisability = styleInvis;
  btnOn.value = true;
  if (rightAnswer.value == answers) {
    taskTitle.value = "Верно!";
    styleWonOrLoss = styleWon;
    store.state.userInfo.numberRightsTask++;
    store.state.userInfo.completedTask.push(allTask[startGame.value]);
    trueAnswers++;
  } else {
    store.state.userInfo.mistakeTask.push(allTask[startGame.value]);
    taskTitle.value = "Неверно!";
    styleWonOrLoss = styleLoss;
  }
};

const nextTask = function () {
  btnOn.value = false;
  styleWonOrLoss = "";
  styleVisability = styleVis;
  if (startGame.value == totalTasks.value) {
    styleVisability = styleInvis;
    styleProgressBar = styleInvis;
    taskTitle.value = `Вы ответили правильно ${trueAnswers} из ${
      totalTasks.value + 1
    } вопросов`;
    btnOn.value = false;
    btnOff.value = true;
    store.state.userInfo.numberCompletedTask++;
  } else {
    startGame.value++;
    progressBar.value++;
  }
};

const backTask = function () {
  styleVisability = styleVis;
  styleProgressBar = styleVis;

  startGame.value = 0;
  progressBar.value = 0;
  taskTitle.value = "";
  taskAnsOne.value = "";
  taskAnsTwo.value = "";
  taskAnsThree.value = "";
  taskAnsFour.value = "";
  rightAnswer.value = 0;
  trueAnswers = 0;
  totalTasks.value = 0;

  btnOn.value = true;
  btnOff.value = false;

  status.value = 1;
};
</script>

<style scoped>
.tasks__wrapper {
  margin-top: 50px;
  margin-left: 30px;
  margin-right: 30px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;

  width: 100%;
  height: 100%;
}
.tasks {
  margin: 10px;
  height: 55px;
  width: 250px;
}
.tasks__btn__all {
  height: 100%;
  width: 100%;
  background-color: rgb(0, 0, 0, 0.5);
}
.quiz__wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.quiz {
  border: 1px solid black;
  border-radius: 20px;
  background: rgb(0, 0, 0, 0.3);
  width: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 25px;
}
.quiz__progressbar {
}
.quiz__title {
  margin-top: 35px;
  height: 50px;
}
.quiz__answers {
  padding-top: 15px;
  width: 250px;

  margin-top: 35px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.quiz__answers__item__one {
  padding: 5px;
}
.quiz__answers__item__two {
  padding: 5px;
}
.quiz__answers__item__three {
  padding: 5px;
}
.quiz__answers__item__four {
  padding: 5px;
}
.quiz__btnNext {
  margin-top: 30px;
  width: 200px;
}
</style>
