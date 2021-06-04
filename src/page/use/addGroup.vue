<template>
  <div class="container">
    <div class='list'>
      <span class="title">新增分组<span v-if="isSave">确认</span></span>
      <el-input
        v-model='name'
        placeholder='分组名称'
        clearable
        class='header-input'/>
      <el-select v-model="devType" @change="handleChange" placeholder="设备类型" class='header-input'>
        <el-option label="微功率传感器" :value="0"></el-option>
        <el-option label="汇聚节点" :value="1"></el-option>
        <el-option label="低功率传感器" :value="2"></el-option>
        <el-option label="接入节点" :value="3"></el-option>
      </el-select>
      <el-input class='header-input' placeholder="分组描述" v-model="descrie"></el-input>
      <span class="title" style="margin-right:0;margin-left:10px;">状态：</span>
      <el-switch
        v-model="status"
        :width="70"
        :active-value="1"
        :inactive-value="0"
        active-text="启用"
        inactive-text="禁用"
      >
      </el-switch>
      <el-button type="warning" class="add-btn" v-if="isSave" @click="change">添加用例</el-button>
    </div>
    <div class="table">
      <el-table
        v-show="!isSave"
        stripe
        :data="groupArr"
        ref="multipleTable"
        style="width: 99%; font-size: 16px"
        border
        :max-height="maxHeight"
        @select-all="handleSelect"
        @selection-change="handleSelectChange"
      >
        <el-table-column type="selection" label="勾选" width="60" :selectable="calSelectable">
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
      <el-table
        v-show="isSave"
        stripe
        :data="getArr"
        style="width: 99%; font-size: 16px"
        border
        :max-height="maxHeight"
      >
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
            <el-input style="margin-bottom:5px;" v-for="(item, index) in scope.row.params" :key="index" v-model="item.paramValue"></el-input>
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
            <el-select v-for="(item, index) in scope.row.params" style="margin-bottom:5px;" :key="index" v-model="item.paramType">
              <el-option :value="-1" label="下限值"></el-option>
              <el-option :value="0" label="当前值"></el-option>
              <el-option :value="1" label="上限值"></el-option>
            </el-select>
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
              @click="delGet(scope.$index)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="footer" >
        <el-button type="warning" v-if="!isSave" @click="saveGroup">保存</el-button>
        <el-button type="warning" v-if="isSave" @click="confirmSave" :disabled="disabled">确认保存</el-button>
        <el-button type="warning" plain @click="back">取消</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import mylib from '../../api/index'
export default {
  name: 'addGroup',
  data () {
    return {
      isSave: false,
      getArr: [],
      groupArr: [],
      selectArr: [],
      maxHeight: mylib.height - 250,
      status: 1,
      name: '',
      devType: null,
      descrie: '',
      disabled: false,
      websock: null // websocket
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
          console.log(rst)
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
      if (this.isSave) {
        this.isSave = false
        this.$refs.multipleTable.clearSelection()
        this.getArr = []
      } else {
        history.back()
      }
    },
    handleChange () {
      mylib.axios({
        url: '/useCasesGroup/queryCases',
        params: {
          devType: this.devType
        }
      }).then((res) => {
        if (res.code == 200) {
          this.WebSocketSet()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    handleSelect (selection) {
      this.selectArr = selection
    },
    handleSelectChange (selection) {
      this.selectArr = selection
    },
    // 删除勾选分组
    delGet (index) {
      this.getArr.splice(index, 1)
    },
    calSelectable (row, index) {
      if (this.getArr.includes(row)) {
        return false
      } else {
        return true
      }
    },
    // 新增分组保存
    saveGroup () {
      this.isSave = true
      this.getArr = this.getArr.concat(this.selectArr)
    },
    // 新增添加用例
    change () {
      this.isSave = false
      this.$refs.multipleTable.clearSelection()
    },
    // 新增保存确认
    confirmSave () {
      if (!this.name) {
        return this.$message('分组名称不能为空')
      }
      if (this.devType == null) {
        return this.$message('设备类型不能为空')
      }
      if (!this.descrie) {
        return this.$message('分组描述不能为空')
      }

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
          useCasesCode: el.caseCode,
          timeout: +el.timeout,
          priority: el.preTestCase,
          useCasesName: el.caseContent,
          useCasesType: el.level,
          caseClassify: el.caseClassify
        })
        if (el.params) {
          el.params.forEach((al) => {
            listGroupParam.push({
              useCasesCode: el.caseCode,
              paramId: al.paramId,
              param: al.paramName,
              defaultData: al.paramValue,
              paramCode: al.paramCode,
              paramUnit: al.paramUnit,
              paramType: al.paramType
            })
          })
        }
      })


      var params = {
        name: this.name,
        descrie: this.descrie,
        devType: this.devType,
        status: this.status,
        listRelation: listRelation,
        listGroupParam: listGroupParam
      }
      this.disabled = true
      mylib.axios({
        url: '/useCasesGroup/add',
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
    }
  },
  destroyed () {
    this.websock.close()
  },
  created () {
    this.WebSocketSet()
  }
}
</script>

<style scoped>
  .container{
    position:relative;
  }
  .title{
    font-size: 14px;
    color:#000;
    font-weight: bold;
    margin-right:10px;
  }
  .table {
    padding: 15px 15px;
    width:100%;
    font-size: 16px;
    box-sizing: border-box;
  }
  .list {
    box-shadow: 0px 2px 4px 0px #d7ddf7;
    height: 55px;
    width: 100%;
    background:#fff;
    margin-bottom:2px;
    padding-top: 13px;
    padding-left: 15px;
    box-sizing: border-box;
  }
  .header-input{
    width:180px;
    margin-right:20px;
  }
  .footer{
    position:absolute;
    bottom:0;
    left:50%;
    transform: translateX(-50%);
  }
  .add-btn{
    float:right;
    margin-right:15px;
  }
</style>
