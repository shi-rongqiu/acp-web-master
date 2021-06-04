<template>
    <div id="app">
        <router-view />
    </div>
</template>

<script>
import mylib from './api/index'
export default {
  name: 'App',
  methods: {
    beforeunloadHandler () {
      this._beforeUnload_time = new Date().getTime()
    },
    unloadHandler (e) {
      this._gap_time = new Date().getTime() - this._beforeUnload_time
      // 判断是窗口关闭还是刷新
      if (this._gap_time <= 5) {
        // 如果是登录状态，关闭窗口前，移除用户
        if (sessionStorage.getItem('token')) {
          mylib.axios({
            url: '/sys/loginOut'
          }).then((res) => {
          })
        }
      }
    }
  },
  updated () {
    if (window.location.href.split('#')[1] == '/') {
      mylib.axios({
        url: '/sys/loginOut'
      }).then((res) => {
      })
    }
  },
  mounted () {
    window.addEventListener('beforeunload', e => this.beforeunloadHandler(e))
    window.addEventListener('unload', e => this.unloadHandler(e))
    if (window.location.href.split('#')[1] == '/') {
      mylib.axios({
        url: '/sys/loginOut'
      }).then((res) => {
      })
    }
  },
  destroyed () {
    window.removeEventListener('beforeunload', e => this.beforeunloadHandler(e))
    window.removeEventListener('unload', e => this.unloadHandler(e))
  }
}
</script>

<style scoped>
#app {
    width: 100%;
    height: 100%;
    /* overflow: hidden; */
}
</style>
