<template>
  <div class="home">
    <div>首页</div>
    <div>测试父子应用传值</div>
    <div>
      父应用传过来的值: {{parentData}}
    </div>
    <div>父应用的方法 <button @click.stop="parentAlert">点我</button></div>
    <div>调用父应用的登出方法 <button @click.stop="parentLogout">登出</button></div>
    <router-link to="/home">测试401页面</router-link>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import Vue from 'vue'
export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  data() {
    return {
      parentData: Vue.prototype.parentData
    }
  },
  mounted() {
    // console.log(Vue.prototype, this)
  },
  methods: {
    parentAlert() {
      // 并传值给父应用
      Vue.prototype.parentFns.portal_alert('来自子应用的值')
    },
    parentLogout() {
      Vue.prototype.parentFns.portal_logout()
    }
  }
}
</script>

<style lang="less" scoped>
div {
  margin-bottom: 10px;
}
.el-button {
  background-color: red;
}
</style>
