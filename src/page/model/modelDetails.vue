<template>
    <!-- 模型管理详情 -->
    <div class="container">
        <div class="top">
            <span>模型名称：{{sensorTypeName}}</span>
            <span style="margin:0 20px;">模型编号：{{sensorTypeCode}}</span>
            <span>模型型号：{{sensorUnitType}}</span>
            <span style="margin:0 20px;">厂家名称：{{sensorManufacturer}}</span>
          <span>状态：<span class="font-status" v-if="value == 0">禁用</span><span class="font-use" v-if="value == 1">启用</span></span>
        </div>
      <div class="change-btn">
        <el-button type="warning" @click="handleChange">修改</el-button>
      </div>
        <div class="table">
            <el-table :data="tableData" style="width: 100%" border stripe>
                <el-table-column type="index" label="序号" width="80">
                </el-table-column>
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
              </el-table-column>
              <el-table-column prop="dataFieldLen" label="数据域长度">
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
        <div class="footer">
            <div class="foots">
                <el-button type="warning" plain @click="handleBack"
                        >返回</el-button
                    >
            </div>
        </div>
    </div>
</template>

<script>
import mylib from '../../api/index'
export default {
  name: 'modelDetails',
  data () {
    return {
      id: '',
      tableData: [],
      value: 0,
      sensorManufacturer: '',
      sensorTypeName: '',
      sensorTypeCode: '',
      sensorUnitType: ''
    }
  },
  created () {
    this.getData()
  },
  methods: {
    handleBack () {
      history.back()
    },
    handleChange () {
      this.$router.push({
        name: 'addModel',
        params: {id: this.id, status: this.value, sensorTypeName: this.sensorTypeName, sensorManufacturer: this.sensorManufacturer, sensorTypeCode: this.sensorTypeCode, sensorUnitType: this.sensorUnitType}
      })
    },
    getData () {
      this.id = this.$route.params.id
      const params = { modelId: this.$route.params.id }
      mylib.modelDetails(params).then((res) => {
        this.tableData = res.data
        this.value = this.$route.params.status
        this.sensorManufacturer = this.$route.params.sensorManufacturer
        this.sensorTypeName = this.$route.params.sensorTypeName
        this.sensorTypeCode = this.$route.params.sensorTypeCode
        this.sensorUnitType = this.$route.params.sensorUnitType
      })
    }
  }
}
</script>

<style scoped>
.router-link-active {
    text-decoration: none;
}
.container{
  position:relative;
}
.font{
  font-size:14px;
  font-weight: bold;
  color:#000;
}
.table {
    font-size: 18px;
    margin-left: 40px;
    margin-top: 15px;
    margin-bottom: 50px;
    width: calc(100% - 60px);
}
.top {
    width: 100%;
    padding:15px 32px;
    color: rgba(0, 0, 0, 1);
    font-size: 14px;
    font-weight: bold;
    box-sizing: border-box;
}
.foots {
    padding-bottom: 30px;
}
  .change-btn{
    position:absolute;
    top:15px;
    right:20px;
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
</style>
