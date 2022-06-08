<template>
  <div class="content">
      <!--    左侧树图-->
      <div class="content-item-left" :style="{minHeight: height + 'px'}">
        <chart id="chart1" :options="myChart" @click="clickFun" class="mychart"></chart>
      </div>
      <!--    右侧操作区-->
      <div class="content-item-right" :style="{minHeight: height + 'px'}">
        <div class="right-btn">
          <el-button type="warning" plain @click="reload"><i class="el-icon el-icon-refresh"></i>刷新网络</el-button>
          <!-- <el-button type="warning" plain @click="clear"><i class="el-icon el-icon-delete"></i>清空</el-button> -->
        </div>
        <el-tabs type="card" @tab-click="handleClick" v-model="activeName">
          <el-tab-pane label="网络管理" name="1">
            <el-table
              :data="netData"
              :max-height="height - 85"
              stripe
              style="
                    width: 100%;
                    font-size: 14px;
                    margin-top:20px;
                "
              border
            >
              <el-table-column type="index" :index="indexMethod" label="序号" width="60">
              </el-table-column>
              <el-table-column
                prop="node"
                label="节点编号"
              >
              </el-table-column>
              <el-table-column

                prop="parentNode"
                label="父节点编号"
              >
              </el-table-column>
              <el-table-column prop="nodeType" width="120" label="节点类型">
                <template slot-scope="scope">
                <span
                  v-if="scope.row.nodeType == 0"
                >接入节点</span>
                  <span
                    v-if="scope.row.nodeType == 1"
                  >汇聚节点</span>
                  <span
                    v-if="scope.row.nodeType == 2"
                  >传感器</span>
                </template>
              </el-table-column>
              <el-table-column prop="nodeStatus" width="80" label="状态">
                <template slot-scope="scope">
                  <el-button
                    v-if="scope.row.nodeStatus == 0"
                    type="text"
                    style="color:#ff0000;"
                  >离线</el-button>
                  <el-button
                    v-if="scope.row.nodeStatus == 1"
                    type="text"
                    style="color:#21b41e;"
                  >在线</el-button>
                </template>
              </el-table-column>
              <el-table-column label="上报时间" prop="rptTime"></el-table-column>
            </el-table>
            <!--          <el-pagination-->
            <!--            background-->
            <!--            class="page"-->
            <!--            style="margin-top:20px;margin-left:10px;"-->
            <!--            @current-change="handleCurrentChange"-->
            <!--            @size-change="handleSizeChange"-->
            <!--            :current-page.sync="currentPage1"-->
            <!--            :page-size="pageSize1"-->
            <!--            layout="sizes, total, prev, pager, next"-->
            <!--            :total="total1">-->
            <!--          </el-pagination>-->
          </el-tab-pane>
          <el-tab-pane label="频点设置" name="2">
            <el-row style="margin-top:15px;">
              <el-col :offset="4" :span="1" class="num-content"><span>1</span></el-col>
              <el-col :span="19" class="tab-item">
                <div>节点编号：</div>
                <div><el-input class="input-col" v-model="nodeCode"></el-input></div>
                <div><el-button type="text" @click="getChannel">查询通道</el-button></div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :offset="4" :span="1" class="num-content"><span>2</span></el-col>
              <el-col :span="19" class="tab-item">
                <div>通道号：</div>
                <div>
                  <el-autocomplete
                    class="input-col"
                    v-model="chNum"
                    :fetch-suggestions="querySearch"
                    placeholder="请输入内容"
                    @select="handleSelect"
                  ></el-autocomplete>
                </div>
                <div><el-button type="text" @click="getPoint">查询频点</el-button></div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :offset="4" :span="1" class="num-content"><span>3</span></el-col>
              <el-col :span="19" class="tab-item">
                <div>频点号：</div>
                <div><el-input class="input-col" v-model="workFreq"></el-input></div>
                <div><el-button type="text" @click="setPoint">配置参数</el-button></div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :offset="5" :span="19" class="tab-item">
                <div>广播周期：</div>
                <div><el-input class="input-col" v-model="bcCycle"></el-input></div>
              </el-col>
            </el-row>
            <div class="line"></div>
            <div class="log">
              <div><span>查询日志：</span><el-button type="warning" plain @click="clearLog">清空</el-button></div>
              <div><p v-for="(item, index) in logArr" :key="index">{{item}}</p></div>
            </div>
            <!-- <div style="text-align: center;margin-top:20px;">
              <el-button type="warning"  @click="savePoint">保存</el-button>
            </div> -->
          </el-tab-pane>
          <!-- <el-tab-pane label="路由设置" name="3">
            <el-row style="margin-top:15px;">
              <el-col :offset="4" :span="1" class="num-content"><span>1</span></el-col>
              <el-col class="tab-item" style="width:350px;">
                <div>节点编号：</div>
                <div><el-input class="input-col" v-model="nodeCode"></el-input></div>
              </el-col>
              <el-col :span="3">
                <div class="num-content"><el-button type="text" @click="getChannel">查询通道</el-button></div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :offset="4" :span="1" class="num-content"><span>2</span></el-col>
              <el-col style="width:350px;" class="tab-item">
                <div>通道号：</div>
                <div>
                  <el-autocomplete
                    class="input-col"
                    v-model="chNum"
                    :fetch-suggestions="querySearch"
                    placeholder="请输入内容"
                    @select="handleSelect"
                  ></el-autocomplete>
                </div>
              </el-col>
              <el-col :span="3">
                <div class="num-content"><el-button type="text" @click="getLocal">查询路由</el-button></div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :offset="4" :span="1" class="num-content"><span>3</span></el-col>
              <el-col style="width:350px;">
                <div class="tab-item">
                  <div>主设备地址：</div>
                  <div><el-input class="input-col" v-model="devCode"></el-input></div>
                </div>
                <div class="tab-item">
                  <div>从设备地址：</div>
                  <div><el-input class="input-col" v-model="slaveAddrs"></el-input></div>
                </div>
                <div class="tab-item">
                  <div>下属类型：</div>
                  <div>
                    <el-select class="input-col" v-model="destType">
                      <el-option :value="0" label="节点"></el-option>
                      <el-option :value="1" label="设备"></el-option>
                    </el-select>
                  </div>
                </div>
                <div class="tab-item">
                  <div>从设备类型：</div>
                  <div>
                    <el-select class="input-col" v-model="devType">
                      <el-option :value="0" label="微功率传感器"></el-option>
                      <el-option :value="1" label="汇聚节点设备"></el-option>
                      <el-option :value="2" label="低功率传感器"></el-option>
                    </el-select>
                  </div>
                </div>
              </el-col>
              <el-col :span="3">
                <div style="margin-top:15px;"><el-button type="text" @click="handleLocal(1)">添加路由</el-button></div>
                <div><el-button type="text" @click="handleLocal(2)">删除路由</el-button></div>
                <div><el-button type="text" @click="handleLocal(0)">重置路由</el-button></div>
              </el-col>
            </el-row>
            <div class="line"></div>
            <div class="log">
              <div><span>查询日志：</span><el-button type="warning" plain @click="clearLog">清空</el-button></div>
              <div><p v-for="(item, index) in logArr" :key="index">{{item}}</p></div>
            </div>
          </el-tab-pane> -->
          <!--        <el-tab-pane label="监听设置" name="4">-->
          <!--          <el-table-->
          <!--            :data="setData"-->
          <!--            stripe-->
          <!--            style="-->
          <!--                    width: 100%;-->
          <!--                    font-size: 14px;-->
          <!--                    margin-top:20px;-->
          <!--                "-->
          <!--            border-->
          <!--          >-->
          <!--            <el-table-column type="index" label="序号" width="70" :index="indexMethod1">-->
          <!--            </el-table-column>-->
          <!--            <el-table-column-->

          <!--              prop="nodePhyAddr"-->
          <!--              label="监听设备编号"-->
          <!--              width="180"-->
          <!--            >-->
          <!--            </el-table-column>-->
          <!--            <el-table-column prop="workFreq" label="监听频点">-->
          <!--            </el-table-column>-->
          <!--            <el-table-column prop="jtstatus" label="状态">-->
          <!--              <template slot-scope="scope">-->
          <!--                <el-button-->
          <!--                  v-if="scope.row.jtstatus == 1"-->
          <!--                  type="text"-->
          <!--                  style="color:#21b41e;"-->
          <!--                >已启用</el-button>-->
          <!--                <el-button-->
          <!--                  v-if="scope.row.jtstatus == 0"-->
          <!--                  type="text"-->
          <!--                  style="color:#ff0000;"-->
          <!--                >已关闭</el-button>-->
          <!--              </template>-->
          <!--            </el-table-column>-->
          <!--            <el-table-column label="操作">-->
          <!--              <template slot-scope="scope">-->
          <!--                <el-button-->
          <!--                  type="text"-->
          <!--                  @click="delSet(scope.row)"-->
          <!--                  删除-->
          <!--                </el-button>-->
          <!--                <el-button-->
          <!--                  type="text"-->
          <!--                  @click="change(scope.row)"-->
          <!--                  修改</el-button>-->
          <!--              </template>-->
          <!--            </el-table-column>-->
          <!--          </el-table>-->
          <!--        </el-tab-pane>-->
        </el-tabs>
        <el-dialog
          title="修改频点"
          :visible.sync="dialogVisible"
          width="40%">
          <div class="tab-item1">
            <div>监听设备编号：</div>
            <div style="line-height:35px;">{{pointCode}}</div>
          </div>
          <div class="tab-item1">
            <div>监听频点：</div>
            <div><el-input class="input-col" v-model="ch"></el-input></div>
          </div>
          <div class="tab-item1">
            <div>状态：</div>
            <div>
              <el-radio-group style="margin-top:10px;" v-model="status">
                <el-radio :label="0">不启用</el-radio>
                <el-radio :label="1">启用</el-radio>
              </el-radio-group>
            </div>
          </div>
          <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="setChange">确 定</el-button>
        </span>
        </el-dialog>
      </div>
    </div>
