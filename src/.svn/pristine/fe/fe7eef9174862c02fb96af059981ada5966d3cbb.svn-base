<template>
  <div class='container'>
    <div class="container-left">
        <p><span class="left-title">参考场景</span></p>
        <chart :options="myChart" class="mychart"></chart>
    </div>
    <div class="container-right">
        <div>
        <p><span class="right-title">配置网络拓扑</span>
            <span @click="refresh"
            style='
            color: #ff8400;
            font-size: 14px;
            cursor: pointer;
        '><i class="el-icon el-icon-refresh"></i>刷新</span>
        </p>
        <div id="chart2" class="mychart" @click="handleClick" v-show="!isShow"></div>
        <div id="chart3" class="mychart showChart" @click="handleClick" v-show="isShow"></div>
        <div class='footer'>
            <div class='foots'>
            <el-button type='warning' class='next' @click='finish'
                >完成</el-button>
            <el-button
                type='warning'
                plain
                class='clear'
                @click='before'
                >上一步</el-button>
    <!--                      <el-button type='warning'-->
    <!--                      plain-->
    <!--                      class='clear'-->
    <!--                      @click='edit'>编辑</el-button>-->
            </div>
        </div>
        </div>
        <div class="setting-content" v-show="isShow">
          <div style="font-weight: bold;font-size: 12px;margin-bottom:15px;">节点配置</div>
          <input class="setting-input input-style" placeholder="节点编号" id="code"/>
          <select class="setting-input select-style" placeholder="通道号" id="ch">
          </select>
          <input class="setting-input input-style" placeholder="通道频点" id="workFreq"/>
          <select class="setting-input select-style" placeholder="通道状态" id="bcCycle">
              <option :value="0" label="关闭"></option>
              <option :value="1" label="开启"></option>
          </select>
          <div style="text-align:center;">
              <el-button type="primary" @click="save">直接下发</el-button>
              <el-button type="primary" @click="getSetting">查询配置</el-button>
          </div>
          <p style="font-weight: bold;font-size: 12px;">日志</p>
          <div class="log" v-if="search"></div>
          <div class="log1" v-else>
              <div><p v-for="(item, index) in logArr" :key="index">{{item}}</p></div>
          </div>
        </div>
    </div>

    <span class="float-right" :style="{'right': isShow ? '260px' : 0}" @click="show">
        <img src="../../../assets/image/shou.svg" alt="" v-if="!isShow">
        <img src="../../../assets/image/zhan.svg" alt="" v-if="isShow">
    </span>
    </div>
</template>

