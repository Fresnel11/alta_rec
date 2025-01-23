import { createApp } from 'vue'
import PrimeVue from 'primevue/config';
import './style.css'
import App from './App.vue'
import router from './router'
import pinia from './store'

const app = createApp(App);
app.use(router);
app.use(pinia);
app.use(PrimeVue);
app.mount('#app')
