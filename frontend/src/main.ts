import { createApp } from 'vue'
import './style.css'
import { createPinia } from 'pinia'
import App from './App.vue'
import 'virtual:uno.css'

createApp(App).use(createPinia()).mount('#app')
