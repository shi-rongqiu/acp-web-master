<template>
  <div class="container">
    <div class="table">
      <el-table :data='optionData' style='width: 100%' border stripe>
        <el-table-column label="用例编号" prop="useCasesCode">
        </el-table-column>
        <el-table-column prop="processName" label="用例内容">
        </el-table-column>
        <el-table-column prop="processType" label="用例级别">
          <template slot-scope="scope">
            <span v-if="scope.row.processType == 0">MAC层</span>
            <span v-if="scope.row.processType == 1">net网络层</span>
            <span v-if="scope.row.processType == 2">bus业务层</span>
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
            <div v-for="(item, index) in scope.row.proConfigParamList" :key="index">{{item.param ? item.param : '-'}}</div>
          </template>
        </el-table-column>
        <el-table-column label="参数编号">
          <template slot-scope="scope">
            <div v-for="(item, index) in scope.row.proConfigParamList" :key="index">
              {{item.paramCode ? item.paramCode : '-'}}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="参数值">
          <template slot-scope="scope">
            <div v-for="(item, index) in scope.row.proConfigParamList" :key="index">
              {{item.defaultData ? item.defaultData : '-'}}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="参数单位">
          <template slot-scope="scope">
            <div v-for="(item, index) in scope.row.proConfigParamList" :key="index">
              {{item.paramUnit ? item.paramUnit : '-'}}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="参量类型">
          <template slot-scope="scope">
            <div v-for="(item, index) in scope.row.proConfigParamList" :key="index">
              <span v-if="item.paramType == -1">下限值</span>
              <span v-if="item.paramType == 0">当前值</span>
              <span v-if="item.paramType == 1">上限值</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="timeOut" label="超时">
        </el-table-column>
      </el-table>
      <div class="foot-btn">
        <el-button type="warning" plain @click="handleClick">返回</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import mylib from '../../api/index'
export default {
  name: 'seeDeploy',
  data () {
    return {
      optionData: [],
      id: null
    }
  },
  methods: {
    getParam () {
      const params = {id: this.id}
      mylib.axios({
        url: '/project/queryProjectData',
        params: params
      }).then((res) => {
        this.optionData = res.data.projectConfig
      })
    },
    handleClick () {
      history.back()
    }
  },
  created () {
    this.id = this.$route.query.id
    this.getParam()
  }
}
</script>

<style scoped>
.container{
  padding:15px 30px;
  box-sizing: border-box;
}
  .table{
    margin-top:10px;
  }
.chooseTest{
  margin-top:25px;
}
</style>
