<template>
  <div class="container">
    <div class="title">{{project.deviceName}}测试报告</div>
    <div class="upload">
      <a :href="'http://' + url + '/' + attachment.fileName" class="upload-btn">下载</a>
      <el-button type="warning" plain @click="handleClick">返回</el-button>
    </div>
    <div>
      <div class="content-title">检测结果</div>
      <div class="content">
        <p><span v-if="project.status == 0" style="color:#ff0a0a">不合格</span><span v-if="project.status == 1" style="color:#2ebd2b;">合格</span></p>
      </div>
    </div>
    <div>
      <div class="content-title">项目信息</div>
      <div class="content">
        <p>厂家名称：{{project.manufacturer}}</p>
        <p>被测类型：{{project.useCasesType}}</p>
        <p>被测名称：{{project.deviceName}}</p>
        <p>型&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号：{{project.deviceModel}}</p>
        <p>设备编号：{{project.deviceCode}}</p>
        <p>设备数量：{{project.deviceNum}}</p>
        <p>创建时间：{{project.createTime}}</p>
      </div>
    </div>
    <div>
      <div class="content-title">项目测试报告</div>
      <el-table :data='projectConfig' style='width: 100%' border stripe>
        <el-table-column prop="processName" label="用例内容" width="280">
        </el-table-column>
        <el-table-column label="用例编号" prop="useCasesCode">
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
        <el-table-column prop="processStatus" label="测试状态">
          <template slot-scope="scope">
            <span v-if="scope.row.processStatus == 0">等待中</span>
            <span v-if="scope.row.processStatus == 1">检测通过</span>
            <span v-if="scope.row.processStatus == 2">检测中</span>
            <span v-if="scope.row.processStatus == 3">检测不通过</span>
          </template>
        </el-table-column>
        <el-table-column prop="rstDescibe" label="原因">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import mylib from '../../api/index'
export default {
  name: 'report',
  data () {
    return {
      url: mylib.URL,
      attachment: {
        fileName: ''
      },
      project: {
        manufacturer: '',
        useCasesType: '',
        deviceName: '',
        deviceModel: '',
        deviceCode: '',
        deviceNum: '',
        createTime: ''
      },
      projectConfig: [],
      model: {}
    }
  },
  methods: {
    handleClick () {
      history.back()
    }
  },
  created () {
    const params = {id: this.$route.query.id}
    mylib.axios({
      url: '/project/projectReport',
      params: params
    }).then((res) => {
      this.attachment = res.data.attachment
      this.project = res.data.project
      this.projectConfig = res.data.projectConfig
      this.model = res.data.model
    })
  }
}
</script>

<style scoped>
  .container{
    padding:0 50px 20px 150px;
    box-sizing: border-box;
  }
  .title{
    font-size:18px;
    font-weight: bold;
    text-align: center;
    line-height:60px;
  }
  .upload{
    float:right;
    margin-right:20px;
  }
  .content-title{
    font-size:16px;
    font-weight: bold;
    margin-top:60px;
    margin-bottom:20px;
  }
  .upload-btn{
    display:inline-block;
    width:65px;
    height:32px;
    line-height:32px;
    text-align: center;
    font-size:14px;
    color:#fff;
    background:#ff8400;
    border-radius: 2px;
    text-decoration: none;
  }
</style>
