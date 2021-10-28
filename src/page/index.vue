<template>
    <div>
      <el-container>
        <el-header>
          <div class="logo"></div>
          <div class="row">
                <div class="rows" :class="{active: activeIndex == 1}" @click="change('1')">
                  <router-link
                    to="/index"
                    style="text-decoration: none">
                    <img
                      class="img"
                      src="../assets/image/project.png"
                      alt=""
                    />

                    <div class="font">项目管理</div>
                    <div class="triangle-down"></div>
                  </router-link>
                </div>
                <div class="rows" :class="{active: activeIndex == 2}" @click="change('2')">
                  <router-link
                    to="/index/useCase"
                    style="text-decoration: none"
                  >
                    <img
                      class="img"
                      src="../assets/image/use.png"
                      alt=""
                    />

                    <div class="font">用例管理</div>
                    <div class="triangle-down"></div>
                  </router-link>
                </div>
                <div class="rows" :class="{active: activeIndex == 3}" @click="change('3')">
                  <router-link
                    to="/index/model"
                    style="text-decoration: none"
                  >
                    <img
                      class="img"
                      src="../assets/image/model.png"
                      alt=""
                    />

                    <div class="font">模型管理</div>
                    <div class="triangle-down"></div>
                  </router-link>
                </div>
                <div class="rows" :class="{active: activeIndex == 4}" @click="change('4')">
                  <router-link
                    to="/index/network"
                    style="text-decoration: none"
                  >
                    <img
                      class="img"
                      src="../assets/image/network.png"
                      alt=""
                    />

                    <div class="font">网络管理</div>
                    <div class="triangle-down1"></div>
                  </router-link>
                </div>
                <div class="rows" :class="{active: activeIndex == 5}" @click="change('5')">
                  <router-link
                    to="/index/device"
                    style="text-decoration: none"
                  >
                    <img
                      class="img"
                      src="../assets/image/device.png"
                      alt=""
                    />
                    <div class="font">设备管理</div>
                    <div class="triangle-down1"></div>
                  </router-link>
                </div>
                <div class="rows" :class="{active: activeIndex == 6}" @click="change('6')">
                  <router-link
                    to="/index/userManage"
                    style="text-decoration: none"
                  >
                    <img
                      class="img"
                      src="../assets/image/system.png"
                      alt=""
                    />

                    <div class="font">系统管理</div>
                    <div class="triangle-down1"></div>
                  </router-link>
                </div>
              </div>
          <div class="admin">
            <el-dropdown trigger="click">
                <span class="el-dropdown-link admin-content">
                  <span><img src="../assets/image/user-icon.svg" alt="" class="admin-img"></span>
                   {{userName}}
                  <svg style="margin-left:10px;" width="10px" height="7px" viewBox="0 0 10 7" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                    <title>路径</title>
                    <g id="页面-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                        <g id="项目管理-创建项目" transform="translate(-855.000000, -215.000000)" fill="#fff" fill-rule="nonzero">
                            <path d="M859.467629,221.740385 L855.247354,216.585973 C855.016096,216.330187 854.939672,215.959959 855.049233,215.626196 C855.158793,215.292434 855.43604,215.050882 855.767965,215 L864.219593,215 C864.553601,215.04227 864.83607,215.280012 864.948772,215.613718 C865.061473,215.947424 864.984969,216.319538 864.751281,216.574311 L860.531005,221.728723 C860.402241,221.898129 860.208021,221.997701 860.001943,222 C859.795865,222.002221 859.599717,221.906929 859.467629,221.740385 L859.467629,221.740385 Z" id="路径"></path>
                        </g>
                    </g>
                </svg>
                </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>
                  <div @click="changePassword">修改密码</div>
                </el-dropdown-item>
                <el-dropdown-item>
                  <div @click="show">退出登录</div>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </el-header>
        <el-main>
          <router-view @getMessage="showMsg"></router-view>
        </el-main>
      </el-container>
      <el-dialog
        :visible.sync='dialogVisible'
        width='315px'
        top='20%'
        center
        :show-close="false"
        class="dialog"
      >
        <div class="dialog-context">
          <img src="../assets/image/wen-icon.svg" alt="" style="vertical-align: middle;">
          是否确认退出系统？
        </div>
        <span slot='footer' class='dialog-footer'
        ><el-button type='warning' @click='logout'
        >退 出</el-button
        >
                    <el-button
                      @click='dialogVisible = false'
                      type='warning'
                      plain
                    >取 消</el-button
                    >
                </span>
      </el-dialog>
    </div>
</template>

<script>
import mylib from '../api/index'
export default {
  data () {
    return {
      name: 'index',
      activeIndex: '1',
      userName: sessionStorage.getItem('userName'),
      dialogVisible: false
    }
  },
  methods: {
    show () {
      this.dialogVisible = true
    },
    showMsg (val) {
      if (val) {
        this.activeIndex = '1'
      }
    },
    logout () {
      mylib.axios({
        url: '/sys/loginOut'
      }).then((res) => {
        if (res.code == 200) {
          this.$message.success(res.msg)
          sessionStorage.setItem('token', '')
          sessionStorage.setItem('userName', '')
          this.$router.push('/')
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    changePassword () {
      this.$router.push('/index/changePassword')
    },
    change (id) {
      this.activeIndex = id
      sessionStorage.setItem('activeIndex', id)
      // sessionStorage.setItem('active', '1')
    }
  },
  created () {
    this.activeIndex = sessionStorage.getItem('activeIndex') || '1'
    // this.height = document.documentElement.clientHeight
  }
}
</script>

<style scoped>
  .el-header {
    width: 100%;
    min-width:1300px;
    height: 95px !important;
    position: fixed;
    z-index: 99;
    top: 0;
    background-image: linear-gradient(to left, #645092, #191935, #181834);
    padding:0;
}
.logo {
    float: left;
    margin-left: 15px;
    margin-top: 26px;
    width: 260px;
    height: 43px;
    background-image: url(../assets/image/logo3.png);
    background-repeat: no-repeat;
    background-size: 100% 100%;
}
.check {
    float: left;
    height: 56px;
}
.row {
    height:95px;
    display: flex;
    flex-direction: row;
    padding-top: 17px;
    box-sizing: border-box;
    margin-left: 35%;
    text-align: center;
    font-size: 15px;
    color: #fff;
}

.rows {
  margin-right:75px;
  position: relative;
}
.img {
    width: 45px;
    height: 45px;
}
.font {
  color: #fff;
  opacity: 0.5;
  font-size:12px;
}
.rows{
  opacity: 0.5;
}

.active {
    opacity: 1 !important;
}
  .active .triangle-down {
  width: 0;
  height: 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-top: 8px solid #181834;
  position: absolute;
  bottom:-8px;
  left:18px;
}
  .active .triangle-down1 {
    width: 0;
    height: 0;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-top: 8px solid #191935;
    position: absolute;
    bottom:-8px;
    left:18px;
  }
  .active .font{
  opacity: 1;
}
.alls {
    width: 100%;
    /* height: 783px; */
    padding: 10px;
    position: absolute;
    top:95px ;
    height:calc(100% - 95px);
    /* border: 1px solid gray; */
    border-radius: 4px;
    background:#f5f7fa;
    box-sizing: border-box;
}
  .admin{
    position:absolute;
    right:40px;
    top: 33px;
    cursor: pointer;
  }
  .admin-content{
    color:#fff;font-size: 14px;font-weight: bold;
  }
  .admin-img{
    width:30px;height:30px;vertical-align: middle;margin-right:10px;
  }
</style>
