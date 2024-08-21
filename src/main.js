import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from "../router.js";
import {createPinia} from 'pinia'
const pinia = createPinia()

// const app = createApp(App);
// createApp(App).mount('#app')
// app.use(router);

const app = createApp(App);
app.use(router);
app.mount('#app');
app.use(pinia)
