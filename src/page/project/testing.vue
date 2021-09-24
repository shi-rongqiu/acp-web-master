<template>
  <div class="container">
    <div class="container-left">
      <div class="title">
        <span>公司：{{manufacturer}}</span><span style="margin-left:35px;">被测设备：{{deviceName}}</span>
        <span style="margin-left:35px;" v-if="status == 2">测试状态：检测中</span>
        <span style="margin-left:35px;" v-if="status == 3">测试状态：已暂停</span>
        <div class="foot-btn">
          <el-button type="warning" @click="stop" v-if="(status == 2 || status == 3) && authority">终止</el-button>
          <el-button type="warning" plain @click="pause" v-if="(status == 2 || status == 3) && authority">暂停</el-button>
          <el-button type="warning" plain @click="restart" v-if="(status == 2 || status == 3) && authority">恢复测试</el-button>
          <el-button type="warning" plain @click="handleClick">返回</el-button>
        </div>
      </div>
      <div class="content-continer">
        <div v-for="item in data" :key="item.id">
          <div v-if="item.processStatus == 0" class="content wait">
            <div>
              <p>{{item.processName}}</p>
              <p><span>{{item.useCasesCode}}</span>
                <span class="type-style" v-if="item.processType == 0">MAC层</span>
                <span class="type-style" v-if="item.processType == 1">net网络层</span>
                <span class="type-style" v-if="item.processType == 2">bus业务层</span>
              </p>
            </div>
            <div class="foot"><img src="../../assets/image/wait-icon.svg" alt="">等待中</div>
          </div>
          <div v-if="item.processStatus == 1" class="content pass">
            <div>
              <p>{{item.processName}}</p>
              <p>
                <span>{{item.useCasesCode}}</span>
                <span class="type-style" v-if="item.processType == 0">MAC层</span>
                <span class="type-style" v-if="item.processType == 1">net网络层</span>
                <span class="type-style" v-if="item.processType == 2">bus业务层</span>
                <span>用时：{{item.time}}</span>
              </p>
            </div>
            <div class="foot">
              <img src="../../assets/image/success-icon.svg" alt="">检测通过</div>
          </div>
          <div v-if="item.processStatus == 2" class="content testing">
            <div>
              <p>{{item.processName}}</p>
              <p>
                <span>{{item.useCasesCode}}</span>
                <span class="type-style" v-if="item.processType == 0">MAC层</span>
                <span class="type-style" v-if="item.processType == 1">net网络层</span>
                <span class="type-style" v-if="item.processType == 2">bus业务层</span>
                <span>用时：{{item.time}}</span>
              </p>
            </div>
            <div class="foot">
              <img src="../../assets/image/jianing-icon.svg" class="loading" alt="">检测中</div>
          </div>
          <div v-if="item.processStatus == 3" class="content nopass">
            <div>
              <p>{{item.processName}}</p>
              <p>
                <span>{{item.useCasesCode}}</span>
                <span class="type-style" v-if="item.processType == 0">MAC层</span>
                <span class="type-style" v-if="item.processType == 1">net网络层</span>
                <span class="type-style" v-if="item.processType == 2">bus业务层</span>
                <span>用时：{{item.time}}</span>
              </p>
            </div>
            <div class="foot"><img src="../../assets/image/nosuccess-icon.svg" alt="">检测不通过</div>
          </div>
        </div>
      </div>
    </div>
    <div class="container-right">
      <p class="right-title">测试进程：</p>
      <div>
        <div v-for="(item, index) in logArr" :key="index">
          <div>
            <p class="content-title">
              <span v-if="item.result == 0"><img src="../../assets/image/wait-icon.svg" alt=""></span>
              <span v-if="item.result == 1"><img src="../../assets/image/success-icon.svg" alt=""></span>
              <span v-if="item.result == 2"><img class="loading" src="../../assets/image/jianing-icon.svg" alt=""></span>
              <span v-if="item.result == 3"><img src="../../assets/image/nosuccess-icon.svg" alt=""></span>{{item.processName}}
