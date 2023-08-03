import { createApp } from 'vue'
import '@/styles/main.scss'
import App from '@/App.vue'
import router from '@/router'
import { toastPlugin } from '@/plugins/useToastPlugin'

createApp(App)
    .use(toastPlugin)
    .use(router)
    .mount('#app')