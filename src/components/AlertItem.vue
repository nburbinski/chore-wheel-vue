<template>
  <p v-if="alert">{{ alert }}</p>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "AlertItem",
  computed: mapState(["alert"]),
};
</script>

<style lang="scss" scoped>
p {
  background-color: lightcoral;
  width: 33%;
  align-self: center;
  padding: 10px;
  justify-self: center;
  margin: 10px auto;
  border-radius: 5px;
}
</style>
