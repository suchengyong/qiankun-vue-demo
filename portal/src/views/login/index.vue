<template>
  <div class="login-container">
    <div class="login-box">
      <el-form
        ref="loginForm"
        :model="loginForm"
        class="login-form"
        auto-complete="off"
        label-position="left"
      >
        <h3 class="title">登 录</h3>
        <el-form-item prop="username">
          <span class="svg-container">
            <svg-icon icon-class="user" color="#d9b77c"/>
          </span>
          <el-input
            v-model="loginForm.username"
            name="username"
            type="text"
            auto-complete="on"
            placeholder="请输入用户名"
          />
          <span class="virtual-border"></span>
        </el-form-item>
        <el-form-item prop="password">
          <span class="svg-container">
            <svg-icon icon-class="password" color="#d9b77c"/>
          </span>
          <el-input
            v-model="loginForm.password"
            :type="passwordType"
            name="password"
            auto-complete="on"
            placeholder="请输入密码"
            @keyup.enter.native="handleLogin"
          />
          <span class="virtual-border"></span>
          <span class="show-pwd" @click="showPwd">
            <svg-icon v-if="passwordType==='password'" icon-class="eye" color="#d9b77c"/>
            <svg-icon v-else icon-class="open_eye" color="#d9b77c"/>
          </span>
        </el-form-item>
        <el-form-item class="forget-pwd-btn">
          <el-button type="text">忘记密码？</el-button>
        </el-form-item>
        <el-form-item>
          <el-button
            :loading="loading"
            type="primary"
            class="login-btn"
            @click.native.prevent="handleLogin"
          >登 录</el-button>
        </el-form-item>
      </el-form>
      <div class="login-new-line">
        <span>第三方登录</span>
      </div>
      <div class="login-in-way">
        <ul class="clearfix">
          <li class="in-way-dd" @click.stop="ddLogin">
            <div class="recommd">推荐</div>
            <div class="item">
              <i style="color: #1296DB" class="zht-icon-shejiaodingding"></i>
            </div>
            <span>钉钉登录</span>
          </li>
          <li class="in-way-wx" @click.stop="wxLogin">
            <div class="item">
              <i style="width: 24px; color: #23BF36" class="zht-icon-icon-weixin"></i>
            </div>
            <span>微信登录</span>
          </li>
          <li class="in-way-sj">
            <div class="item">
              <i style="width: 24px; color: #FF9100" class="zht-icon-icon-shouji"></i>
            </div>
            <span>手机登录</span>
          </li>
        </ul>
      </div>
    </div>
    <!-- 其他登录方式的 容器 -->
    <other-login ref="otherLogin" />
  </div>
</template>

<script>
import OtherLogin from './otherLogin'
import ddLoginMinx from './ddLoginMinx'
import wxLoginMinx from './wxLoginMinx'

export default {
  name: 'Login',
  components: { OtherLogin },
  mixins: [ddLoginMinx, wxLoginMinx],
  data() {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      passwordType: 'password',
      loading: false,
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    showPwd() {
      this.passwordType = this.passwordType === 'password' ? '' : 'password'
    },
    handleLogin() {
      if (this.loading) return  // 防止重复点击登录
      // 主动校验 避免 每次 在 输入框输入 就校验
      const { username, password } = this.loginForm
      this.loading = true
      if (!username.trim().length) {
        this.$message.error({
          message: '请输入用户名',
          duration: 1000
        })
        this.loading = false
        return false
      }
      if (password.length < 5 || password.length > 20) {
        this.$message.error({
          message: '请输入5-20位密码',
          duration: 1000
        })
        this.loading = false
        return false
      }
      // 登录
      this.$store.dispatch('login', this.loginForm).then(() => {
        this.loading = false
        this.$message.success({
          message: '登录成功',
          duration: 1000,
          onClose: () => {
            this.$router.push({ path: this.redirect || '/' })
          }
        })
      }).catch(err => {
        this.loading = false
        this.$message.error({
          message: err || '验证错误， 请重新登录',
          duration: 1500
        })
      })
    },
  }
}
</script>

<style lang="less" scoped>
@bg: #fff;
@dark_gray: #889aa4;
@light_color: #d9b77c;
@cursor: #fff;
@virtual_color: #be9966;
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */
@supports (-webkit-mask: none) and (not (cater-color: @cursor)) {
  .login-container .el-input input {
    color: @cursor;
    &::first-line {
      color: @light_color;
    }
  }
}

