<template>
  <form @submit.prevent="addChore">
    <table>
      <tr>
        <td>
          <input
            type="text"
            id="choreName"
            v-model="choreName"
            placeholder="Add Chore..."
          />
        </td>
        <td>
          <input v-model="dueDate" type="date" />
        </td>
        <td>
          <select v-model="assignedTo">
            <option default selected value="randomUser">Random User</option>
            <option v-for="user in users" :key="user.name">
              {{ user.name }}
            </option>
          </select>
        </td>

        <td>
          <i @click="addChore" class="fa-solid fa-plus"></i>
        </td>
      </tr>
    </table>
  </form>
</template>

<script>
export default {
  name: "AddChore",
  // MapState would not work with v-for select
  computed: {
    users() {
      return this.$store.state.users;
    },
  },
  methods: {
    addChore() {
      // check for empty inputs
      if (!this.choreName || !this.assignedTo) {
        this.$store.dispatch("setAlertMessage", "Please fill out all fields");
        return;
      }

      if (this.assignedTo === "randomUser") {
        const randomUserIndex = Math.floor(
          Math.random() * this.$store.state.users.length
        );

        this.assignedTo = this.$store.state.users[randomUserIndex].name;
      }

      // Create new chore
      const newChore = {
        id: Math.random(),
        chore: this.choreName,
        assignedTo: this.assignedTo,
        dueDate: this.dueDate,
        completed: false,
      };

      // Clear inputs
      this.choreName = "";
      this.assignedTo = "";
      this.dueDate = new Date().toISOString().substr(0, 10);

      this.$store.dispatch("changeState", {
        type: "addChore",
        payload: newChore,
      });
    },
  },
  data() {
    return {
      choreName: "",
      assignedTo: "randomUser",
      dueDate: new Date().toISOString().substr(0, 10),
    };
  },
};
</script>

<style scoped>
i {
  cursor: pointer;
  margin: 0 5px;
}

input,
select {
  padding: 10px;
  margin: 0 10px;
  background-color: rgb(245, 245, 220);
  border: none;
  border-bottom: 2px solid rgb(168, 168, 152);
  width: 80%;
}

table {
  border-collapse: collapse;
  margin: 0 auto;
}
</style>
