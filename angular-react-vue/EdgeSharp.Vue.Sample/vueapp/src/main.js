import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

window.$ipcoption = 'hostobject'; 

createApp(App).use(router).mount('#app')