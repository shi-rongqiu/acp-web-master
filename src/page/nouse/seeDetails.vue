<template>
    <!-- 查看详情 -->
    <div class="container" :style="{minHeight: height + 'px'}">
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
          <el-table-column label="参数默认值">
            <template slot-scope="scope">
              <p v-for="(item, index) in scope.row.listGroupParam" :key="index">
                {{item.defaultData ? item.defaultData : '-'}}
              </p>
            </template>
          </el-table-column>
          <el-table-column label="超时时间（s）">
            <template slot-scope="scope">
              <p v-for="(item, index) in scope.row.listGroupParam" :key="index">
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
    </div>
</template>

<script>
import { groupDetail } from '@/api/index'
import mylib from '../../api/mylib'
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
      groupDetail(params).then((res) => {
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