<!--              <span class="title-icon-success" v-if="item.result == 1" >-->
<!--                <svg width="15px" height="14px" viewBox="0 0 15 14" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">-->
<!--                  <title>形状</title>-->
<!--                  <g id="页面-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">-->
<!--                      <g id="项目管理-测试进度" transform="translate(-1192.000000, -449.000000)" fill="#2ebd2b" fill-rule="nonzero">-->
<!--                          <g id="编组-18" transform="translate(1182.000000, 446.000000)">-->
<!--                              <path d="M24.3909241,8.02326163 L17.6291754,3.10522884 C17.4379426,2.96492372 17.1777853,2.96492372 16.9865525,3.10522884 L10.2258967,8.02326163 C10.0337608,8.16245537 9.95339718,8.40972801 10.0269896,8.63528348 L12.6116891,16.5915676 C12.6845838,16.8167342 12.8941431,16.9693815 13.1308148,16.9697097 L21.4892847,16.9697097 C21.7264432,16.9697097 21.9351863,16.8167043 22.0084104,16.5915676 L24.592017,8.63528348 C24.6639396,8.40949396 24.5833919,8.16300924 24.3920169,8.02326163 L24.3909241,8.02326163 Z M22.8849131,8.36205944 L21.2029459,8.90850754 L17.7876454,6.43856219 L17.7876454,4.65495563 L22.8849131,8.36315234 L22.8849131,8.36205944 Z M16.5220716,10.9292726 L15.001853,13.0156114 L14.0586836,10.1270868 L16.5220716,10.9281797 L16.5220716,10.9292726 Z M14.5362792,9.27462776 L16.8291754,7.61670426 L16.8291754,10.0210758 L14.5373721,9.27462776 L14.5362792,9.27462776 Z M17.3078639,11.4746277 L18.9111426,13.6757207 L15.7045853,13.6757207 L17.3078639,11.4746277 Z M17.7887383,7.61670426 L20.0783557,9.27462776 L17.7865525,10.0188901 L17.7865525,7.61670426 L17.7887383,7.61670426 Z M18.0936563,10.9281797 L20.5570443,10.1270868 L19.6149678,13.0156114 L18.0936563,10.9281797 L18.0936563,10.9281797 Z M16.8291754,4.65495563 L16.8291754,6.43856219 L13.412782,8.90850754 L11.7297219,8.36205944 L16.8302683,4.65495563 L16.8291754,4.65495563 Z M11.4564978,9.28118513 L12.9340935,9.76205944 L14.306771,13.9697097 L13.3887383,15.2309119 L11.4564978,9.28118513 L11.4564978,9.28118513 Z M14.1515798,15.8079611 L15.0105962,14.629819 L19.6095033,14.629819 L20.4685197,15.8079611 L14.149394,15.8079611 L14.1515798,15.8079611 Z M21.2302683,15.2309119 L20.3111426,13.9686168 L21.6838202,9.76096655 L23.1614159,9.28118513 L21.2291754,15.2309119 L21.2302683,15.2309119 Z" id="形状"></path>-->
<!--                          </g>-->
<!--                      </g>-->
<!--                  </g>-->
<!--                </svg>-->
<!--                流程图-->
<!--              </span>-->
<!--              <span v-if="item.result == 3" class="title-icon-nosuccess">-->
<!--                <svg width="15px" height="14px" viewBox="0 0 15 14" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">-->
<!--                  <title>形状</title>-->
<!--                  <g id="页面-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">-->
<!--                      <g id="项目管理-测试进度" transform="translate(-1192.000000, -449.000000)" fill="#FF0A0A" fill-rule="nonzero">-->
<!--                          <g id="编组-18" transform="translate(1182.000000, 446.000000)">-->
<!--                              <path d="M24.3909241,8.02326163 L17.6291754,3.10522884 C17.4379426,2.96492372 17.1777853,2.96492372 16.9865525,3.10522884 L10.2258967,8.02326163 C10.0337608,8.16245537 9.95339718,8.40972801 10.0269896,8.63528348 L12.6116891,16.5915676 C12.6845838,16.8167342 12.8941431,16.9693815 13.1308148,16.9697097 L21.4892847,16.9697097 C21.7264432,16.9697097 21.9351863,16.8167043 22.0084104,16.5915676 L24.592017,8.63528348 C24.6639396,8.40949396 24.5833919,8.16300924 24.3920169,8.02326163 L24.3909241,8.02326163 Z M22.8849131,8.36205944 L21.2029459,8.90850754 L17.7876454,6.43856219 L17.7876454,4.65495563 L22.8849131,8.36315234 L22.8849131,8.36205944 Z M16.5220716,10.9292726 L15.001853,13.0156114 L14.0586836,10.1270868 L16.5220716,10.9281797 L16.5220716,10.9292726 Z M14.5362792,9.27462776 L16.8291754,7.61670426 L16.8291754,10.0210758 L14.5373721,9.27462776 L14.5362792,9.27462776 Z M17.3078639,11.4746277 L18.9111426,13.6757207 L15.7045853,13.6757207 L17.3078639,11.4746277 Z M17.7887383,7.61670426 L20.0783557,9.27462776 L17.7865525,10.0188901 L17.7865525,7.61670426 L17.7887383,7.61670426 Z M18.0936563,10.9281797 L20.5570443,10.1270868 L19.6149678,13.0156114 L18.0936563,10.9281797 L18.0936563,10.9281797 Z M16.8291754,4.65495563 L16.8291754,6.43856219 L13.412782,8.90850754 L11.7297219,8.36205944 L16.8302683,4.65495563 L16.8291754,4.65495563 Z M11.4564978,9.28118513 L12.9340935,9.76205944 L14.306771,13.9697097 L13.3887383,15.2309119 L11.4564978,9.28118513 L11.4564978,9.28118513 Z M14.1515798,15.8079611 L15.0105962,14.629819 L19.6095033,14.629819 L20.4685197,15.8079611 L14.149394,15.8079611 L14.1515798,15.8079611 Z M21.2302683,15.2309119 L20.3111426,13.9686168 L21.6838202,9.76096655 L23.1614159,9.28118513 L21.2291754,15.2309119 L21.2302683,15.2309119 Z" id="形状"></path>-->
<!--                          </g>-->
<!--                      </g>-->
<!--                  </g>-->
<!--                </svg>-->
<!--                流程图-->
<!--              </span>-->
            </p>
            <div class="report" v-for="(cell, ind) in item.listTestDatas" :key="ind">
              <p>
                <img v-if="cell.direction == 1" src="../../assets/image/up.svg" alt="">
                <img v-if="cell.direction == 2" src="../../assets/image/down.svg" alt="">
                {{cell.record}}
              </p>
            </div>
            <p v-if="item.result == 3" class="error-tip">{{item.rstDescibe}}</p>
          </div>
        </div>
        <el-divider content-position="center" v-if="status == 1 || status == 0">{{status == 0 ? '不合格' : status == 1 ? '合格' : ''}}</el-divider>
      </div>
    </div>
