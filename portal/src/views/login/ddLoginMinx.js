export default {
  data() {
    return {
      redirect_uri: '',
      DDAPPID: 'XXXXXX', // 钉钉开发者id
    }
  },
  methods: {
    // 钉钉登录方式
    ddLogin() {
      // 显示容器
      this.$refs['otherLogin'].showBox = true
      this.$nextTick(() => {
        this.redirect_uri = window.location.origin  // 获取来源路径
        const goto = encodeURIComponent(`https://oapi.dingtalk.com/connect/oauth2/sns_authorize?appid=${this.DDAPPID}&response_type=code&scope=snsapi_login&state=STATE&redirect_uri=${this.redirect_uri}`)
        var obj = DDLogin({
          id: "login_container", //这里需要你在自己的页面定义一个HTML标签并设置id，例如<div id="login_container"></div>或<span id="login_container"></span>
          goto, //请参考注释里的方式
          style: "border:none;background-color:transparent;margin: 0 auto",
          width : "365",
          height: "365"
        })
        this.listenDDCb()
      })
    },
    // 监听钉钉扫码之后的返回
    listenDDCb() {
      const hanndleMessage = function (e) {
        const origin = e.origin
        if(origin == "https://login.dingtalk.com" ) {//判断是否来自ddLogin扫码事件。
          const loginTmpCode = e.data //拿到loginTmpCode后就可以在这里构造跳转链接进行跳转了
          let url = `https://oapi.dingtalk.com/connect/oauth2/sns_authorize?appid=${this.DDAPPID}&response_type=code&scope=snsapi_login&state=STATE&redirect_uri=${this.redirect_uri}&loginTmpCode=${loginTmpCode}`
          window.location.href = url
        }
      }
      if (typeof window.addEventListener != 'undefined') {
        window.addEventListener('message', hanndleMessage, false)
      } else if (window.attachEvent != 'undefined') {
        window.attachEvent('onmessage', hanndleMessage)
      }
    }
  }
}