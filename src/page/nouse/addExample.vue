<template>
  <div class="container" :style="{minHeight: height + 'px'}">
    <div class='form'>
      <span class="title">新增用例</span>
      <el-input
        v-model='code'
        placeholder='用例编号'
        clearable
        class='header-input'/>
      <el-select
        v-model='type'
        placeholder='用例类型'
        clearable
        class='header-input'>
        <el-option label="MAC层" value="MAC层"></el-option>
        <el-option label="网络层" value="网络层"></el-option>
        <el-option label="业务层" value="业务层"></el-option>
      </el-select>
      <el-input placeholder="指令编号" v-model="cmdCode" clearable class='header-input'></el-input>
      <el-input placeholder="用例内容" v-model="name" clearable class='header-input'></el-input>
      <div class="add-btn">
        <span class="title">是否必测</span>
        <el-switch
          v-model="isRequired"
          :width="70"
          :active-value="1"
          :inactive-value="0"
          active-text="是"
          inactive-text="否"
        >
        </el-switch>
        <el-button type="warning" @click="addParams">添加参数</el-button>
      </div>
    </div>
    <div class="table">
      <el-table
        stripe
        :data="tableData"
        style="width: 100%; font-size: 16px"
        border
        :max-height="maxHeight"
      >
        <el-table-column prop="address" label="输入参数">
          <template slot-scope="scope">
            <el-input v-model="scope.row.param"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="参数默认值">
          <template slot-scope="scope">
            <el-input v-model="scope.row.defaultData"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="超时时间（s）">
          <template slot-scope="scope">
            <el-input v-model="scope.row.timeOut"></el-input>
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
              @click="del(scope.$index)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="footer" >
        <el-button type="warning" @click="save">保存</el-button>
        <el-button type="warning" plain @click="back">取消</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import mylib from '../../api/mylib'
import {addUse} from '@/api/index'
export default {
  name: 'addExample',
  data () {
    return {
      tableData: [{
        param: '',
        defaultData: '',
        timeOut: ''
      }],
      maxHeight: mylib.height - 250,
      code: '',
      name: '',
      type: '',
      cmdCode: '',
      isRequired: 0
    }
  },
  methods: {
    back () {
      sessionStorage.setItem('active', '2')
      history.back()
    },
    del (index) {
      this.tableData.splice(index, 1)
    },
    save () {
      if (!this.code) {
        return this.$message('用例编号不能为空')
      }
      if (!this.type) {
        return this.$message('用例类型不能为空')
      }
      if (!this.cmdCode) {
        return this.$message('指令编号不能为空')
      }
      if (!this.name) {
        return this.$message('用例内容不能为空')
      }
      var params = {
        name: this.name,
        type: this.type,
        code: this.code,
        cmdCode: this.cmdCode,
        isRequired: this.isRequired,
        listUseCasesDetails: this.tableData
      }
      mylib.axios({
        url: '/useCases/insert',
        type: 'json',
        params: params
      }).then((res) => {
        if (res.code == 200) {
          this.$message.success(res.msg)
          sessionStorage.setItem('active', '2')
          this.$router.push('/index/useCase')
        } else {
          this.$message({
            type: 'error',
            message: res.msg
          })
        }
      })
    },
    addParams () {
      this.tableData.push(
        {
          param: '',
          defaultData: '',
          timeOut: ''
        }
      )
    }
  },
  created () {
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
