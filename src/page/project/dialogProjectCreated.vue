<template>
  <!-- 创建项目 -->
  <div class="container">
    <div class='list' v-if='active == 0'>
      <el-form :rules="rules" ref='form' :model='form' label-width='120px'>
        <el-form-item label='项目名称：' prop="projectName">
                    <el-input v-model='form.projectName'></el-input>
<!--          <span>{{form.projectName}}</span>-->
        </el-form-item>
        <el-form-item label='厂家名称：' prop="manufacturer">
          <el-input v-model='form.manufacturer'></el-input>
<!--          <span>{{form.manufacturer}}</span>-->
        </el-form-item>
        <el-form-item label='设备名称：' prop="deviceName">
          <el-input v-model='form.deviceName'></el-input>
<!--          <span>{{form.deviceName}}</span>-->
        </el-form-item>
        <el-form-item label='设备型号：' prop="deviceModel">
          <el-input
            v-model='form.deviceModel'
          ></el-input>
<!--          <span>{{form.deviceModel}}</span>-->
        </el-form-item>
        <el-form-item label='设备编号：' prop="deviceCode">
          <el-input v-model='form.deviceCode'></el-input>
<!--          <span>{{form.deviceCode}}</span>-->
        </el-form-item>
        <el-form-item label='被测类型：' prop="devType">
          <el-select v-model="form.devType" style="width:100%;" placeholder="" @change="handleChart">
            <el-option label="微功率传感器" :value="0"></el-option>
            <el-option label="汇聚节点" :value="1"></el-option>
            <el-option label="低功率传感器" :value="2"></el-option>
            <el-option label="接入节点" :value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="form.devType == 1 || form.devType == 3" label='传感器编号：' prop="sensorCode">
          <el-input v-model='form.sensorCode'></el-input>
        </el-form-item>
        <el-form-item label='分组名称：' prop="useCasesID">
          <el-select
            style="width:100%;"
            v-model='form.useCasesID'
            placeholder=''
            @change="selectGet"
          >
            <el-option
              v-for='(item, index) in region'
              :key='index.value'
              :label='item.label'
              :value='item.value'
            ></el-option>
          </el-select></el-form-item
        >
        <el-form-item label='设备模型：' prop="modelId">
          <el-select
            v-model='form.modelId'
            placeholder=''
            style="width:100%;"
            @change='selectChange'
          >
            <el-option
              v-for='item in typeOption'
              :key='item.id'
              :label='item.sensorTypeName'
              :value='item.id'

            />
          </el-select>
        </el-form-item
        >
        <el-form-item label='业务周期：' prop="busCycle" v-if="form.devType === 0 || form.devType == 2">
          <el-input v-model='form.busCycle'>
            <span slot="suffix">（单位：s）</span>
          </el-input>
        </el-form-item>
        <el-form-item label='控制周期：' prop="ctrlCycle" v-if="form.devType === 0">
          <el-input v-model='form.ctrlCycle'>
            <span slot="suffix">（单位：/业务周期）</span>
          </el-input>
        </el-form-item>
        <el-form-item label='规约：' prop="protocolType" v-if="form.devType == 1 || form.devType == 3">
          <el-select v-model="form.protocolType" style="width:100%;" placeholder="" @change="handleChart">
            <el-option label="0531版本" :value="1"></el-option>
            <el-option label="0618版本" :value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <div class="footer">
            <div class='foots'>
              <el-button type='warning' class='next' @click="next1('form')">下一步</el-button>

              <el-button type='warning' plain class='clear' @click="handleCancel">取消</el-button>
            </div>
          </div>
        </el-form-item>
      </el-form>
    </div>
    <div class='lists' v-if='active == 1'>
      <div class='table'>
        <el-table :data='optionData' style='width: 100%' border stripe  max-height="500" :span-method="arraySpanMethod">
          <el-table-column label="用例编号" prop="useCasesCode">
          </el-table-column>
          <el-table-column prop="useCasesName" label="用例内容" min-width="200">
          </el-table-column>
          <el-table-column prop="useCasesType" label="用例级别">
            <template slot-scope="scope">
              <span v-if="scope.row.useCasesType == 0">MAC层</span>
              <span v-if="scope.row.useCasesType == 1">net网络层</span>
              <span v-if="scope.row.useCasesType == 2">bus业务层</span>
            </template>
          </el-table-column>
          <el-table-column prop="caseClassify" label="用例类型">
            <template slot-scope="scope">
              <span v-if="scope.row.caseClassify == 0">普通</span>
              <span v-if="scope.row.caseClassify == 1">通用</span>
              <span v-if="scope.row.caseClassify == 2">告警</span>
            </template>
          </el-table-column>
          <el-table-column prop="priority" label="前驱用例">
          </el-table-column>
          <el-table-column label="输入参数" width="120">
            <template slot-scope="scope">
              <div class="paramsContent" :class="{'haveCase': scope.row.caseClassify != 0}" v-for="(item, index) in scope.row.listGroupParam" :key="index" v-if="item.showFalg == 1 || scope.row.useCasesType != 1">
                <div>
                  <el-select placeholder="" v-if="scope.row.caseClassify != 0" v-model="item.paramId" @change="handleGet($event, scope.$index, index)">
                    <el-option v-for="(item, index) in paramsOptions" :key="index" :value="item.paramId" :label="item.param"></el-option>
                  </el-select>
                  <span v-else>{{item.param}}</span>
                </div>
