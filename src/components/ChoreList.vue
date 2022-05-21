<template>
  <table v-if="this.chores.length > 0">
    <tr>
      <th></th>
      <th>Chore</th>
      <th>Due Date</th>
      <th>Assigned To</th>
    </tr>
    <tbody>
      <!-- List all Chores -->
      <tr
        v-for="chore in this.chores"
        :key="chore.choreName"
        @dblclick="toggleCompleted(chore)"
        :class="{ completed: chore.completed }"
      >
        <td>
          <i
            v-if="chore.completed"
            @click="toggleCompleted(chore)"
            class="fa-solid fa-circle-check"
          ></i>
          <i
            v-else
            @click="toggleCompleted(chore)"
            class="fa-regular fa-circle-check"
          ></i>
        </td>

        <td>{{ chore.chore }}</td>
        <td>{{ chore.dueDate }}</td>
        <td>{{ chore.assignedTo }}</td>
        <td>
          <i @click="deleteChore(chore)" class="fa-solid fa-trash"></i>
        </td>
      </tr>
    </tbody>
  </table>
  <p v-else>No chores yet</p>
</template>

<script>
export default {
  methods: {
    toggleCompleted(chore) {
      this.$store.dispatch("changeState", {
        type: "toggleCompleted",
        payload: chore,
      });
    },
    deleteChore(chore) {
      this.$store.dispatch("changeState", {
        type: "deleteChore",
        payload: chore,
      });
    },
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
      this.assignedTo = "randomUser";
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
  props: ["chores"],
};
</script>

<style scoped>
.completed {
  background-color: lightgreen;
}

td {
  padding: 10px 0px;
  text-align: center;
  vertical-align: middle;
  width: 150px;
}

i {
  cursor: pointer;
  margin: 0 5px;
}

label {
  margin-right: 5px;
}

input,
select {
  padding: 10px;
  margin: 0 10px;
  background-color: rgb(245, 245, 220);
  border: none;
  border-bottom: 2px solid rgb(168, 168, 152);
}

thead {
  align-items: space-between;
  background-color: grey;
}

table {
  border-collapse: collapse;
  margin: 0 auto;
}

th {
  padding-top: 12px;
  padding-bottom: 12px;
}

.choresTitle {
  display: flex;
}

span > i {
  display: flex;
  align-items: center;
  justify-content: center;
}

p {
  background-color: lightgrey;
  padding: 10px;
  margin: 0 25%;
  border-radius: 5px;
}
</style>
