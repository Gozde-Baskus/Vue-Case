import { createApp } from 'vue';
import App from './App.vue';
import { createRouter, createWebHistory } from 'vue-router';
import 'bootstrap/dist/css/bootstrap.css'
import '@fortawesome/fontawesome-free/css/all.css';
import axios from 'axios';
import ListPage from './pages/ListPage.vue';
import DetailPage from './pages/DetailPage.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: ListPage },
        { path: '/detail/:id', name: 'detail', component: DetailPage },
    ],
});

const app = createApp(App);
app.config.globalProperties.$axios = axios;

app.use(router);

app.mount('#app');