<!--                <div>{{item.paramCode}}</div>-->
                <div>
                  <div v-if="scope.row.caseClassify == 2">
                    <el-input type="text" v-model="item.paramup"></el-input>
                    <el-input type="text" style="margin-top:5px;" v-model="item.paramdown"></el-input>
                  </div>
                  <div v-else-if="scope.row.caseClassify == 1">
                    <el-input type="text" v-model="item.defaultData"></el-input>
                  </div>
                  <span v-else>{{item.defaultData}}</span>
                </div>
                <div>
                  <div v-if="scope.row.caseClassify == 2">
                    <div style="height:26px;line-height:26px;">{{item.paramUnit}}</div>
                    <div style="height:26px;margin-top:5px;line-height:26px;">{{item.paramUnit}}</div>
                  </div>
                  <span v-else>{{item.paramUnit}}</span>
                </div>
                <div>
                  <div v-if="scope.row.caseClassify == 2">
                    <div style="height:26px;line-height:26px;">上限值</div>
                    <div style="height:26px;margin-top:5px;line-height:26px;">下限值</div>
                  </div>
                  <div v-else-if="scope.row.caseClassify == 1">
                    <div style="height:26px;line-height:26px;">当前值</div>
                  </div>
                  <div v-else>
                    <span v-if="item.paramType == -1">下限值</span>
                    <span v-if="item.paramType == 0">当前值</span>
                    <span v-if="item.paramType == 1">上限值</span>
                  </div>
                </div>
<!--                <div>-->
<!--                  <el-input v-if="scope.row.caseClassify != 0 && index == 0" v-model="scope.row.timeout"></el-input>-->
<!--                  <span v-if="scope.row.caseClassify == 0 && index == 0">{{scope.row.timeout}}</span>-->
<!--                </div>-->
                <div class="params-btn" v-if="scope.row.caseClassify == 2">
                  <i class="el-icon-remove-outline" v-if="scope.row.listGroupParam.length > 1" @click="handleDel(scope.row.listGroupParam, index)"></i>
                  <i class="el-icon-circle-plus-outline" @click="add(scope.row.listGroupParam, scope.row, index)" v-if="index == (scope.row.listGroupParam.length - 1)"></i>
                </div>
              </div>
            </template>
          </el-table-column>
<!--          <el-table-column label="参数编号" width="80">-->
<!--            <template slot-scope="scope">-->
<!--            </template>-->
<!--          </el-table-column>-->
          <el-table-column label="参数值" width="80">
            <template slot-scope="scope">
            </template>
          </el-table-column>
          <el-table-column label="参数单位" width="80">
            <template slot-scope="scope">
            </template>
          </el-table-column>
          <el-table-column label="参量类型" width="170">
            <template slot-scope="scope">
            </template>
          </el-table-column>