<script>
import 'echarts/lib/chart/tree'
import mylib from '../../../api/index'
import $ from 'jquery'
export default {
  components: {},
  props: {
    devType: {
      type: Number,
      default: 2
    }
  },
  data () {
    return {
      isShow: false,
      myChart: null,
      myChart1: null,
      websock1: null, // websocket
      websock2: null, // websocket
      treeData: [],
      realData: [],
      nodeCode: '',
      ch: '',
      bcCycle: '',
      workFreq: '',
      chArr: [],
      logArr: [],
      search: true
    }
  },
  methods: {
    before () {
      this.$emit('getActive', 2)
    },
    finish () {
      this.$emit('showDia', 1)
    },
    refresh () {
      mylib.axios({
        url: '/topology/queryTopologyReal',
        type: 'json'
      }).then((res) => {
        if (res.code == 200) {
          this.WebSocketSet4()
        }
      })
    },
    handleClick () {
      this.isShow = true
      this.workFreq = ''
      this.bcCycle = ''
      this.logArr = []
      this.search = true
      $('#ch').empty()
      let mycharts = this.$echarts.init(document.getElementById('chart3'))
      mycharts.setOption(this.myChart1)
      mycharts.on('click', function (params) {
        this.nodeCode = params.data.code
        document.getElementById('code').value = params.data.code
        mylib.axios({
          url: '/agsnode/quertPassageway',
          type: 'json',
          params: {nodeCode: this.nodeCode}
        }).then((res) => {
          if (res.code == 200) {
            if ('WebSocket' in window) {
              const wsuri = 'ws://' + mylib.URL + '/websocket/' + sessionStorage.getItem('userName')
              this.websock2 = new WebSocket(wsuri)
              this.websock2.onmessage = (res => {
                let rst = JSON.parse(res.data)
                $('.log').html(rst.data)
                if (rst.chNum) { // 查询通道
                  this.chArr = rst.chNum.split(',')
                  this.chArr.forEach((el) => {
                    var option = document.createElement('option')
                    $(option).val(el)
                    $(option).text(el)
                    $('#ch').append(option)
                  })
                }
              })
              this.websock2.onopen = (res => {
                console.log('查询通道socket连接成功')
              })
              this.websock2.onclose = (res => {
                console.log('socket已关闭')
              })
            } else {
              alert('当前浏览器 Not support websocket')
            }
          }
        })
      })
      $('.log').html('')
    },
    // websocket获取数据
    // WebSocketSet4 () {
    //   if ('WebSocket' in window) {
    //     const wsuri = 'ws://' + mylib.URL + '/websocket/' + sessionStorage.getItem('userName')
    //     this.websock1 = new WebSocket(wsuri)
    //     this.websock1.onmessage = (res => {
    //       let rst = JSON.parse(res.data)
    //       console.log(rst)
    //       this.realData = rst.jsonTree
    //       if (this.realData.length > 0) {
    //         this.initData(this.realData[0])
    //         this.initTree1()
    //         let mycharts = this.$echarts.init(document.getElementById('chart2'))
    //         mycharts.setOption(this.myChart1, {notMerge: true})
    //         mycharts.on('click', function (params) {
    //           this.nodeCode = params.data.code
    //           document.getElementById('code').value = params.data.code
    //           mylib.axios({
    //             url: '/agsnode/quertPassageway',
    //             type: 'json',
    //             params: {nodeCode: this.nodeCode}
    //           }).then((res) => {
    //             if (res.code == 200) {
    //               if ('WebSocket' in window) {
    //                 const wsuri = 'ws://' + mylib.URL + '/websocket/' + sessionStorage.getItem('userName')
    //                 this.websock2 = new WebSocket(wsuri)
    //                 this.websock2.onmessage = (res => {
    //                   let rst = JSON.parse(res.data)
    //                   $('.log').html(rst.data)
    //                   if (rst.chNum) { // 查询通道
    //                     this.chArr = rst.chNum.split(',')
    //                     this.chArr.forEach((el) => {
    //                       var option = document.createElement('option')
    //                       $(option).val(el)
    //                       $(option).text(el)
    //                       $('#ch').append(option)
    //                     })
    //                   }
    //                 })
    //                 this.websock2.onopen = (res => {
    //                   console.log('查询通道socket连接成功')
    //                 })
    //                 this.websock2.onclose = (res => {
    //                   console.log('socket已关闭')
    //                 })
    //               } else {
    //                 alert('当前浏览器 Not support websocket')
    //               }
    //             }
    //           })
    //         })
    //       }
    //     })
    //     this.websock1.onopen = (res => {
    //       console.log('socket连接成功')
    //     })
    //     this.websock1.onclose = (res => {
    //       console.log('socket已关闭')
    //     })
    //   } else {
    //     alert('当前浏览器 Not support websocket')
    //   }
    // },
    // websocket获取数据
    WebSocketSet2 () {
      if ('WebSocket' in window) {
        const wsuri = 'ws://' + mylib.URL + '/websocket/' + sessionStorage.getItem('userName')
        this.websock2 = new WebSocket(wsuri)
        this.websock2.onmessage = (res => {
          let rst = JSON.parse(res.data)
          console.log(rst)
          this.logArr = rst.data.split('，').concat(this.logArr)
          if (rst.workFreq) { // 查询频点
            this.workFreq = rst.workFreq
            $('#workFreq').val(this.workFreq)
          }
        })
        this.websock2.onopen = (res => {
          console.log('socket连接成功')
        })
        this.websock2.onclose = (res => {
          console.log('socket已关闭')
        })
      } else {
        alert('当前浏览器 Not support websocket')
      }
    },
    getSetting () {
      this.search = false
      this.nodeCode = $('#code').val()
      this.ch = $('#ch option:selected').val()
      this.logArr = $('.log').html().split('，')
      mylib.axios({
        url: '/agsnode/quertWorkFreq',
        type: 'json',
        params: {
          nodeCode: this.nodeCode,
          ch: this.ch
        }
      }).then((res) => {
        if (res.code == 200) {
          this.WebSocketSet2()
        }
      })
    },
    save () {
      this.bcCycle = $('#bcCycle').val()
      var params = {
        nodeCode: this.nodeCode,
        ch: this.ch,
        action: $('#ch option').size,
        workFreq: this.workFreq,
        bcCycle: this.bcCycle
      }
      mylib.axios({
        url: '/agsnode/chParam',
        type: 'json',
        params: params
      }).then((res3) => {
        if (res3.code == 200) {
          this.$message.success(res3.msg)
          this.isShow = false
          mylib.axios({
            url: '/topology/queryTopologyReal',
            type: 'json'
          }).then((res1) => {
            if (res1.code == 200) {
              // this.WebSocketSet4()
              this.realData = res1.jsonTree
              if (this.realData.length > 0) {
                this.initData(this.realData[0])
                this.initTree1()
                let mycharts = this.$echarts.init(document.getElementById('chart2'))
                mycharts.setOption(this.myChart1, {notMerge: true})
                mycharts.on('click', function (params) {
                  this.nodeCode = params.data.code
                  document.getElementById('code').value = params.data.code
                  mylib.axios({
                    url: '/agsnode/quertPassageway',
                    type: 'json',
                    params: {nodeCode: this.nodeCode}
                  }).then((res2) => {
                    if (res2.code == 200) {
                      if ('WebSocket' in window) {
                        const wsuri = 'ws://' + mylib.URL + '/websocket/' + sessionStorage.getItem('userName')
                        this.websock2 = new WebSocket(wsuri)
                        this.websock2.onmessage = (res => {
                          let rst = JSON.parse(res.data)
                          $('.log').html(rst.data)
                          if (rst.chNum) { // 查询通道
                            this.chArr = rst.chNum.split(',')
                            this.chArr.forEach((el) => {
                              var option = document.createElement('option')
                              $(option).val(el)
                              $(option).text(el)
                              $('#ch').append(option)
                            })
                          }
                        })
                        this.websock2.onopen = (res => {
                          console.log('查询通道socket连接成功')
                        })
                        this.websock2.onclose = (res => {
                          console.log('socket已关闭')
                        })
                      } else {
                        alert('当前浏览器 Not support websocket')
                      }
                    }
                  })
                })
              }
            }
          })
        } else {
          this.$message.error(res3.msg)
        }
      })
    },
    /*
    data  数据
    ind 下标
    初始数据等级
    * */
    initData (data) {
      data.name = data.code ? data.code : data.name
      if (data.nodeType == 0) {
        data.symbol = 'image://static/jieru.svg'
        data.label = {
          rotate: 0
        }
      }
      if (data.nodeType == 1) {
        data.symbol = 'image://static/huiju.svg'
        data.label = {
          rotate: 0
        }
      }
      if (data.nodeType == 2) {
        data.symbol = 'image://static/digonghao.svg'
      }
      if (data.nodeType == 3) {
        data.symbol = 'image://static/huiju.svg'
      }
      if (data.nodeType == 4) {
        data.symbol = 'image://static/weigonghao.svg'
      }
      if (data.params && data.params.length > 0) {
        data.children = data.params
        data.children.forEach((el) => {
          return this.initData(el)
        })
      }
    },
    // 初始图表
    initTree () {
      this.myChart = {
        tooltip: {
          trigger: 'item',
          triggerOn: 'mousemove',
          formatter: function (params) {
            var res = ''
            if (params.data.chs && params.data.chs.length > 0) {
              params.data.chs.forEach((el) => {
                if (el.chStatus == 1) {
                  res = el.ch + '#' + el.freq + 'M#开启' + '<br/>' + res
                } else if (el.chStatus == 0) {
                  res = el.ch + '#关闭' + '<br/>' + res
                }
              })
            } else {
              res = params.data.code
            }
            return res
          }
        },
        series: [
          {
            type: 'tree',
            data: this.treeData,
            roam: true,
            left: '20%',
            right: '8%',
            top: '10%',
            bottom: '30%',

            orient: 'vertical',
            edgeShape: 'polyline',
            edgeForkPosition: '20%',

            expandAndCollapse: false,
            symbolSize: 30,
            lineStyle: {
              color: '#b5d6fb'
            },
            label: {
              position: 'top',
              verticalAlign: 'middle',
              align: 'right',
              fontSize: 14,
              rotate: -90
            },

            leaves: {
              label: {
                position: 'bottom',
                verticalAlign: 'middle',
                align: 'left'
              }
            },

            animationDurationUpdate: 750
          }
        ]
      }
    },
    initTree1 () {
      this.myChart1 = {
        series: [
          {
            type: 'tree',
            data: this.realData,
            roam: true,
            left: '20%',
            right: '8%',
            top: '10%',
            bottom: '30%',

            orient: 'vertical',
            edgeShape: 'polyline',
            edgeForkPosition: '20%',

            expandAndCollapse: false,
            symbolSize: 30,
            lineStyle: {
              color: '#b5d6fb'
            },
            label: {
              position: 'top',
              verticalAlign: 'middle',
              align: 'right',
              fontSize: 14,
              rotate: -90
            },

            leaves: {
              label: {
                position: 'bottom',
                verticalAlign: 'middle',
                align: 'left'
              }
            },

            animationDurationUpdate: 750
          }
        ]
      }
    },
    show () {
      this.isShow = false
    }
  },
  created () {
  },
  // destroyed () {
  //   this.websock1.close()
  //   if (this.websock2) {
  //     this.websock2.close()
  //   }
  // },
  mounted () {
    mylib.axios({
      url: '/topology/queryTopology',
      type: 'json',
      params: {devType: this.devType}
    }).then((res) => {
      if (res.code == 200) {
        this.treeData = res.jsonTree
        if (this.treeData.length > 0) {
          this.initData(this.treeData[0])
          this.initTree()
        }
      } else {
        this.$message.error(res.msg)
      }
    })
    mylib.axios({
      url: '/topology/queryTopologyReal',
      type: 'json'
    }).then((res1) => {
      if (res1.code == 200) {
        // this.WebSocketSet4()
        this.realData = res1.jsonTree
        if (this.realData.length > 0) {
          this.initData(this.realData[0])
          this.initTree1()
          let mycharts = this.$echarts.init(document.getElementById('chart2'))
          mycharts.setOption(this.myChart1, {notMerge: true})
          mycharts.on('click', function (params) {
            this.nodeCode = params.data.code
            document.getElementById('code').value = params.data.code
            mylib.axios({
              url: '/agsnode/quertPassageway',
              type: 'json',
              params: {nodeCode: this.nodeCode}
            }).then((res2) => {
              if (res2.code == 200) {
                if ('WebSocket' in window) {
                  const wsuri = 'ws://' + mylib.URL + '/websocket/' + sessionStorage.getItem('userName')
                  this.websock2 = new WebSocket(wsuri)
                  this.websock2.onmessage = (res => {
                    let rst = JSON.parse(res.data)
                    $('.log').html(rst.data)
                    if (rst.chNum) { // 查询通道
                      this.chArr = rst.chNum.split(',')
                      this.chArr.forEach((el) => {
                        var option = document.createElement('option')
                        $(option).val(el)
                        $(option).text(el)
                        $('#ch').append(option)
                      })
                    }
                  })
                  this.websock2.onopen = (res => {
                    console.log('查询通道socket连接成功')
                  })
                  this.websock2.onclose = (res => {
                    console.log('socket已关闭')
                  })
                } else {
                  alert('当前浏览器 Not support websocket')
                }
              }
            })
          })
        }
      } else {
        this.$message.error(res1.msg)
      }
    })
  }
}
</script>
<style scoped>
.container{
  display:flex;
  justify-content: space-between;
  padding-left:50px;
  box-sizing: border-box;
  box-shadow: 0px 0px 0px 0px #d7ddf7;
  -ms-box-shadow: 0px 0px 0px 0px #d7ddf7;
  -moz-box-shadow: 0px 0px 0px 0px #d7ddf7;
}
.container-left{
  width:40%;
  padding: 10px;
  min-height:100%;
  background: #fff;
  box-sizing: border-box;
  box-shadow: 0px 2px 4px 0px #d7ddf7;
}
.container-right{
  width:60%;
  padding:10px;
  min-height:100%;
  box-sizing: border-box;
  background: #fff;
  box-shadow: 0px 4px 8px 0px #d7ddf7;
  position: relative;
}
.left-title{
  display:inline-block;
  padding:5px 7px;
  background:rgba(255, 132, 0, 0.1);
  color:#ff8400;
  font-weight: bold;
  font-size: 14px;
  cursor: pointer;
}
.right-title{
  display:inline-block;
  padding:5px 7px;
  background:rgba(212, 228, 252, 0.39);
  color:#0276f7;
  font-weight: bold;
  font-size: 14px;
  cursor: pointer;
}
.mychart{
  width:100% !important;height:673px !important;
}
.showChart{
  width:500px !important;
}

.float-right{
  position:absolute;
  top:100px;
  display:inline-block;
  width:30px;
  height:30px;
  text-align: center;
  line-height: 30px;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  cursor: pointer;
}
.setting-content{
  width:250px;
  min-height:100%;
  border:2px solid #0276f7;
  position:absolute;
  right:0;
  top:0;
  border-radius: 8px;
  background: #fff;
  z-index: 20;
  padding:15px;
  box-sizing: border-box;
}
.setting-input{
  margin-bottom:15px;
  font-size:12px !important;
}
.log,.log1{
    border:1px solid #b6c3d8;
    font-size:12px;
    height:450px;
    border-radius: 2px;
    padding:10px;
    margin-bottom:15px;
    overflow-y: auto;
  }
@media screen and (max-width: 1600px) {
  .mychart{
    width:100% !important;height:492px !important;
  }
  .showChart{
    width:400px !important;
  }
  .log,.log1{
    height:260px;
  }
}
.log1 p{
  margin-bottom:0;
}
  .input-style, .select-style{
    background-color: #FFF;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #DCDFE6;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 30px;
    line-height: 30px;
    outline: 0;
    padding: 0 15px;
    -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    width: 100%;
  }
</style>
