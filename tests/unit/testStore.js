// Initial state that will be required for most tests

export const initialStoreState = {
  state() {
    return {
      chores: [
        {
          chore: "Washing Dishes",
          assignedTo: "Nic",
          dueDate: new Date(2019, 2, 15).toISOString().substr(0, 10),
          completed: false,
        },
        {
          chore: "Vacuuming",
          assignedTo: "Nic",
          dueDate: new Date(2019, 2, 15).toISOString().substr(0, 10),
          completed: false,
        },
        {
          chore: "Feeding the cat",
          assignedTo: "Nic",
          dueDate: new Date(2019, 2, 15).toISOString().substr(0, 10),
          completed: true,
        },
      ],
      columns: [
        { columnName: "Chore", columnId: "chore" },
        { columnName: "Due Date", columnId: "dueDate" },
        { columnName: "Assigned To", columnId: "assignedTo" },
      ],
      users: [{ name: "Nic" }, { name: "Jenny" }, { name: "John" }],
      alert: "",
    };
  },
  getters: {
    getChoreByName(state) {
      return (name) => {
        return state.chores.find((chore) => chore.chore === name);
      };
    },
    allChores(state) {
      const chores = state.chores.filter((chore) => !chore.completed);
      const completedChores = state.chores.filter((chore) => chore.completed);
      return { chores, completedChores };
    },
  },
  mutations: {
    addUser(state, user) {
      state.users.push(user);
    },
    addChore(state, chore) {
      state.chores.push(chore);
    },
    toggleCompleted(state, chore) {
      const index = state.chores.indexOf(chore);
      state.chores[index].completed = !state.chores[index].completed;
    },
    deleteChore(state, chore) {
      const index = state.chores.indexOf(chore);
      state.chores.splice(index, 1);
    },
    initializeStore(state) {
      if (localStorage.getItem("store")) {
        this.replaceState(
          Object.assign(state, JSON.parse(localStorage.getItem("store")))
        );
      } else {
        localStorage.setItem("store", JSON.stringify(state));
      }
    },
    saveStore(state) {
      localStorage.setItem("store", JSON.stringify(state));
    },
    setAlertMessage(state, message) {
      state.alert = message;
    },
    deleteUser(state, user) {
      const index = state.users.indexOf(user);
      state.users.splice(index, 1);
    },
  },
  actions: {
    changeState({ commit }, payload) {
      commit(payload.type, payload.payload);
      commit("saveStore");
    },
    setAlertMessage({ commit }, payload) {
      commit("setAlertMessage", payload);
      setTimeout(() => {
        commit("setAlertMessage", "");
      }, 5000);
    },
    deleteUser({ commit }, user) {
      commit("deleteUser", user);
      commit("saveStore");
    },
  },
  modules: {},
};
