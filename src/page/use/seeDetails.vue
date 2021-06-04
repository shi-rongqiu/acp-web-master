<template>
    <!-- 查看详情 -->
    <div class="container">
        <div class="top">
          <span class="font">分组名称：{{casesGroup.name}}</span>
          <div class="top-right">
            <span>状态：<span class="font-status" v-if="casesGroup.status == 0">禁用</span><span class="font-use" v-if="casesGroup.status == 1">启用</span></span>
            <el-button type="warning" @click="change">修改</el-button>
            <el-button type="warning" plain @click="back">返回</el-button>
          </div>
        </div>
      <div class="table">
        <el-table
          stripe
          :data="groupArr"
          style="width: 100%; font-size: 16px"
          border
        >
          <el-table-column type="index" label="编号">
          </el-table-column>
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
              <div v-for="(item, index) in scope.row.listGroupParam" :key="index">{{item.param ? item.param : '-'}}</div>
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
                {{item.defaultData ? item.defaultData : '-'}}
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
    </div>
</template>

<script>
import mylib from '../../api/index'
export default {
  data () {
    return {
      groupArr: [],
      id: '',
      casesGroup: {}
    }
  },
  created () {
    this.id = this.$route.query.id
    this.getData()
  },
  methods: {
    back () {
      history.back()
    },
    change () {
      this.$router.push({path: '/index/editGroup', query: {id: this.id}})
    },
    getData () {
      const params = { id: this.id }
      mylib.axios({
        url: '/useCasesGroup/listDetails',
        params: params
      }).then((res) => {
        this.groupArr = res.data.groupDetailsList
        this.casesGroup = res.data.casesGroup
      })
    }
  }
}
</script>
<style scoped>
.router-link-active {
    text-decoration: none;
}
.font{
  font-size:14px;
  font-weight: bold;
  color:#000;
  margin-left:32px;
}
.table {
    padding: 20px 15px;
    margin-bottom: 50px;
    width: 100%;
    box-sizing: border-box;
}
.top {
    width: 100%;
    height: 60px;
    padding-top: 20px;
    box-sizing: border-box;
}
.top-right{
  float:right;
  margin-right:15px;
  font-size:14px;
  font-weight: bold;
  color:#000;
}
.font-status{
  font-weight: normal;
  font-size:12px;
  margin-right:10px;
}
.font-use{
  font-weight: normal;
  font-size:12px;
  margin-right:10px;
  color:#2ebd2b;
}
.bindicator {
    width: 100%;
}
.biceps {
    margin-left: 42px;
    font-family: MicrosoftYaHei-Bold;
    color: rgba(0, 0, 0, 1);
    font-size: 18px;
    float: left;
}
.add {
    float: right;
    width: 60px;
    height: 25px;
    border-radius: 12px;
    background-color: rgba(255, 255, 255, 1);
    border: 1px solid rgba(255, 132, 0, 1);
    color: rgba(255, 132, 0, 100);
    margin-right:20px;
}
.foots {
    padding-bottom: 30px;
}
</style>