.login-container {
  position: relative;
  height: 100%;
  width: 100%;
  overflow: hidden;
  &::after {
    content: "";
    position: absolute;
    z-index: 1;
    height: 100%;
    width: calc(100% - 584px);
    background: @bg url(../../assets/images/bg.png) no-repeat;
    background-size: cover;
  }
  .login-box {
    position: absolute;
    z-index: 2;
    top: 0;
    right: 0;
    width: 584px;
    max-width: 100%;
    bottom: 0;
    overflow-y: auto;
    overflow-x: hidden;
    padding: 10% 8% 10%;
    box-sizing: border-box;
    .login-new-line {
      width: 100%;
      height: 1px;
      margin: 24px auto 0;
      background: linear-gradient(90deg, rgba(217,183,124, 0) 0%, rgba(217,183,124, 1) 50%, rgba(217,183,124, 0) 100%);
      position: relative;
      span {
        width: 120px;
        display: block;
        height: 20px;
        line-height: 20px;
        background: #f3f5f7;
        position: absolute;
        top: -10px;
        left: 0;
        right: 0;
        margin: 0 auto;
        font-size: 13px;
        font-weight: bold;
        color: @light_color;
        text-align: center;
        letter-spacing:1px;
      }
    }
    .login-in-way {
      display: flex;
      justify-content: center;
      margin: 40px auto 0;
      ul {
        width: 232px;
        margin: 0;
        padding: 0;
        list-style: none;
      }
      li {
        color: @light_color;
        font-weight: bold;
        width: 64px;
        float: left;
        font-size: 13px;
        text-align: center;
        cursor: pointer;
        &:nth-child(2) {
          margin: 0 20px;
        }
        .item {
          width: 40px;
          height: 40px;
          border: 1px solid #ccc;
          border-radius: 50%;
          box-sizing: border-box;
          text-align: center;
          margin: 0 auto 8px;
          i {
            line-height: 40px;
            font-size: 28px;
          }
        }
        &:hover {
          i {
            color: #f3f5f7!important;
          }
        }
        &.in-way-dd {
          position: relative;
          .recommd {
            font-size: 12px;
            font-weight: 400;
            color: #fff;
            line-height: 20px;
            position: absolute;
            top: -30px;
            left: 10px;
            width: 40px;
            height: 20px;
            background: #1296DB;
            border-radius: 10px;
            &::after {
              content: '';
              position: absolute;
              width: 0;
              height: 0;
              border: 6px solid transparent;
              border-top-color: #1296DB;
              bottom: -12px;
              left: 15px;
            }
          }
          &:hover {
            .item {
              background: #1296DB;
              border-color: #1296DB;
            }
          }
        }
        &.in-way-wx:hover {
          .item {
            background: #23BF36;
            border-color: #23BF36;
          }
        }
        &.in-way-sj:hover {
          .item {
            background: #FF9100;
            border-color: #FF9100;
          }
        }
      }
    }
  }


  .login-form {
    /deep/ .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;
      input {
        background: transparent;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0;
        padding: 13px;
        color: @light_color;
        height: 47px !important;
        &:-webkit-autofill {
          box-shadow: 0 0 0px 1000px @bg inset !important;
          -webkit-text-fill-color: @light_color !important;
        }
        &::placeholder {
          color: @light_color;
        }
      }
    }

    .el-form-item__error {
      top: 50px;
      left: 48px;
    }
    .el-form-item {
      .virtual-border {
        position: absolute;
        z-index: -1;
        top: -2px;
        height: 50px;
        left: 50%;
        transform: translate(-50%, 0);
        border-top:1px solid @virtual_color;
        border-bottom: 1px solid @virtual_color;
        width: 0;
      }
      &:hover {
        .virtual-border {
          animation: virtualBorder .3s both;
        }
        .svg-container svg {
          color: @virtual_color!important;
        }
        /deep/ input {
          color: @virtual_color;
          &::placeholder {
            color: @virtual_color
          }
        }
      }
      background: @bg;
      border-radius: 30px;
      color: @light_color;
      margin-bottom: 32px;
      button {
        font-size: 16px;
        border-radius: 30px;
        border: 0px;
        height: 52px;
      }
      &:nth-child(3) {
        margin-bottom: 0;
      }
      &.forget-pwd-btn {
        border: 0;
        text-align: right;
        margin-bottom: 0;
        background: transparent;
        button {
          background: transparent;
          color: @light_color;
        }
      }
    }
  }
  .svg-container {
    padding-left: 15px;
    color: @dark_gray;
    width: 30px;
    display: inline-block;
  }
  .title {
    font-size: 42px;
    font-weight: 400;
    color: @light_color;
    margin: 0px auto 40px auto;
    text-align: center;
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 8px;
    font-size: 16px;
    color: @dark_gray;
    cursor: pointer;
    user-select: none;
  }
  .login-btn {
    width: 100%;
    background: linear-gradient(to bottom right, #e4c384, #be9966);
    box-shadow: 0 0 10px #ccc;
    &:hover {
      background: linear-gradient(to top, #be9966, #e4c384);
    }
    &:active {
      background: linear-gradient(#be9966, #be9966);
    }
  }
}
@keyframes virtualBorder {
  0% {
    width: 0;
  }
  75% {
    width: 75%;
  }
  77% {
    width: 77%;
    border-radius: 0
  }
  78% {
    width: 78%;
    border-radius: 1px
  }
  79% {
    width: 79%;
    border-radius: 2px
  }
  80% {
    width: 80%;
    border-radius: 3px;
  }
  81% {
    width: 81%;
    border-radius: 4px;
  }
  82% {
    width: 82%;
    border-radius: 5px;
  }
  83% {
    width: 83%;
    border-radius: 6px;
  }
  84% {
    width: 84%;
    border-radius: 7px;
  }
  85% {
    width: 85%;
    border-radius: 8px;
  }
  86% {
    width: 86%;
    border-radius: 9px;
  }
  87% {
    width: 87%;
    border-radius: 10px;
  }
  88% {
    width: 88%;
    border-radius: 11px;
  }
  89% {
    width: 89%;
    border-radius: 12px;
  }
  90% {
    width: 90%;
    border-radius: 13px
  }
  92% {
    width: 92%;
    border-radius: 15px
  }
  95% {
    width: 95%;
    border-radius: 17px;
  }
  97% {
    width: 97%;
    border-radius: 19px
  }
  100% {
    border-radius: 22px;
    width: 100%;
    // border-left-color:  #be9966;
    // border-right-color:  #be9966;
  }
}
</style>
