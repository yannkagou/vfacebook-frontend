import '@fortawesome/fontawesome-free/css/all.css'
// import 'bootstrap/dist/css/bootstrap.css'
// import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.js'
import axios from 'axios'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ToastPlugin from 'vue-toast-notification';
import {useToast} from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';

import App from './App.vue'
import router from './router'

const app = createApp(App)

axios.defaults.baseURL='https://yannickkagou.pythonanywhere.com'
axios.defaults.withCredentials = true

app.use(createPinia())

// app.use(router, axios, bootstrap)
app.use(router, axios)

app.use(ToastPlugin,{
    position: 'top-right',
    timeout: 4000,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    draggablePercent: 0.6,
    showCloseButtonOnHover: false,
    hideProgressBar: true,
    closeButton: 'button',
    iconEnabled: false,
    rtl: false,
})

app.mount('#app')