<!--    <div style="display:flex;">-->
<!--      <div style="writing-mode:vertical-lr;text-align: center;">-->
<!--        陪测设备-->
<!--      </div>-->
<!--      <div>-->
<!--      </div>-->
<!--      <div style="writing-mode:vertical-lr;text-align: center;">-->
<!--        被测设备-->
<!--      </div>-->
<!--    </div>-->
  </div>
</template>

<script>
import mylib from '../../api/index'
export default {
  name: 'testing',
  data () {
    return {
      websock: null, // websocket
      data: [],
      manufacturer: '',
      deviceName: '',
      projectCode: '',
      logArr: [],
      status: 2,
      isStop: false,
      authority: true
    }
  },
  methods: {
    getParam () {
      const params = {projectCode: this.projectCode}
      mylib.axios({
        url: '/project/queryProcess',
        params: params
      }).then((res) => {
        this.data = res.data.processList
        this.logArr = res.data.resultList
        this.status = res.data.status
        this.manufacturer = res.data.manufacturer
        this.deviceName = res.data.deviceName
      })
    },
    stop () {
      mylib.axios({
        url: '/project/projectStop',
        params: {
          projectCode: this.projectCode
        }
      }).then((res) => {
        if (res.code == 200) {
          this.$message.success(res.msg)
          this.$router.push({
            path: '/index'
          })
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    pause () {
      mylib.axios({
        url: '/project/projectSuspendTask',
        params: {
          projectCode: this.projectCode
        }
      }).then((res) => {
        if (res.code == 200) {
          this.$message.success(res.msg)
          this.isStop = true
          this.getParam()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    restart () {
      mylib.axios({
        url: '/project/projectResumeTask',
        params: {
          projectCode: this.projectCode
        }
      }).then((res) => {
        if (res.code == 200) {
          this.$message.success(res.msg)
          this.isStop = false
          this.status = 2
          this.WebSocketSet()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    handleClick () {
      this.$router.push({
        path: '/index'
      })
    },
    // websocket获取数据
    WebSocketSet () {
      if ('WebSocket' in window) {
        const wsuri = 'ws://' + mylib.URL + '/websocket/' + sessionStorage.getItem('userName')
        this.websock = new WebSocket(wsuri)
        this.websock.onmessage = (res => {
          let rst = JSON.parse(res.data)
          console.log(rst)
          if ((rst.type == 1 || rst.type == 2 || rst.type == 4) && rst.data.projectCode == this.projectCode) {
            if (rst.type == 1 || rst.type == 2) {
              this.data.forEach((el, index) => {
                if (el.useCasesCode == rst.data.useCasesCode) {
                  el.processStatus = rst.data.processStatus
                  el.time = rst.data.time
                  if (rst.type == 1 && index < this.data.length - 1 && !this.isStop) {
                    this.data[index + 1].processStatus = 2
                  }
                }
              })
            }
            if (rst.type == 2) {
              if (this.logArr.length > 0) {
                if (this.logArr[this.logArr.length - 1].useCasesCode != rst.data.useCasesCode) {
                  this.logArr.push({
                    result: rst.data.processStatus,
                    useCasesCode: rst.data.useCasesCode,
                    processName: rst.data.processName,
                    projectCode: rst.data.projectCode,
                    listTestDatas: [],
                    rstDescibe: ''
                  })
                }
              } else {
                this.logArr.push({
                  result: rst.data.processStatus,
                  useCasesCode: rst.data.useCasesCode,
                  processName: rst.data.processName,
                  projectCode: rst.data.projectCode,
                  listTestDatas: [],
                  rstDescibe: ''
                })
              }
            }
            if (rst.type == 1) {
              this.status = rst.status
              this.logArr.forEach((el) => {
                if (el.useCasesCode == rst.data.useCasesCode) {
                  el.result = rst.data.processStatus
                  el.rstDescibe = rst.data.rstDescibe
                }
              })
            }
            if (rst.type == 4) {
              this.$router.push({
                path: '/index'
              })
            }
          }
          if (rst.type == 3 && rst.data[0].projectCode == this.projectCode) {
            rst.data.forEach((el) => {
              this.logArr[this.logArr.length - 1].listTestDatas.push(el)
            })
          }
        })
        this.websock.onopen = (res => {
          console.log('socket连接成功')
        })
        // this.websock.send('连接中')
        this.websock.onclose = (res => {
          console.log('socket已关闭')
        })
      } else {
        alert('当前浏览器 Not support websocket')
      }
    }
  },
  destroyed () {
    this.websock.close()
  },
  created () {
    this.projectCode = this.$route.query.projectCode
    this.getParam()
    this.WebSocketSet()
    if (this.$route.query.userName != sessionStorage.getItem('userName')) {
      this.authority = false
    }
  }
}
</script>

<style scoped>
.container{
  display:flex;
  justify-content: space-between;
  background:#f5f7fa;
}
.container-left{
  width:70%;
  padding: 27px 45px;
  background: #fff;
  box-sizing: border-box;
}
.container-right{
  width:calc(30% - 10px);
  padding:10px;
  box-sizing: border-box;
  background: #fff;
  height:100%;
}
.container-right>div{
  border: 1px solid #c8cfda;
  border-radius: 8px;
  padding:15px;
  height:calc(100% - 50px);
  box-sizing: border-box;
  overflow: auto;
  font-size:12px;
}
.right-title{
  font-size: 14px;
  font-weight: bold;
}
.content-title{
  font-size: 12px;
  font-weight: bold;
}
.content-text{
  padding-left:12px;
}
  .title{
    font-size:14px;
    font-weight: bold;
    color:#000;
    height:35px;
    line-height:35px;
  }
.content-continer{
  display:flex;
  margin-top:20px;
  overflow: auto;
  flex-wrap: wrap;
}
  .content{
    width:210px;
    margin-right:20px;
    border-radius: 4px;
    font-size:12px;
    margin-bottom:10px;
  }
  .content p{
    margin:0;
  }
  .content>div{
    padding-left:10px;
  }
  .content>div:first-child{
    height:60px;
    padding-top:10px;
    box-sizing: border-box;
  }
  .content>div:first-child>p:first-child{
    font-weight: bold;
    margin-bottom: 10px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .content>div>p:last-child{
    opacity: 0.8;
  }
  .wait{
    border:1px dashed #cbd4e1;
    background: rgba(203, 212, 225, 0.1);
  }
  img{
    margin-right:5px;
    vertical-align: middle;
  }
  .foot{
    border-top:1px dashed #cbd4e1;
    line-height:30px;
  }
  .testing{
    border:1px dashed #007aff;
    background: #f4f9ff;
    color:#007aff;
  }
  .wait .foot{
    opacity: 0.35;
  }
  .testing .foot{
    border-top-color: #007aff;
  }
  .nopass{
    border:1px solid #ff0a0a;
    background: #fff7f7;
    color:#ff0a0a;
  }
  .nopass .foot{
    border-top:1px solid #ff0a0a;
  }
  .pass{
    border:1px solid #2ebd2b;
    background: #2ebd2b;
    color:#fff;
  }
  .pass .foot{
    border-color: #2ebd2b;
    background:#efffef;
    color:#2ebd2b;
  }
  .foot-btn{
    float:right;
    margin-top:0;
  }
  .type-style{
    margin:0 10px;
  }
  .report{
    padding-left:16px;
    padding-right:10px;
    box-sizing: border-box;
  }
  .report>p{
    word-break: break-all;
  }
  .error-tip{
    background:#ffefef;
    color:#ff2626;
    font-size:12px;
    height:20px;
    line-height:20px;
    border-radius: 10px;
    margin-left:16px;
    padding-left:15px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .loading{
    transform-origin: center center;
    animation: sz 1s 1s linear infinite;
  }
  @keyframes sz {
    from {
      transform: rotateZ(0deg);
    }
    to {
      transform: rotateZ(360deg);
    }
  }
  .title-icon-success,.title-icon-nosuccess{
    display:inline-block;
    width:75px;
    height:20px;
    text-align:center;
    line-height:20px;
    border-radius: 10px;
    font-size:12px;
  }
.title-icon-success svg,.title-icon-nosuccess svg{
  float:left;
  margin-left:10px;
  margin-top:3px;
  margin-right:0;
}
.title-icon-success{
  background: rgba(46, 189, 43, 0.08);
  color:#2ebd2b;
}
.title-icon-nosuccess{
  background:  rgba(255, 10, 10, 0.08);
  color:#ff0a0a;
}
</style>