<!--          <el-table-column prop="timeout" label="超时" width="170">-->
<!--            <template slot-scope="scope">-->
<!--            </template>-->
<!--          </el-table-column>-->
        </el-table>
      </div>
      <div class='footer'>
        <div class='foots'>
          <el-button type='warning' class='next' @click='next'>下一步</el-button>
          <el-button
            type='warning'
            plain
            class='clear'
            @click='before'>上一步</el-button>
        </div>
      </div>
    </div>
    <div class='lists' v-if='active == 2'>
      <div class='table'>
        <el-table :data='tableData' style='width: 100%' border stripe>
          <el-table-column label="参量名称（中文）" prop="paramNameCh" width="180">
          </el-table-column>
          <el-table-column prop="paramNameEn" label="参量名称（英文）" width="180">
          </el-table-column>
          <el-table-column prop="dataCode" label="参数编号">
            <template slot-scope="scope">
              <span>{{scope.row.dataCode}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="paramType" label="参量类型">
            <template slot-scope="scope">
              <span v-if="scope.row.paramType == 1">定值</span>
              <span v-if="scope.row.paramType == 2">测量值</span>
            </template>
          </el-table-column>
          <el-table-column prop="dataLen" label="数据长度">
            <template slot-scope="scope">
              <span>{{scope.row.dataLen}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="dataFieldLen" label="数据域长度">
            <template slot-scope="scope">
              <span>{{scope.row.dataFieldLen}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="dataType" label="数据类型">
            <template slot-scope="scope">
              <span v-if="scope.row.dataType == 1">浮点数</span>
              <span v-if="scope.row.dataType == 2">无符号整形</span>
              <span v-if="scope.row.dataType == 4">二进制数据</span>
            </template>
          </el-table-column>
          <el-table-column prop="dataUnit" label="数据单位">
            <template slot-scope="scope">
              <span>{{scope.row.dataUnit}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="decimals" label="小数位数">
            <template slot-scope="scope">
              <span>{{scope.row.decimals}}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div class='footer'>
        <div class='foots'>
          <el-button v-if="form.devType % 2 == 1" type='warning' class='next' @click='next2(1)'>完成</el-button>
          <el-button v-else type='warning' class='next' @click='next2(2)'>下一步</el-button>
          <el-button
            type='warning'
            plain
            class='clear'
            @click='before'>上一步</el-button>
        </div>
      </div>
    </div>
    <div v-show='active == 3 && (form.devType % 2 == 0)'>
      <div id="chart2" class="mychart"></div>
      <div class='footer'>
        <div class='foots'>
          <el-button type='warning' class='next' @click='confirm'
          >保存</el-button>
          <el-button
            type='warning'
            plain
            class='clear'
            @click='before'
          >上一步</el-button>
        </div>
      </div>
    </div>
    <div style='clear: both;'></div>
  </div>
</template>

<script>
import mylib from '../../api/index'
import 'echarts/lib/chart/tree'
// import $ from 'jquery'
export default {
  name: 'dialogProjectCreate',
  data () {
    return {
      dialogVisible: false,
      id: '',
      label: '',
      active: 0,
      // 设备类型
      typeOption: [],
      tableData: [],
      optionData: [],
      options: [
        { label: '10分钟', value: '10' },
        { label: '20分钟', value: '20' },
        { label: '30分钟', value: '30' }
      ],
      options2: [
        { label: '10分钟', value: '10' },
        { label: '20分钟', value: '20' },
        { label: '30分钟', value: '30' }
      ],
      region: [
      ],
      rules: {
        projectName: [
          {required: true, message: '项目名称为空', trigger: 'blur'}
        ],
        manufacturer: [
          {required: true, message: '厂家名称为空', trigger: 'blur'}
        ],
        devType: [
          {required: true, message: '请选择被测类型', trigger: 'change'}
        ],
        useCasesID: [
          {required: true, message: '请选择分组名称', trigger: 'change'}
        ],
        modelId: [
          {required: true, message: '请选择设备模型', trigger: 'change'}
        ],
        deviceName: [
          {required: true, message: '设备名称为空', trigger: 'blur'}
        ],
        deviceModel: [
          {required: true, message: '设备型号为空', trigger: 'blur'}
        ],
        deviceCode: [
          {required: true, message: '设备编号为空', trigger: 'blur'}
        ],
        busCycle: [
          {required: true, message: '请输入业务周期', trigger: 'blur'}
        ],
        ctrlCycle: [
          {required: true, message: '请输入控制周期', trigger: 'blur'}
        ]
      },
      form: {
        projectName: '',
        manufacturer: '',
        deviceName: '',
        devType: '',
        deviceModel: '',
        deviceCode: '',
        useCasesID: '',
        useCasesType: '',
        projectCode: '',
        deviceId: '',
        busCycle: '',
        ctrlCycle: '',
        taskId: '',
        sensorCode: '',
        protocolType: 1
      },
      paramsOptions: [],
      obj: {
        paramup: '',
        paramdown: '',
        defaultData: ''
      },
      disabled: false,
      deviceSelect: false,
      deviceOptions: [],
      myChart1: null,
      treeData: []
    }
  },
  mounted () {
    mylib.axios({url: '/useCasesGroup/list'}).then((res) => {
      res.data.rows.forEach((el) => {
        if (el.status == 1) {
          this.region.push({
            value: el.id,
            label: el.name
          })
        }
      })
    })

    mylib.model().then((res) => {
      var arr = []
      res.forEach((el) => {
        if (el.status == 1) {
          arr.push(el)
        }
      })
      this.typeOption = arr
    })
  },
  created () {
  },
  methods: {
    handleChart () {
      this.form.busCycle = ''
      this.form.ctrlCycle = ''
      mylib.axios({
        url: '/topology/queryTopology',
        type: 'json',
        params: {devType: this.form.devType}
      }).then((res) => {
        if (res.code == 200) {
          this.treeData = res.jsonTree
          if (this.treeData.length > 0) {
            this.initData(this.treeData[0])
            this.initTree()
            let mycharts = this.$echarts.init(document.getElementById('chart2'))
            mycharts.setOption(this.myChart1, {notMerge: true})
          }
        } else {
          this.$message.error(res.msg)
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
    initTree () {
      this.myChart1 = {
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
              color: 'rgba(0,150,136,0.5)'
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
    handleCancel () {
      history.back()
    },
    add (arr, row, index) {
      if (!arr[index].paramId) {
        return this.$message('未选择告警项')
      } else if (!arr[index].paramup || !arr[index].paramdown) {
        return this.$message('上下限值为空')
      } else if (+arr[index].paramup < +arr[index].paramdown) {
        return this.$message('下限值大于上限值')
      }
      arr.push({
        defaultData: '',
        detailsParamId: '',
        param: '',
        paramCode: '',
        paramId: '',
        paramType: '',
        paramUnit: '',
        useCasesCode: row.useCasesCode,
        useCasesGroupId: row.useCasesGroupId,
        paramup: '',
        paramdown: ''
      })
    },
    handleDel (arr, index) {
      arr.splice(index, 1)
    },
    arraySpanMethod ({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 5) {
        return [1, 6]
      } else if (columnIndex === 6 || columnIndex === 7 || columnIndex === 8 || columnIndex === 9 || columnIndex === 10) {
        return [0, 0]
      }
    },
    handleGet (e, ind, index) {
      var obj = {}
      obj = this.paramsOptions.find((item) => {
        return item.paramId === e // 筛选出匹配数据
      })
      this.obj.paramId = obj.paramId
      this.obj.param = obj.param
      this.obj.paramType = obj.paramType
      this.obj.paramCode = obj.paramCode
      this.obj.paramUnit = obj.paramUnit
      this.$nextTick(function () {
        var arr = this.optionData
        this.optionData = []
        arr.forEach((el, index1) => {
          if (index1 == ind) {
            el.listGroupParam.forEach((al, index2) => {
              if (index2 == index) {
                el.listGroupParam.splice(index2, 1, this.obj)
              }
            })
          }
          if (!el.timeout) {
            this.optionData.push({
              listGroupParam: el.listGroupParam,
              timeout: '',
              caseClassify: el.caseClassify,
              useCasesName: el.useCasesName,
              useCasesStatus: el.useCasesStatus,
              useCasesType: el.useCasesType,
              useCasesCode: el.useCasesCode,
              priority: el.priority
            })
          } else {
            this.optionData.push(el)
          }
        })
        this.obj = {
          paramup: '',
          paramdown: '',
          defaultData: ''
        }
      })
    },
    selectGet (vId) {
      // 这个vId也就是value值
      //   console.log(ha);
      let obj = {}
      obj = this.region.find((item) => {
        // 这里的userList就是上面遍历的数据源
        return item.value === vId // 筛选出匹配数据
      })
      //   console.log(obj.value);
      this.label = obj.label
      //   console.log(obj.label);//我这边的name就是对应label的
      this.form.useCasesType = this.label
      const params = { id: this.form.useCasesID }
      // console.log(params);
      mylib.axios({
        url: '/useCasesGroup/listDetails',
        params: params
      }).then((res) => {
        this.optionData = res.data.groupDetailsList
      })
    },
    next1 (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.active++
        } else {
          return false
        }
      })
    },
    next () {
      for (var i = 0; i < this.optionData.length; i++) {
        var el = this.optionData[i]
        if (el.caseClassify == 2) {
          if (el.listGroupParam.length == 1) {
            if (!el.listGroupParam[0].paramId) {
              return this.$message('必须设置一个告警配置项')
            } else if (!el.listGroupParam[0].paramup || !el.listGroupParam[0].paramdown) {
              return this.$message('上下限值为空')
            } else if (+el.listGroupParam[0].paramup < +el.listGroupParam[0].paramdown) {
              return this.$message('下限值大于上限值')
            }
          } else {
            for (var j = 0; j < el.listGroupParam.length; j++) {
              var al = el.listGroupParam[j]
              if (al.paramId) {
                if (!al.paramup || !al.paramdown) {
                  return this.$message('上下限值为空')
                } else if (+al.paramup < +al.paramdown) {
                  return this.$message('下限值大于上限值')
                }
              }
            }
          }
          // if (!el.timeout) {
          //   return this.$message('超时时间为空')
          // }
        }
        if (el.caseClassify == 1) {
          if (!el.listGroupParam[0].paramId) {
            return this.$message('必须设置一个通用参数')
          } else if (!el.listGroupParam[0].defaultData) {
            return this.$message('当前值为空')
          }
          // if (!el.timeout) {
          //   return this.$message('超时时间为空')
          // }
        }
      }
      this.active++
    },
    next2 (val) {
      this.active = 3
      if (val == 1) {
        this.confirm()
      }
    },
    selectChange () {
      this.click()
      this.optionData.forEach((el) => {
        if (el.caseClassify != 0) {
          el.listGroupParam = []
          el.listGroupParam.push({
            paramId: '',
            param: '',
            paramCode: '',
            paramUnit: '',
            paramType: '',
            defaultData: ''
          })
          if (!el.timeout) {
            el.timeout = ''
          }
        }
      })
    },
    click () {
      const params = { modelId: this.form.modelId }
      mylib.modelDetails(params).then((res) => {
        this.tableData = res.data
      })
      mylib.axios({
        url: '/modelDetails/queryByModelId',
        params: {
          modelId: this.form.modelId
        }
      }).then((res) => {
        if (res.code == 200) {
          this.paramsOptions = res.data
        }
      })
    },
    before () {
      this.active--
    },
    confirm () {
      var listProConfig = []
      this.optionData.forEach((el) => {
        if (el.caseClassify == 2) {
          var arr = []
          el.listGroupParam.forEach((al) => {
            arr.push({
              paramId: al.paramId,
              useCasesCode: al.useCasesCode,
              param: al.param,
              defaultData: al.paramup,
              paramCode: al.paramCode,
              paramUnit: al.paramUnit,
              paramType: 1
            })
            arr.push({
              paramId: al.paramId,
              param: al.param,
              defaultData: al.paramdown,
              paramCode: al.paramCode,
              paramUnit: al.paramUnit,
              paramType: -1
            })
          })
          el.listGroupParam = arr
        }
        if (el.caseClassify == 1) {
          var arr1 = []
          el.listGroupParam.forEach((cl) => {
            arr1.push({
              paramId: cl.paramId,
              useCasesCode: cl.useCasesCode,
              param: cl.param,
              defaultData: cl.defaultData,
              paramCode: cl.paramCode,
              paramUnit: cl.paramUnit,
              paramType: 0
            })
          })
          el.listGroupParam = arr1
        }
        listProConfig.push({
          processName: el.useCasesName,
          processStatus: el.useCasesStatus,
          processType: el.useCasesType,
          useCasesCode: el.useCasesCode,
          timeOut: +el.timeout,
          priority: el.priority,
          caseClassify: el.caseClassify,
          proConfigParamList: el.listGroupParam
        })
      })
      this.disabled = true
      const projectInfo = {
        taskId: this.form.taskId,
        projectName: this.form.projectName,
        manufacturer: this.form.manufacturer,
        useCasesID: this.form.useCasesID,
        useCasesType: this.label,
        deviceName: this.form.deviceName,
        deviceNum: 1,
        deviceCode: this.form.deviceCode,
        sensorCode: this.form.sensorCode,
        deviceId: this.form.deviceId,
        // duration: this.form.duration,
        modelId: this.form.modelId,
        deviceModel: this.form.deviceModel,
        devType: this.form.devType,
        busCycle: this.form.busCycle,
        ctrlCycle: this.form.ctrlCycle,
        protocolType: this.form.protocolType,
        listProConfig: listProConfig
      }
      mylib.axios({
        url: '/project/insertProject',
        type: 'json',
        params: projectInfo
      }).then((res) => {
        // this.dialogVisible = false;
        if (res.code == '200') {
          this.$message.success(res.msg)
          if (res.projectStatus == 1) {
            if (this.form.devType % 2 == 0) {
              this.$emit('getMessage', '1')
              this.$router.push({
                name: 'testing',
                query: { projectCode: res.projectCode, userName: res.userName }
              })
            } else {
              this.$emit('getMessage', '1')
              this.$router.push({
                name: 'testingNode',
                query: { projectCode: res.projectCode, userName: res.userName }
              })
            }
          } else {
            this.$emit('getMessage', '1')
            this.$router.push({
              name: 'project'
            })
          }
        } else {
          this.disabled = false
          this.$message.error(res.msg)
        }
      })
    }
  }
}
</script>
<style scoped>
  .container{
    padding-bottom:30px;
  }
  .list {
    margin: auto;
    box-sizing: border-box;
     width: 350px;
    padding-top: 57px;
  }
  .lists{
    min-width:500px;
    box-sizing: border-box;
  }
  /*.el-input{*/
  /*  width:200px !important;*/
  /*}*/
  .xing{
    color:#ff0000;
    margin-right:5px;
  }


  .footer {
    margin-top:20px;
    text-align: center;
    padding-bottom: 0px;
  }
  /*.next {*/
  /*  margin-left: 80px;*/
  /*}*/
  .clear {
    margin-left: 20px;
  }
  .text {
    font-weight: bold;
    opacity: 0.85;
    color: rgba(0, 0, 0, 1);
  }
  .el-icon-question {
    color: #009688;
  }
  .table{
    margin-top:10px;
  }
  .chooseTest{
    margin-top:20px;
  }
  .biceps{
    font-size:14px;
    font-weight: bold;
    color:#000;
  }
  .el-icon-remove-outline,.el-icon-circle-plus-outline{
    font-size: 24px;
    color:#009688;
    cursor: pointer;
  }
  .paramsContent{
    display:flex;
    box-sizing: border-box;
  }
  .paramsContent:not(:last-child){
    border-bottom: 1px solid #e6ebf5;
    margin-bottom:10px;
  }
  .haveCase:not(:last-child){
    height:70px;
  }
  .haveCase:last-child{
    height:60px;
  }
  .params-btn:not(:last-child){
    height:70px;
  }
  .params-btn:last-child{
    height:60px;
  }
  .paramsContent>div{
    box-sizing: border-box;
  }
  .paramsContent>div:not(:first-child){
    width:80px;
    padding:0 10px;
  }
  .paramsContent>div:first-child{
    width:110px;
    padding-right:10px;
  }
  .paramsContent>div:last-child{
    width:70px;
    padding-left:10px;
  }
  .mychart {
     width: 500px !important;
     height: 492px !important;
     margin:auto;
   }
</style>
