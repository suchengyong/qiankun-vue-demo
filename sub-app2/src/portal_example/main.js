/**
 * 子应用main.js 所需配置项
 *  如果遇到不能无法替换main.js 的情况 可能是 Vue的实例化不在此文件里
 *  请将以下代码 直接放在 main.js的最后 并将 $1替换成 new Vue({...})
 *  如遇项目报错  也请手动替换
 */

exports.replacement = `
let instance = null
function render () {
  instance = $1
}
// 确保子应用独立运行
window.__POWERED_BY_QIANKUN__ || render()

export async function bootstrap (props = {}) {
  // eslint-disable-next-line no-console
  // console.log('子应用 加载中')
  // 父应用传递的值 挂载vue原型上
  Vue.prototype.parentData = {...props.data}
  // 父应用传递的 方法 挂载原型上
  Vue.prototype.parentFns = props.fns
}
export async function mount (props) {
  // eslint-disable-next-line no-console
  // props 为父应用传递的参数 可自行配置 可前往父应用singleSpa.js 配置
  // console.log('子应用 加载完毕')
  render()
}
export async function unmount () {
  instance.$destroy()
  instance = null
}
`
