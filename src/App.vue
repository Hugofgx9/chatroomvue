<template>
  <Header />
  <!-- <Messages /> -->
  <!-- <Users /> -->
  <!-- <Paper/> -->
  <Bottom/>
</template>

<script>
import Messages from '@/components/Messages.vue';
import Users from '@/components/Users.vue';
import Bottom from './components/Bottom.vue';
import Paper from './components/Paper.vue';
import Header from './components/Header.vue';
import { mapMutations } from 'vuex';

export default {
  name: 'App',
  components: { Messages, Users, Header, Bottom, Paper },

  mounted() {
    //messages
    this.$socket.on('message', message => this.addMessage(message));
    this.$socket.on('messages', messages => messages.forEach(msg => this.addMessage(msg)));
    this.$socket.emit('getMessages');

    //users
    this.$socket.on('user', user => this.addUser(user));
    this.$socket.on('userConnection', user => this.addUser(user));
    // this.socket.on('userDisconnection', user => this.removeUser(user));
    this.$socket.on('users', users => users.forEach(user => this.addUser(user)));
    this.$socket.on('updateUsername', user => this.updateUser(user));
    this.$socket.emit('getUsers');
  },
  methods: {
    ...mapMutations(['addMessage', 'addUser', 'updateUser'])
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  // display: grid;
  // grid-template-columns: 1fr 1fr;
}
</style>
