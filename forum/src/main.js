import { createApp } from 'vue'
import './style.css'
import "./assets/fonts/font.css"
import App from './App.vue'
import 'amfe-flexible'
// px2rem 自适应
import 'lib-flexible'
import './router.js'
import router from "./router.js";


const app = createApp(App);

// 自定义的一个用户信息，储存的是默认用户泽泽木的用户 _id，便于在提交用户的交互信息
window.sessionStorage.setItem('_id','649194a3ef5f14b729782f4f')

app.use(router);

app.mount('#app')
