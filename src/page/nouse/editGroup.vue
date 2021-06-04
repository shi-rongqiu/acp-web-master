<template>
  <div class="container" :style="{minHeight: height + 'px'}">
    <div class="top">
      <span class="font">分组名称：{{casesGroup.name}}</span>
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
            <p v-for="(item, index) in scope.row.listGroupParam" :key="index">{{item.param}}</p>
          </template>
        </el-table-column>
        <el-table-column label="默认值">
          <template slot-scope="scope">
            <el-input style="margin-bottom:10px;" v-for="(item, index) in scope.row.listGroupParam" :key="index" v-model="item.defaultData">
            </el-input>
          </template>
        </el-table-column>
        <el-table-column label="超时时间（s）">
          <template slot-scope="scope">
            <el-input style="margin-bottom:10px;" v-for="(item, index) in scope.row.listGroupParam" :key="index" v-model="item.timeOut">
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
              @click="del(scope.row, scope.$index)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="footer">
      <el-button type="warning" @click="saveChange">保存</el-button>
      <el-button type="warning" plain @click="back">取消</el-button>
    </div>
    <el-dialog class="addDialog" :visible.sync="dialogTableVisible" :show-close="false" width="85%" top="80px">
      <div class="top">
        <span>勾选添加用例</span>
        <el-input class="header-input" v-model="key"></el-input>
        <el-button type="warning" @click="search">搜索</el-button>
      </div>
      <div style="padding-bottom:50px;">
        <el-table
          stripe
          :data="groupArr"
          style="width: 100%; font-size: 16px;"
          border
          ref="multipleTable"
          :max-height="maxHeight"
          @select-all="handleSelect"
          @selection-change="handleSelectChange"
        >
          <el-table-column type="selection" label="勾选" width="60">
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
          <el-table-column prop="isRequired" label="是否必测">
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
      </div>
      <div class="footer">
        <el-button type="warning" @click="addChange">添加</el-button>
        <el-button type="warning" plain @click="cancel">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import mylib from '../../api/mylib'
import { groupDetail, getTableData, groupDelUse, groupUpdate } from '@/api/index'
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
      key: ''
    }
  },
  methods: {
    back () {
      // sessionStorage.setItem('active', '1')
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
      mylib.getTableData().then((res) => {
        this.groupArr = res
      })
    },
    del (row, index) {
      if (row.useCasesGroupId) {
        this.$confirm('是否删除该用例?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var params = {
            useCasesCode: row.code,
            useCasesGroupId: row.useCasesGroupId
          }
          mylib.axios({
            url: '/useCasesGroup/delGroupCases',
            params: params
          }).then((res) => {
            if (res.code == 200) {
              this.$message({
                type: 'success',
                message: res.msg
              })
              this.getArr.splice(index, 1)
            } else {
              this.$message({
                type: 'error',
                message: res.msg
              })
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      } else {
        this.getArr.splice(index, 1)
      }
    },
    // 修改保存
    saveChange () {
      var listRelation = []
      var listGroupParam = []
      this.getArr.forEach((el) => {
        listRelation.push({
          relationId: el.relationId,
          useCasesCode: el.code,
          isRequired: el.isRequired
        })
        el.listGroupParam.forEach((al) => {
          listGroupParam.push({
            detailsParamId: al.detailsParamId,
            useCasesCode: al.useCasesCode || el.code,
            param: al.param,
            defaultData: al.defaultData,
            timeOut: al.timeOut
          })
        })
      })
      var params = {
        id: this.id,
        name: this.casesGroup.name,
        descrie: this.casesGroup.descrie,
        status: this.casesGroup.status,
        listRelation: listRelation,
        listGroupParam: listGroupParam
      }
      mylib.axios({
        url: '/useCasesGroup/edit',
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
    },
    search () {
      var params = {
        key: this.key
      }
      mylib.getTableData(params).then((res) => {
        this.groupArr = res
      })
    },
    addChange () {
      this.selectArr.forEach((el, index) => {
        el.listGroupParam = el.listUseCasesDetails
      })
      this.getArr = this.getArr.concat(this.selectArr)
      for (var i = 0; i < this.getArr.length; i++) {
        for (var j = i + 1; j < this.getArr.length; j++){
          if (this.getArr[i].code == this.getArr[j].code) {
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
      groupDetail(params).then((res) => {
        this.getArr = res.data.groupDetailsList
        this.casesGroup = res.data.casesGroup
      })
    }
  },
  created () {
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

