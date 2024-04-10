import { createStore } from "vuex";

export default createStore({
  state: {
    user: {
      name: "",
      status: false,
    },
    userInfo: {
      numberCompletedTask: 0,
      numberRightsTask: 0,
      completedTask: [],
      mistakeTask: [],
    },
  },
  getters: {
    percent(state) {
      return Math.floor(
        (state.userInfo.numberRightsTask /
          (state.userInfo.numberCompletedTask * 10)) *
          100
      );
    },
  },
  mutations: {
    removeTasksInfo(userInfo) {
      userInfo.numberCompletedTask = 0;
      userInfo.numberRightsTask = 0;
      userInfo.completedTask = [];
      userInfo.mistakeTask = [];
    },
    removeUser(user) {
      user.status = false;
    },
  },
  actions: {},
  modules: {},
});
