<template>
  <div class="container">
    <img class="bg" src="../../assets/image/systembg.png" />
    <div class="content">
      <div @click="jump('/index/userManage')">
        <img src="../../assets/image/user.png" alt="" class="leftimg">
        <span>用户管理</span>
      </div>
      <div @click="jump('/index/rolerManage')">
        <img src="../../assets/image/roler.png" alt="" class="leftimg">
        <span>角色管理</span>
      </div>
      <div @click="jump('/index/menuManage')">
        <img src="../../assets/image/menu.png" alt="" class="leftimg">
        <span>菜单管理</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'system',
  data () {
    return {
    }
  },
  methods: {
    jump (url) {
      this.$router.push(url)
    }
  }
}
</script>

<style scoped>
  .container{
    position:relative;
  }
.bg{
  width:781px;
  height:415px;
  position: absolute;
  bottom: 0;
  left:50%;
  transform: translateX(-50%);
}
  .content{
    width:1000px;
    margin: auto;
    padding-top:105px;
    display:flex;
    justify-content: space-between;
  }
  .content>div{
    width:280px;
    height:120px;
    border:1px solid #e3eaf1;
    cursor: pointer;
    z-index: 2;
  }
  .leftimg{
    width:116px;
    height:98px;
    margin-top:23px;
  }
.content>div>span{
  float:right;
  font-size:24px;
  color:#000;
  opacity: 0.6;
  margin-right:25px;
  margin-top:42px;
  font-weight: bold;
}
</style>
