import { createApp } from 'vue'
import './style/reset.css'
import './style/index.scss'
import 'uno.css'
import { createPinia } from 'pinia'
import { setupRouter } from './router'
import App from './App.vue'

const pinia = createPinia()

const app = createApp(App)

app.use(pinia)
app.use(setupRouter)
app.mount('#app')
