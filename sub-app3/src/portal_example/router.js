/**
 * 子应用路由 所需配置项
 *  如果遇到不能无法替换router/index.js 的情况 可能是 router的实例化不在此文件里
 *  请自行 配置 router  
 *  @微服务 路由需支持 history模式 
 *  @base 需自行添加项目的唯一key 请 将 $1 替换 项目 package.json文件里的name属性 例如'/sub-app1'
 */

const router = new VueRouter({
  mode: 'history',
  base: process.env.VUE_APP_BASE_PATH ||
  (window.__POWERED_BY_QIANKUN__ ? $1 : '/'),
  routes
})
