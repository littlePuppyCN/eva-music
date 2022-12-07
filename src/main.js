import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'
import './assets/main.css'
import myPinia from '@/router/pinia'

const app = createApp(App)
Object.keys(ElementPlusIconsVue).forEach((key) => {
    app.component(key, ElementPlusIconsVue[key])
})
app.use(ElementPlus)
app.use(createPinia())
app.use(router)
app.use(myPinia)

app.mount('#app')
