import { createApp } from 'vue';
import App from './App.vue';
import store from "./store/store"
import { io } from 'socket.io-client';
import InlineSvg from 'vue-inline-svg';
import VueKonva from 'vue3-konva';



const app = createApp(App);
app.config.globalProperties.$socket = io('https://whispering-chamber-09886.herokuapp.com');
app.component('InlineSvg', InlineSvg);


app.use(VueKonva);
app.use(store);
app.mount('#app');
