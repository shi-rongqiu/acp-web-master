<template>
  <div class="container">
    <div class="top">
      <span class="font">分组名称：{{casesGroup.name}}</span>
      <span class="font">设备类型：
        <span v-if="casesGroup.devType == 0">微功率传感器</span>
        <span v-if="casesGroup.devType == 1">汇聚节点</span>
        <span v-if="casesGroup.devType == 2">低功率传感器</span>
        <span v-if="casesGroup.devType == 3">接入节点</span>
      </span>
      <span class="font">描述：{{casesGroup.descrie}}</span>
      <div class="top-right">
        <span>状态：<el-switch
          v-model="casesGroup.status"
          :width="70"
          :active-value="1"
          :inactive-value="0"
          active-text="启用"
          inactive-text="禁用"
        >
      </el-switch></span>
        <el-button type="warning" @click="addExample">添加用例</el-button>
      </div>
    </div>
    <div class="table">
      <el-table
        stripe
        :data="getArr"
        style="width: 99%; font-size: 16px"
        border
        :max-height="maxHeight"
      >
        <el-table-column label="用例编号" prop="useCasesCode">
        </el-table-column>
        <el-table-column prop="useCasesName" label="用例内容">
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
        <el-table-column label="输入参数">
          <template slot-scope="scope">
            <div v-for="(item, index) in scope.row.listGroupParam" :key="index">
              {{item.param ? item.param : '-'}}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="参数编号">
          <template slot-scope="scope">
            <div v-for="(item, index) in scope.row.listGroupParam" :key="index">
              {{item.paramCode ? item.paramCode : '-'}}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="参数值">
          <template slot-scope="scope">
            <div v-for="(item, index) in scope.row.listGroupParam" :key="index">
              <el-input v-if="item.param" v-model="item.defaultData"></el-input>
              <div v-if="!item.param">-</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="参数单位">
          <template slot-scope="scope">
            <div v-for="(item, index) in scope.row.listGroupParam" :key="index">
              {{item.paramUnit ? item.paramUnit : '-'}}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="参量类型">
          <template slot-scope="scope">
            <div v-for="(item, index) in scope.row.listGroupParam" :key="index">
              <el-select v-if="item.param" v-model="item.paramType">
                <el-option :value="-1" label="下限值"></el-option>
                <el-option :value="0" label="当前值"></el-option>
                <el-option :value="1" label="上限值"></el-option>
              </el-select>
              <div v-if="!item.param">-</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="timeout" label="超时">
          <template slot-scope="scope">
            <el-input v-model="scope.row.timeout"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              @click="del(scope.row, scope.$index)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="footer">
      <el-button type="warning" @click="saveChange" :disabled="disabled">保存</el-button>
      <el-button type="warning" plain @click="back">取消</el-button>
    </div>
    <el-dialog class="addDialog" :visible.sync="dialogTableVisible" :show-close="false" width="85%" top="80px">
      <div class="top">
        <span class="font">设备类型：
        <span v-if="casesGroup.devType == 0">微功率传感器</span>
        <span v-if="casesGroup.devType == 1">汇聚节点</span>
        <span v-if="casesGroup.devType == 2">低功率传感器</span>
        <span v-if="casesGroup.devType == 3">接入节点</span>
      </span>
      </div>
      <div style="padding-bottom:50px;">
        <el-table
          stripe
          :data="groupArr"
          style="width: 99%; font-size: 16px;"
          border
          ref="multipleTable"
          :max-height="maxHeight"
          @select-all="handleSelect"
          @selection-change="handleSelectChange"
        >
          <el-table-column type="selection" label="勾选" width="60">
          </el-table-column>
          <el-table-column label="设备类型" prop="devType">
            <template slot-scope="scope">
              <span v-if="scope.row.devType == 0">微功率传感器</span>
              <span v-if="scope.row.devType == 1">汇聚节点</span>
              <span v-if="scope.row.devType == 2">低功率传感器</span>
              <span v-if="scope.row.devType == 3">接入节点</span>
            </template>
          </el-table-column>
          <el-table-column label="用例编号" prop="caseCode">
          </el-table-column>
          <el-table-column prop="caseContent" label="用例内容">
          </el-table-column>
          <el-table-column prop="level" label="用例级别">
            <template slot-scope="scope">
              <span v-if="scope.row.level == 0">MAC层</span>
              <span v-if="scope.row.level == 1">net网络层</span>
              <span v-if="scope.row.level == 2">bus业务层</span>
            </template>
          </el-table-column>
          <el-table-column prop="caseClassify" label="用例类型">
            <template slot-scope="scope">
              <span v-if="scope.row.caseClassify == 0">普通</span>
              <span v-if="scope.row.caseClassify == 1">通用</span>
              <span v-if="scope.row.caseClassify == 2">告警</span>
            </template>
          </el-table-column>
          <el-table-column prop="preTestCase" label="前驱用例">
          </el-table-column>
          <el-table-column label="输入参数">
            <template slot-scope="scope">
              <div v-for="(item, index) in scope.row.params" :key="index">{{item.paramName ? item.paramName : '-'}}</div>
            </template>
          </el-table-column>
          <el-table-column label="参数编号">
            <template slot-scope="scope">
              <div v-for="(item, index) in scope.row.params" :key="index">
                {{item.paramCode ? item.paramCode : '-'}}
              </div>
            </template>
          </el-table-column>
          <el-table-column label="参数值">
            <template slot-scope="scope">
              <div v-for="(item, index) in scope.row.params" :key="index">
                {{item.paramValue ? item.paramValue : '-'}}
              </div>
            </template>
          </el-table-column>
          <el-table-column label="参数单位">
            <template slot-scope="scope">
              <div v-for="(item, index) in scope.row.params" :key="index">
                {{item.paramUnit ? item.paramUnit : '-'}}
              </div>
            </template>
          </el-table-column>
          <el-table-column label="参量类型">
            <template slot-scope="scope">
              <div v-for="(item, index) in scope.row.params" :key="index">
                <span v-if="item.paramType == -1">下限值</span>
                <span v-if="item.paramType == 0">当前值</span>
                <span v-if="item.paramType == 1">上限值</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="timeout" label="超时">
          </el-table-column>
        </el-table>
      </div>
      <div class="footer">
        <el-button type="warning" @click="addChange">添加</el-button>
        <el-button type="warning" plain @click="cancel">取消</el-button>
      </div>
    </el-dialog>
    <el-dialog
      :visible.sync='dialogVisible'
      width='30%'
      top='20%'
      center
      :show-close="false"
      class="dialog"
    >
      <div class="dialog-context">
        <img src="../../assets/image/wen-icon.svg" alt="" style="vertical-align: middle;">
        是否确认删除“{{useCasesCode}} {{useCasesType}}”？
      </div>
      <span slot='footer' class='dialog-footer'
      ><el-button type='warning' @click='confirm'
      >确 定</el-button
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
import mylib from '../../api/index'
export default {
  name: 'addGroup',
  data () {
    return {
      id: '',
      getArr: [],
      groupArr: [],
      selectArr: [],
      maxHeight: mylib.height - 250,
      value: 0,
      dialogTableVisible: false,
      dialogVisible: false,
      casesGroup: {},
      websock: null, // websocket
      index: null,
      useCasesCode: '',
      useCasesType: '',
      useCasesGroupId: '',
      disabled: false
    }
  },
  methods: {
    // websocket获取数据
    WebSocketSet () {
      if ('WebSocket' in window) {
        const wsuri = 'ws://' + mylib.URL + '/websocket/' + sessionStorage.getItem('userName')
        this.websock = new WebSocket(wsuri)
        this.websock.onmessage = (res => {
          let rst = JSON.parse(res.data)
          this.groupArr = rst.data.param.cases
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
    back () {
      this.$router.push('/index/useCase')
    },
    handleSelect (selection) {
      this.selectArr = selection
    },
    handleSelectChange (selection) {
      this.selectArr = selection
    },
    // 修改添加用例
    addExample () {
      this.dialogTableVisible = true
      mylib.axios({
        url: '/useCasesGroup/queryCases',
        params: {
          devType: this.casesGroup.devType
        }
      }).then((res) => {
        if (res.code == 200) {
          this.WebSocketSet()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    confirm () {
      this.getArr.splice(this.index, 1)
      this.dialogVisible = false
    },
    del (row, index) {
      if (row.useCasesGroupId) {
        this.dialogVisible = true
        this.index = index
        this.useCasesCode = row.useCasesCode
        this.useCasesGroupId = row.useCasesGroupId
        this.useCasesType = row.useCasesType
      } else {
        this.getArr.splice(index, 1)
      }
    },
    // 修改保存
    saveChange () {
      for (var i = 0; i < this.getArr.length; i++) {
        var el = this.getArr[i]
        if (el.params) {
          for (var j = 0; j < el.params.length; j++) {
            var al = el.params[j]
            if (al.paramValue == '' || al.paramValue == null || al.paramValue == 'undefined') {
              return this.$message('存在参数值为空')
            }
          }
        }
        if (!el.timeout) {
          return this.$message('存在超时时间为空')
        }
      }
      var listRelation = []
      var listGroupParam = []
      this.getArr.forEach((el) => {
        listRelation.push({
          relationId: el.relationId,
          useCasesCode: el.useCasesCode,
          timeout: +el.timeout,
          priority: el.priority,
          useCasesName: el.useCasesName,
          useCasesType: el.useCasesType,
          caseClassify: el.caseClassify
        })
        if (el.listGroupParam) {
          el.listGroupParam.forEach((al) => {
            listGroupParam.push({
              detailsParamId: al.detailsParamId,
              useCasesCode: al.useCasesCode || el.caseCode,
              paramId: al.paramId,
              param: al.param,
              defaultData: al.defaultData,
              paramCode: al.paramCode,
              paramUnit: al.paramUnit,
              paramType: al.paramType
            })
          })
        }
      })
      var params = {
        id: this.id,
        name: this.casesGroup.name,
        devType: this.casesGroup.devType,
        descrie: this.casesGroup.descrie,
        status: this.casesGroup.status,
        listRelation: listRelation,
        listGroupParam: listGroupParam
      }
      this.disabled = true
      mylib.axios({
        url: '/useCasesGroup/edit',
        type: 'json',
        params: params
      }).then((res) => {
        if (res.code == 200) {
          this.$message.success(res.msg)
          this.$router.push('/index/useCase')
        } else {
          this.disabled = false
          this.$message({
            type: 'error',
            message: res.msg
          })
        }
      })
    },
    // search () {
    //   var params = {
    //     key: this.key
    //   }
    //   mylib.getTableData(params).then((res) => {
    //     this.groupArr = res
    //   })
    // },
    addChange () {
      this.selectArr.forEach((el, index) => {
        el.useCasesCode = el.caseCode
        el.useCasesType = el.level
        el.useCasesName = el.caseContent
        el.priority = el.preTestCase
        if (el.params) {
          el.params.forEach((al) => {
            var arr = []
            arr.push({
              param: al.paramName,
              paramCode: al.paramCode,
              defaultData: al.paramValue,
              paramId: al.paramId,
              paramUnit: al.paramUnit,
              paramType: al.paramType
            })
            el.listGroupParam = arr
          })
        }
      })
      this.getArr = this.getArr.concat(this.selectArr)
      for (var i = 0; i < this.getArr.length; i++) {
        for (var j = i + 1; j < this.getArr.length; j++) {
          if (this.getArr[i].useCasesCode == this.getArr[j].useCasesCode) {
            this.getArr.splice(j, 1)
            j--
          }
        }
      }
      this.dialogTableVisible = false
    },
    cancel () {
      this.dialogTableVisible = false
      this.$refs.multipleTable.clearSelection()
      this.selectArr = []
    },
    getData () {
      const params = { id: this.id }
      mylib.axios({
        url: '/useCasesGroup/listDetails',
        params: params
      }).then((res) => {
        this.getArr = res.data.groupDetailsList
        this.casesGroup = res.data.casesGroup
      })
    }
  },
  destroyed () {
    this.websock.close()
  },
  created () {
    this.WebSocketSet()
    this.id = this.$route.query.id
    this.getData()
  }
}
</script>

<style scoped>
  .container{
    position:relative;
  }
  .header-input{
    width:180px;
    margin-right:20px;
  }
  .table {
    padding: 15px 15px;
    width:100%;
    font-size: 16px;
    box-sizing: border-box;
  }
  .footer{
    position:absolute;
    bottom:0;
    left:50%;
    transform: translateX(-50%);
  }
  .font{
    font-size:14px;
    font-weight: bold;
    color:#000;
    margin-left:32px;
  }
  .top {
    width: 100%;
    height: 55px;
    line-height:55px;
    box-sizing: border-box;
  }
  .top-right{
    float:right;
    margin-right:15px;
    font-size:14px;
    font-weight: bold;
    color:#000;
  }
  .el-icon-question {
    color: #ff8400;
  }
</style>

