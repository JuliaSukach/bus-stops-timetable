import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './assets/styles.css'; // Import the CSS file where the font is loaded
import 'bootstrap/dist/css/bootstrap.min.css';

createApp(App).use(store).use(router).mount('#app');
