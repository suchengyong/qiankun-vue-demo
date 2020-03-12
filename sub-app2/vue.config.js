module.exports = {
  // 关闭 eslint 检测
  lintOnSave: false,
  // 生产环境不生成sourcemap文件
  productionSourceMap: false,
  filenameHashing: true,
  /**
   * You will need to set publicPath if you plan to deploy your site under a sub path,
   * for example GitHub Pages. If you plan to deploy your site to https://foo.github.io/bar/,
   * then publicPath should be set to "/bar/".
   * In most cases please use '/' !!!
   * Detail: https://cli.vuejs.org/config/#publicpath
   */
  publicPath: process.env.NODE_ENV === 'development'?
    process.env.VUE_APP_BASE_PATH : '/subapp/sub-app2/',
}