</template>

<script>
import 'echarts/lib/chart/tree'
import mylib from '../api/index'
export default {
  name: 'network',
  data () {
    return {
      height: mylib.height - 115,
      myChart: null,
      netData: [], // 网络列表
      setData: [], // 监听列表
      tableData: [], // 树图数据
      currentPage1: 1,
      pageSize1: 10,
      total1: 0,
      currentPage2: 1,
      pageSize2: 10,
      total2: 0,
      activeName: '1',
      dialogVisible: false, // 监听修改
      pointCode: '', // 修改的编号
      id: '', // 修改id
      ch: '', // 修改监听频点号
      status: '',
      websock: null, // websocket
      websock4: null,
      nodeCode: '', // 节点编号
      devType: '', // 从设备类型
      slaveAddrs: '', // 从设备地址
      devCode: '', // 主设备地址
      workFreq: '', // 频点号
      bcCycle: '', // 广播周期
      chNum: '', // 通道号
      chArr: [], // 通道数组
      logArr: [], // 日志数组
      destType: '', // 下属类型
      isShow: true
    }
  },
  methods: {
    // 序号处理
    indexMethod (index) {
      return (index + 1) + (this.currentPage1 - 1) * this.pageSize1
    },
    indexMethod1 (index) {
      return (index + 1) + (this.currentPage2 - 1) * this.pageSize2
    },
    // websocket获取数据
    WebSocketSet () {
      if ('WebSocket' in window) {
        const wsuri = 'ws://' + mylib.URL + '/websocket/' + sessionStorage.getItem('userName')
        this.websock = new WebSocket(wsuri)
        this.websock.onmessage = (res => {
          let rst = JSON.parse(res.data)
          if (typeof (rst.data) == 'string') {
            this.logArr = this.logArr.concat(rst.data.split('\n'))
          }
          if (rst.chNum) { // 查询通道
            var arr = rst.chNum.split(',')
            arr.forEach((el) => {
              this.chArr.push({
                value: el
              })
            })
            this.chNum = arr[0]
          } else if (rst.workFreq) { // 查询频点
            this.workFreq = rst.workFreq
          } else if (typeof (rst.data) == 'string') { // 查询路由
            const arr = rst.data.split('，')
            this.devCode = arr[6].substring(2)
            this.slaveAddrs = arr[7].substring(2)
          }
        })
        this.websock.onopen = (res => {
          console.log('socket连接成功')
          this.websock.send(this.nodeCode)
        })
        this.websock.onclose = (res => {
          console.log('socket已关闭')
        })
      } else {
        alert('当前浏览器 Not support websocket')
      }
    },
    // websocket获取数据
    // WebSocketSet1 () {
    //   if ('WebSocket' in window) {
    //     const wsuri = 'ws://' + mylib.URL + '/websocket/' + sessionStorage.getItem('userName')
    //     this.websock4 = new WebSocket(wsuri)
    //     this.websock4.onmessage = (res => {
    //       let rst = JSON.parse(res.data)
    //       console.log(rst)
    //       if (rst.jsonTree) {
    //         this.tableData = rst.jsonTree
    //         this.netData = rst.data.param
    //       }
    //       if (this.tableData.length > 0) {
    //         this.initData(this.tableData[0])
    //         // this.changeTree(this.tableData[0])
    //         this.initTree()
    //         let mycharts = this.$echarts.init(document.getElementById('chart'))
    //         mycharts.setOption(this.myChart1, {notMerge: true})
    //       }
    //     })
    //     this.websock4.onopen = (res => {
    //       console.log('socket连接成功')
    //     })
    //     this.websock4.onclose = (res => {
    //
    //       console.log('socket已关闭')
    //     })
    //   } else {
    //     alert('当前浏览器 Not support websocket')
    //   }
    // },
    // tab切换
    handleClick () {
      this.nodeCode = ''
      this.chNum = ''
      this.chArr = []
      this.workFreq = ''
      this.devType = ''
      this.slaveAddrs = ''
      this.devCode = ''
      this.bcCycle = ''
      this.destType = ''
      this.logArr = []
      this.isShow = !this.isShow
      if (this.activeName == '4') {
        mylib.axios({
          url: '/topology/jtList',
          type: 'json',
          params: {start: this.currentPage2, pageSize: this.pageSize2}
        }).then((res) => {
          this.setData = res.data
          // this.total2 = res.data.total
        })
      }
    },
    // 刷新
    reload () {
      location.reload()
    },
    // 清空操作
    clear () {
      mylib.axios({
        url: '/agsnode/clearNode',
        type: 'json'
      }).then((res) => {
        if (res.code == 200) {
          this.$message.success(res.msg)
          this.activeName = '1'
          this.isShow = true
          this.getReal()
          this.getnetTable()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // 清空日志
    clearLog () {
      this.logArr = []
    },
    // 查询通道
    getChannel () {
      mylib.axios({
        url: '/agsnode/quertPassageway',
        type: 'json',
        params: {nodeCode: this.nodeCode}
      }).then((res) => {
        if (res.code == 200) {
          this.WebSocketSet()
        }
      })
    },
    querySearch (queryString, cb) {
      var restaurants = this.chArr
      console.log(restaurants)
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
      // 调用 callback 返回建议列表的数据
      console.log(results)
      cb(results)
    },
    createFilter (queryString) {
      return (restaurant) => {
        return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    },
    handleSelect (item) {
      this.chNum = item.value
    },
    // 查询频点
    getPoint () {
      mylib.axios({
        url: '/agsnode/quertWorkFreq',
        type: 'json',
        params: {
          nodeCode: this.nodeCode,
          ch: this.chNum
        }
      }).then((res) => {
        if (res.code == 200) {
          this.WebSocketSet()
        }
      })
    },
    // 配置频点
    setPoint () {
      var params = {
        nodeCode: this.nodeCode,
        ch: this.chNum,
        workFreq: this.workFreq,
        bcCycle: this.bcCycle,
        action: this.chArr.length
      }
      mylib.axios({
        url: '/agsnode/chParam',
        type: 'json',
        params: params
      }).then((res) => {
        if (res.code == 200) {
          this.$message.success(res.msg)
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // 保存频点
    savePoint () {
      var params = {
        nodePhyAddr: this.nodeCode,
        chNum: this.chNum,
        workFreq: this.workFreq,
        bcCycle: this.bcCycle,
        action: this.chArr.length,
        jtstatus: 1
      }
      mylib.axios({
        url: '/topology/edit',
        params: params
      }).then((res) => {
        if (res.code == 200) {
          this.$message.success(res.msg)
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // 查询路由
    getLocal () {
      if (this.devCode && this.devCode.length !== 12) {
        return this.$message('主设备地址长度为12位')
      }
      var params = {
        nodeCode: this.nodeCode,
        ch: this.chNum,
        devCode: this.devCode
      }
      mylib.axios({
        url: '/agsnode/queryRoute',
        params: params
      }).then((res) => {
        if (res.code == 200) {
          this.WebSocketSet()
        }
      })
    },
    // 路由处理
    handleLocal (status) {
      if (!this.devCode) {
        return this.$message('主设备地址不能为空')
      }
      if (!this.slaveAddrs) {
        return this.$message('从设备地址不能为空')
      }
      if (this.devCode && this.devCode.length !== 12) {
        return this.$message('主设备地址长度为12位')
      }
      if (this.slaveAddrs && this.slaveAddrs.length !== 12) {
        return this.$message('从设备地址长度为12位')
      }
      if (this.destType === '') {
        return this.$message('下属类型不能为空')
      }
      if (this.devType === '') {
        return this.$message('从设备类型不能为空')
      }
      var params = {
        nodeCode: this.nodeCode,
        ch: this.chNum,
        param: {
          devCode: this.devCode,
          slaveAddrs: this.slaveAddrs,
          devType: this.devType,
          destType: this.destType,
          status: status
        }
      }
      mylib.axios({
        url: '/agsnode/addRoute',
        type: 'json',
        params: params
      }).then((res) => {
        if (res.code == 200) {
          this.$message.success(res.msg)
          this.getReal()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // 修改监听设置
    change (row) {
      this.dialogVisible = true
      this.pointCode = row.nodePhyAddr
      this.ch = row.workFreq
      this.id = row.id
      this.status = row.jtstatus
    },
    setChange () {
      var params = {
        nodeCode: this.pointCode,
        action: 1,
        ch: 1,
        param: {
          id: this.id,
          workFreq: +this.ch,
          jtstatus: this.status
        }
      }
      mylib.axios({
        url: '/agsnode/jtUpdate',
        type: 'json',
        params: params
      }).then((res) => {
        if (res.code == 200) {
          this.$message.success(res.msg)
        } else {
          this.$message.error(res.msg)
        }
        this.dialogVisible = false
        mylib.axios({
          url: '/topology/jtList',
          type: 'json'
        }).then((res) => {
          this.setData = res.data
        })
      })
    },
    // 监听设置删除
    delSet (row) {
      this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var params = {
          ids: row.id
        }
        mylib.axios({
          url: '/topology/remove',
          params: params
        }).then((res) => {
          if (res.code == 200) {
            this.$message.success(res.msg)
            mylib.axios({
              url: '/topology/jtList',
              type: 'json'
            }).then((res) => {
              this.setData = res.data
            })
          } else {
            this.$message.error(res.msg)
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 初始化数据
    changeTree (data) {
      data.name = data.code
      data.label = {
        rotate: 0
      }
      data.children.forEach((al) => {
        al.name = al.code
        al.label = {
          rotate: 0
        }
        if (al.children && al.children.length > 0) {
          al.children.forEach((bl) => {
            bl.name = bl.code ? bl.code : bl.name
            bl.lineStyle = {
              color: 'green'
            }
            bl.itemStyle = {
              color: 'green'
            }
            if (bl.children && bl.children.length > 0) {
              bl.children.forEach((el) => {
                el.name = el.code ? el.code : el.name
                el.lineStyle = {
                  color: '#ff8400'
                }
                el.itemStyle = {
                  color: '#ff8400'
                }
                if (el.children && el.children.length > 0) {
                  el.children.forEach((cl) => {
                    cl.name = cl.code ? cl.code : cl.name
                    cl.lineStyle = {
                      color: '#f84848'
                    }
                    cl.itemStyle = {
                      color: '#f84848'
                    }
                  })
                }
              })
            }
          })
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
    // 点击传感器节点
    clickFun (params) {
      this.nodeCode = params.data.code
    },
    // 初始图表
    initTree () {
      this.myChart = {
        tooltip: {
          trigger: 'item',
          triggerOn: 'mousemove'
        },
        series: [
          {
            type: 'tree',
            data: this.tableData,
            roam: true,
            left: '8%',
            right: '8%',
            top: '8%',
            bottom: '25%',

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
    getnetTable () {
      const params = {
        start: this.currentPage1,
        pageSize: this.pageSize1
      }
      mylib.axios({
        url: '/topology/list',
        params: params
      }).then((res) => {
        this.netData = res.data.rows
        this.total1 = res.data.total
      })
    },
    handleCurrentChange () {
      this.getnetTable()
    },
    handleSizeChange (val) {
      this.pageSize1 = val
      this.getnetTable()
    },
    handleSizeChange1 (val) {
      this.pageSize2 = val
      mylib.axios({
        url: '/topology/jtList',
        type: 'json',
        params: {start: this.currentPage2, pageSize: this.pageSize2}
      }).then((res) => {
        this.setData = res.data
      })
    },
    handleCurrentChange1 () {
      mylib.axios({
        url: '/topology/jtList',
        type: 'json',
        params: {start: this.currentPage2, pageSize: this.pageSize2}
      }).then((res) => {
        this.setData = res.data
      })
    },
    getReal () {
      mylib.axios({
        url: '/topology/queryTopologyReal2',
        type: 'json'
      }).then((res) => {
        if (res.code == 200) {
          // this.WebSocketSet1()
          if (res.jsonTree) {
            this.tableData = res.jsonTree
            this.netData = res.data.param
          }
          if (this.tableData.length > 0) {
            this.initData(this.tableData[0])
            // this.changeTree(this.tableData[0])
            this.initTree()
          }
        }
      })
    }
  },
  // destroyed () {
  //   this.websock4.close()
  //   if (this.websock) {
  //     this.websock.close()
  //   }
  // },
  mounted () {
    this.getReal()
    // this.getnetTable()
  }
}
</script>

<style scoped>
.content{
  width:100%;
  display:flex;
  /*background:rgb(245, 247, 250);*/
  position:relative;
  box-sizing: border-box;
  background:#f5f7fa;
}
.content-item-left{
  width:50%;
  background:#fff;
  overflow-y: auto;
  overflow-x: hidden;
}
.content-item-right{
  width:calc(50% - 10px);
  margin-left:10px;
  background:#fff;
  padding:15px 20px;
  box-sizing: border-box;
}
.mychart{
  width:100% !important;height:750px !important;
}
@media screen and (max-width: 1600px) {
  .mychart{
    width:100% !important;height:550px !important;
  }
}
@media screen and (max-width: 1366px) {
  .mychart{
    width:100% !important;height:450px !important;
  }
}
.input-col{
  width:250px;
  margin-right:10px;
}
.num-content{
  margin-top:13px;
  line-height:35px;
  text-align: right;
  padding-right:5px;
  box-sizing: border-box;
}
.num-content>span{
  width:16px;
  height:16px;
  display:inline-block;
  border-radius: 50%;
  border:1px solid #ff8400;
  color:#ff8400;
  text-align: center;
  line-height: 16px;
  font-size: 12px;
}
.line{
  border-top:1px solid #e6ebf5;
  margin:15px 0 20px;
}
.tab-item,.tab-item1{
  display:flex;
  font-size: 12px;
  margin-top:15px;
}
.tab-item1{
  width:80%;
  margin:25px 0 10px 20%;
}
.tab-item>div:first-child,.tab-item>div:last-child{
  width:67px;
  line-height:35px;
}
.tab-item1>div:first-child{
  width:100px;
  line-height:35px;
}
.tab-item1>div:last-child{
  width:150px;
  line-height:35px;
}
.right-btn{
  position:absolute;
  right:20px;
  z-index: 22;
}
.el-icon{
  margin-right:4px;
}
  .log{
    width:80%;
    margin-left:10%;
    border:1px solid #ff8400;
    font-size:12px;
    height:220px;
    border-radius: 2px;
    padding:10px;
  }
  .log>div:first-child{
    margin-bottom:15px;
  }
  .log>div:last-child{
    height:190px;
    overflow:auto;
  }
  .log .el-button{
    padding:5px 8px;
    float:right;
  }
  @media screen and (min-width: 1600px) {
    .log{
      height:340px;
    }
    .log>div:last-child{
      height:310px;
      overflow:auto;
    }
  }
</style>
