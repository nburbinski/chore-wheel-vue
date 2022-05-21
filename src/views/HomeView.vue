<template>
  <Header />
  <AlertItem />
  <div class="home">
    <ChoreList :chores="this.allChores.chores" />
    <AddChore />
    <span class="choresTitle">
      <h3>Completed Chores</h3>
      <i
        @click="toggleShowCompletedChores()"
        v-if="this.$store.state.showCompletedChores"
        class="fa-solid fa-chevron-down"
      ></i>
      <i
        @click="toggleShowCompletedChores()"
        v-else
        class="fa-solid fa-chevron-up"
      ></i>
    </span>
    <ChoreList
      v-if="this.$store.state.showCompletedChores"
      :chores="allChores.completedChores"
    />
    <UserList class="users" />
  </div>
</template>

<script>
// @ is an alias to /src
import Header from "@/components/Header.vue";
import ChoreList from "../components/ChoreList.vue";
import UserList from "@/components/UserList.vue";
import AlertItem from "@/components/AlertItem.vue";
import AddChore from "@/components/AddChore.vue";
import { mapState, mapGetters } from "vuex";

export default {
  name: "HomeView",
  computed: {
    ...mapState(["columns", "users"]),
    ...mapGetters(["allChores"]),
  },
  methods: {
    toggleShowCompletedChores() {
      this.$store.commit("toggleShowCompletedChores");
    },
  },
  components: {
    Header,
    ChoreList,
    UserList,
    AlertItem,
    AddChore,
  },
};
</script>

<style lang="scss" scoped>
.home {
  margin: 0px auto;
  max-width: 60%;
  border-radius: 5px;
  box-sizing: border-box;
  padding: 0 0.5rem;
}

.choresTitle {
  display: flex;
}

span > i {
  display: flex;
  align-items: center;
  margin-left: 10px;
  cursor: pointer;
}

@media only screen and (max-width: 1200px) {
  .home {
    max-width: 80%;
  }
}

@media only screen and (max-width: 800px) {
  .home {
    max-width: 100%;
  }
}
</style>
