import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI, { size: 'small' })

// 引入 公用组件
const components = [
  'ZhlSearchForm',
]
// 注册 公用 组件
components.forEach(name => {
  const component = require(`./${name}/index.vue`).default
  Vue.component(component.name, component)
})
