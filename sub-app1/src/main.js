import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/components/ZhlCustomComp/index.js'
import './public-path'
Vue.config.productionTip = false
Vue.use(ElementUI, { size: 'small' })

let instance = null

function render () {
  instance = new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
}
// 确保独立运行
window.__POWERED_BY_QIANKUN__ || render()

export async function bootstrap (props = {}) {
  // console.log('sub-app1 加载中')
  // 父应用传递的值 挂载vue原型上
  Vue.prototype.parentData = {...props.data}
  // 父应用传递的 方法 挂载原型上
  Vue.prototype.parentFns = props.fns
}

export async function mount (props) {
  
  // console.log('sub-app1 加载完毕', props)
  render()
}

export async function unmount () {
  instance.$destroy()
  instance = null
}