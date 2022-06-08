<template>
    <div class="all">
      <div style="text-align:center;" class="header">
        <div class="bg"></div>
      </div>

        <div class="row">
          <span class="rows" @click="change('1', '/index')">
              <img
                  class="img"
                  src="../assets/image/project.png"
                  alt=""
              />

              <div class="line"></div>
              <div class="font">项目管理</div>
              <div class="english">Project management</div>
          </span>
          <span class="rows" @click="change('2', '/index/useCase')">
                <img
                    class="img"
                    src="../assets/image/use.png"
                    alt=""
                />
            <div class="line"></div>
            <div class="font">分组管理</div>
            <div class="english">Use case management</div>
          </span>
          <span class="rows" @click="change('3', '/index/model')">
                <img
                    class="img"
                    src="../assets/image/model.png"
                    alt=""
                />
            <div class="line"></div>
            <div class="font">模型管理</div>
            <div class="english">Model management</div>
          </span>
          <span class="rows" @click="change('4', '/index/network')">
                <img
                    class="img"
                    src="../assets/image/network.png"
                    alt=""
                />
            <div class="line"></div>
            <div class="font">网络管理</div>
            <div class="english">Network management</div>
          </span>
          <span class="rows" @click="change('5', '/index/device')">
                <img
                  class="img"
                  src="../assets/image/device.png"
                  alt=""
                />
            <div class="line"></div>
            <div class="font">设备管理</div>
            <div class="english">Device management</div>
          </span>
          <span class="rows" @click="change('6', '/index/userManage')">
                <img
                    class="img"
                    src="../assets/image/system.png"
                    alt=""
                />
            <div class="line"></div>
            <div class="font">系统管理</div>
            <div class="english">System management</div>
          </span>
        </div>
    </div>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {}
  },
  methods: {
    change (id, path) {
      this.$router.push(path)
      sessionStorage.setItem('activeIndex', id)
    }
  },
  created () {
  }
}
</script>

<style scoped>
.all {
    width: 100%;
    height: 100%;
    background-image: url(../assets/image/bg.png);
    background-repeat: no-repeat;
    background-size: 100% 100%;
    overflow: hidden;
}
.bg {
    display: inline-block;
    width: 396px;
    height: 136px;
    background-image: url(../assets/image/logo2.png);
    background-repeat: no-repeat;
    background-size: 100% 100%;
    overflow: hidden;
}
.header{
  width:1000px;
  text-align: center;
  margin-top: 75px;
  position:absolute;
  left:50%;
  transform: translateX(-50%);
}
.header div:before,.header div:after
{
  position:absolute;
  background:#757689;
  content:"";
  height:1px;
  top:65%;
  width:280px;
}
.header div:before{left:0;}
.header div:after{right:0;}
.row {
    display: flex;
    width: 100%;
    height: 240px;
    flex-direction: row;
    margin-top: 340px;
    /* text-align: center; */
    font-size: 18px;
    color: #fff;
    padding: 0 230px;
    justify-content: space-between;
    box-sizing: border-box;
}
.rows {
    width: 180px;
    /*height: 400px;*/
    text-decoration: none;
    /*text-align: center;*/
  cursor: pointer;
}
.img {
    width: 120px;
    height: 120px;
}
.line {
    width: 120px;
    height: 1px;
    background-color: #757689;
    margin-top: 20px;
}
.font {
    margin-top: 20px;
    font-size: 18px;
    color: rgba(255, 255, 255, 100);
}
.english {
    font-size: 12px;
    margin-top: 10px;
    opacity: 0.6;
    font-family: MicrosoftYaHei;
    color:#fff ;
}

.router-link-active {
    text-decoration: none;
}
@media screen and (max-width: 1440px) {
  .rows{
    width:130px;
  }
  .img {
    width: 84px;
    height: 84px;
  }
  .line {
    width: 84px;
  }
}
</style>
