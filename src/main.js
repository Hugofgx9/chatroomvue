import { createApp } from 'vue';
import App from './App.vue';
import store from "./store/store"
import { io } from 'socket.io-client';


const app = createApp(App);
app.config.globalProperties.$socket = io('https://whispering-chamber-09886.herokuapp.com');


app.use(store);
app.mount('#app');
