<template>
  <div class="container" :style="{minHeight: height + 'px'}">
    <div class='form'>
      <span class="title">新增分组<span v-if="isSave">确认</span></span>
      <el-input
        v-model='name'
        placeholder='分组名称'
        clearable
        class='header-input'/>
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
        style="width: 100%; font-size: 16px"
        border
        :max-height="maxHeight"
        @select-all="handleSelect"
        @selection-change="handleSelectChange"
      >
        <el-table-column type="selection" label="勾选" width="60" :selectable="calSelectable">
        </el-table-column>
        <el-table-column label="用例编号" prop="code">
        </el-table-column>
        <el-table-column prop="type" label="用例类型">
        </el-table-column>
        <el-table-column prop="cmdCode" label="指令编号">
        </el-table-column>
        <el-table-column prop="name" label="用例内容">
        </el-table-column>
        <el-table-column prop="listUseCasesDetails" label="输入参数">
          <template slot-scope="scope">
            <p v-for="(item, index) in scope.row.listUseCasesDetails" :key="index">{{item.param}}</p>
          </template>
        </el-table-column>
        <el-table-column prop="listUseCasesDetails" label="参数默认值">
          <template slot-scope="scope">
            <p v-for="(item, index) in scope.row.listUseCasesDetails" :key="index">
              {{item.defaultData ? item.defaultData : '-'}}
            </p>
          </template>
        </el-table-column>
        <el-table-column prop="listUseCasesDetails" label="超时时间（s）">
          <template slot-scope="scope">
            <p v-for="(item, index) in scope.row.listUseCasesDetails" :key="index">
              {{item.timeOut ? item.timeOut : '-'}}
            </p>
          </template>
        </el-table-column>
        <el-table-column label="是否必测">
          <template slot-scope="scope">
              <span style="color:#ff0000;"
                    v-if="scope.row.isRequired == 1"
              >必测</span>
            <span
              v-else-if="scope.row.isRequired == 0"
            >可选</span>
          </template>
        </el-table-column>
      </el-table>
      <el-table
        v-show="isSave"
        stripe
        :data="getArr"
        style="width: 100%; font-size: 16px"
        border
        :max-height="maxHeight"
      >
        <el-table-column label="用例编号" prop="code">
        </el-table-column>
        <el-table-column prop="type" label="用例类型">
        </el-table-column>
        <el-table-column prop="cmdCode" label="指令编号">
        </el-table-column>
        <el-table-column prop="name" label="用例内容">
        </el-table-column>
        <el-table-column label="输入参数">
          <template slot-scope="scope">
            <p v-for="(item, index) in scope.row.listUseCasesDetails" :key="index">{{item.param}}</p>
          </template>
        </el-table-column>
        <el-table-column label="默认值">
          <template slot-scope="scope">
            <el-input style="margin-bottom:10px;" v-for="(item, index) in scope.row.listUseCasesDetails" :key="index" v-model="item.defaultData">
            </el-input>
          </template>
        </el-table-column>
        <el-table-column label="超时时间（s）">
          <template slot-scope="scope">
            <el-input style="margin-bottom:10px;" v-for="(item, index) in scope.row.listUseCasesDetails" :key="index" v-model="item.timeOut">
            </el-input>
          </template>
        </el-table-column>
        <el-table-column label="是否必测" width="120">
          <template slot-scope="scope">
              <span style="color:#ff0000;"
                    v-if="scope.row.isRequired == 1"
              >必测</span>
            <span
              v-else-if="scope.row.isRequired == 0"
            >可选</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              style="
                                color: rgba(175, 90, 0, 100);
                                font-size: 14px;
                            "
              @click="delGet(scope.$index)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="footer" >
        <el-button type="warning" v-if="!isSave" @click="saveGroup">保存</el-button>
        <el-button type="warning" v-if="isSave" @click="confirmSave">确认保存</el-button>
        <el-button type="warning" plain @click="back">取消</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import mylib from '../../api/mylib'
import { getTableData, groupAdd } from '@/api/index'
export default {
  name: 'addGroup',
  data () {
    return {
      isSave: false,
      getArr: [],
      groupArr: [],
      selectArr: [],
      maxHeight: mylib.height - 250,
      status: 0,
      name: '',
      descrie: ''
    }
  },
  methods: {
    back () {
      if (this.isSave) {
        this.isSave = false
        this.$refs.multipleTable.clearSelection()
        this.getArr = []
      } else {
        // sessionStorage.setItem('active', '1')
        history.back()
      }
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
      if (!this.descrie) {
        return this.$message('分组描述不能为空')
      }
      var listRelation = []
      var listGroupParam = []
      this.getArr.forEach((el) => {
        listRelation.push({
          useCasesCode: el.code,
          isRequired: el.isRequired
        })
        el.listUseCasesDetails.forEach((al) => {
          listGroupParam.push({
            useCasesCode: el.code,
            param: al.param,
            defaultData: al.defaultData,
            timeOut: al.timeOut
          })
        })
      })
      var params = {
        name: this.name,
        descrie: this.descrie,
        status: this.status,
        listRelation: listRelation,
        listGroupParam: listGroupParam
      }
      mylib.axios({
        url: '/useCasesGroup/add',
        type: 'json',
        params: params
      }).then((res) => {
        if (res.code == 200) {
          this.$message.success(res.msg)
          // sessionStorage.setItem('active', '1')
          this.$router.push('/index/useCase')
        } else {
          this.$message({
            type: 'error',
            message: res.msg
          })
        }
      })
    }
  },
  created () {
    mylib.getTableData().then((res) => {
      this.groupArr = res
    })
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
  .form {
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
