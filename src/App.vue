<template>
  <!-- <Messages :socket="socket" /> -->
  <!-- <Users  :socket="socket" /> -->
  <Paper/>
</template>

<script>
import Messages from '@/components/Messages.vue';
import Users from '@/components/Users.vue';
import Paper from './components/Paper.vue';
import { io } from 'socket.io-client';
import { mapMutations } from 'vuex';

export default {
  name: 'App',
  components: {
    Messages,
    Users,
    Paper
  },

  data() {
    return {
      socket: io('https://whispering-chamber-09886.herokuapp.com'),
    };
  },

  mounted() {
    this.setSocket(this.socket);
  },

  methods: {
    ...mapMutations([
      'setSocket'
    ])
  }
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  height: 100vh;
  overflow: hidden;
  display: grid;
  grid-template-columns: 1fr 1fr;
  //-webkit-font-smoothing: antialiased;
  // -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  // color: #2c3e50;
  // margin-top: 60px;
}

</style>
