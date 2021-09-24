<template>
  <!-- <Login /> -->
  <Header />
  <!-- <Paper/> -->
  <Svg/>
  <!-- <Konva /> -->
  <Bottom />
</template>

<script>
import Bottom from "./components/Bottom.vue";
import Svg from "./components/Svg.vue";
import Paper from "./components/Paper.vue";
import Konva from "./components/Konva.vue";
import Header from "./components/Header.vue";
import Login from "./components/Login.vue";
import { mapMutations } from "vuex";

export default {
  name: "App",
  components: { Header, Bottom, Login, Paper, Konva, Svg },

  mounted() {
    //messages
    this.setSocket(this.$socket);
    this.$socket.on("message", (message) => this.addMessage(message));
    this.$socket.on("messages", (messages) =>
      messages.forEach((msg) => this.addMessage(msg))
    );
    this.$socket.emit("getMessages");

    //users
    this.$socket.on("user", (user) => this.addUser(user));
    this.$socket.on("userConnection", (user) => this.addUser(user));
    this.$socket.on("userDisconnection", (user) => this.removeUser(user));
    this.$socket.on("users", (users) =>
      users.forEach((user) => this.addUser(user))
    );
    this.$socket.on("updateUsername", (user) => this.updateUser(user));
    this.$socket.emit("getUsers");
  },
  methods: {
    ...mapMutations([
      "addMessage",
      "addUser",
      "updateUser",
      "removeUser",
      "setSocket",
    ]),
  },
};
</script>

<style lang="scss" >
@import "@/sass/style.scss";

#app {
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  background-color: $elevation2;
  // display: grid;
  // grid-template-columns: 1fr 1fr;
}
</style>
