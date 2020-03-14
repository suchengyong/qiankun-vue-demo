/**
 * 微信扫码登录
 */
export default {
  data() {
    return {
      wx_redirect_uri: 'http://www.mogujie.com/oauth/callback/weixin/mogujie', //
      WXAPPID: 'wx4530e35e8a9fc5cd',   // 微信开发者id 
    }
  },
  methods: {
    wxLogin() {  // 微信扫码登录
      // 显示容器
      this.$refs['otherLogin'].showBox = true
      this.$nextTick(() => {
        new WxLogin({
          self_redirect: false,
          id: "login_container", 
          appid: this.WXAPPID, 
          scope: "snsapi_login", 
          redirect_uri: this.wx_redirect_uri,
          state: "WX_STATE",
          style: "black",
          href: "data:text/css;base64,JXU4RkQ5JXU5MUNDJXU2NjJGJXU4OTgxJXU1MkEwJXU1QkM2JXU3Njg0JXU1MTg1JXU1QkI5JXVGRjAxLmltcG93ZXJCb3glMjAucXJjb2RlJTIwJTdCd2lkdGglM0ElMjAxNjBweCUzQiU3RCUwQS5pbXBvd2VyQm94JTIwLnRpdGxlJTIwJTdCZGlzcGxheSUzQSUyMG5vbmUlMjFpbXBvcnRhbnQlM0IlN0QlMEEuaW1wb3dlckJveCUyMC5pbmZvJTIwJTdCd2lkdGglM0ElMjAyMDBweCUzQiU3RCUwQS5zdGF0dXNfaWNvbiUyMCU3QmRpc3BsYXklM0ElMjBub25lJTdEJTBBLmltcG93ZXJCb3glMjAuc3RhdHVzJTIwJTdCdGV4dC1hbGlnbiUzQSUyMGNlbnRlciUzQiU3RCUyMA=="
        })
      })
    }
  }
}