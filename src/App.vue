<template>
  <Messages />
  <Users />
  <!-- <Paper/> -->
  <SendMessage />
</template>

<script>
import Messages from '@/components/Messages.vue';
import Users from '@/components/Users.vue';
import SendMessage from './components/SendMessage.vue';
import Paper from './components/Paper.vue';

export default {
  name: 'App',
  components: {
    Messages,
    Users,
    SendMessage,
    Paper
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  height: 100vh;
  width: 100vw;
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
