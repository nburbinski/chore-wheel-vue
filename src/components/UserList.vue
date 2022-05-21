<template>
  <div class="users">
    <h3>Users</h3>

    <ul>
      <li v-for="user in users" :key="user.name">
        <i @click="deleteUser(user)" class="fa-solid fa-x fa-2xs"></i
        >{{ user.name }}
      </li>
    </ul>
    <form @submit.prevent="addUser">
      <label for="userName"></label>
      <input type="text" id="userName" v-model="userName" placeholder="Add User..." />
      <button type="submit"><i class="fa-solid fa-plus"></i></button>
    </form>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "userList",
  methods: {
    deleteUser(user) {
      this.$store.dispatch("deleteUser", user);
    },
    addUser() {
      if (!this.userName) {
        this.$store.dispatch("setAlertMessage", "Please include a name");
        return;
      }
      const newUser = {
        id: Math.random(),
        name: this.userName,
      };

      this.userName = "";

      this.$store.dispatch("changeState", {
        type: "addUser",
        payload: newUser,
      });
    },
  },
  data() {
    return {
      userName: "",
    };
  },
  computed: mapState(["users"]),
};
</script>

<style lang="scss" scoped>
.users {
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  justify-content: center;
  margin: 0 1em;
  background-color: beige;
  border-radius: 5px;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0.5em 0;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  max-width: 50%;
}

li {
  margin: 10px;
}

form {
  display: flex;
  margin: 1em;
}

label {
  margin-right: 5px;
}

input {
}

input,
select {
  padding: 10px;
  margin: 0 10px;
    background-color: rgb(245, 245, 220);
  border: none;
  border-bottom: 2px solid rgb(168, 168, 152);;
}
li > i {
  margin-right: 5px;
  color: red;
}

i {
  cursor: pointer;
}

button,
input[type="submit"],
input[type="reset"] {
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
}
</style>
