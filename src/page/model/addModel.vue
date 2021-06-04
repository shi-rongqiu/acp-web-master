<template>
  <div class='container'>
    <div class="top">
      {{title}}模型
    </div>
    <div style="font-size: 12px;">
      <span>
        模型名称：
        <el-input
          v-model='sensorTypeName'
          clearable
          class='header-input'
        />
      </span>
      <span style="margin:0 15px;">
        模型编号：
        <el-input
          v-model='sensorTypeCode'
          clearable
          class='header-input'
        />
      </span>
      <span>
        模型型号：
        <el-input
          v-model='sensorUnitType'
          clearable
          class='header-input'
        />
      </span>
      <span style="margin:0 15px;">
        厂家名称：
        <el-input
          v-model='sensorManufacturer'
          clearable
          class='header-input'
        />
      </span>
      <span>状态：
                <el-switch
                  v-model="value"
                  :width="70"
                  :active-value="1"
                  :inactive-value="0"
                  active-text="启用"
                  inactive-text="禁用"
                  style="margin-top:-3px;"
                >
                </el-switch>
      </span>
    </div>
    <div class="table">
      <el-table :data="tableData" style="width: 100%" border stripe :max-height="maxHeight">
        <el-table-column type="index" label="序号" width="80">
        </el-table-column>
        <el-table-column
          prop="paramName_ch"
          label="参量名称（中文）"
          width="180"
        >
          <template slot-scope='scope'>
            <el-input v-model="scope.row.paramNameCh"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          prop="paramName_en"
          width="180"
          label="参量名称（英文）"
        >
          <template slot-scope='scope'>
            <el-input v-model="scope.row.paramNameEn"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="dataCode" label="参数编号">
          <template slot-scope='scope'>
            <el-input v-model="scope.row.dataCode"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="paramType" label="参量类型">
          <template slot-scope='scope'>
            <el-select v-model="scope.row.paramType">
              <el-option :value="1" label="定值"></el-option>
              <el-option :value="2" label="测量值"></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="dataLen" label="数据长度">
          <template slot-scope='scope'>
            <el-input v-model="scope.row.dataLen"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="dataFieldLen" label="数据域长度">
          <template slot-scope='scope'>
            <el-input v-model="scope.row.dataFieldLen"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="dataType" label="数据类型">
          <template slot-scope='scope'>
            <el-select v-model="scope.row.dataType">
              <el-option :value="1" label="浮点数"></el-option>
              <el-option :value="2" label="无符号整形"></el-option>
              <el-option :value="4" label="二进制数据"></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="dataUnit" label="数据单位">
          <template slot-scope='scope'>
            <el-input v-model="scope.row.dataUnit"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="decimals" label="小数位数">
          <template slot-scope='scope'>
            <el-input v-model="scope.row.decimals"></el-input>
          </template>
        </el-table-column>
        <el-table-column label='操作'>
          <template slot="header" slot-scope="scope">
            <i class="el-icon-circle-plus-outline" @click="add"></i>
          </template>
          <template slot-scope='scope'>
            <i class="el-icon-remove-outline" @click="handleDel(scope.$index, scope.row)"></i>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="footer">
      <div class="foots">
        <el-button type="warning" @click="save" :disabled="disabled">保存</el-button>
        <el-button type="warning" plain @click="handleBack">取消</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import mylib from '../../api/index'
export default {
  name: 'addModel',
  data () {
    return {
      id: '',
      value: 0,
      maxHeight: mylib.height - 300,
      title: '新增',
      sensorTypeName: '',
      sensorTypeCode: '',
      sensorUnitType: '',
      sensorManufacturer: '',
      tableData: [
        {
          paramNameCh: '',
          paramNameEn: '',
          dataCode: '',
          dataType: '',
          paramType: '',
          dataLen: '',
          dataFieldLen: '',
          dataUnit: '',
          decimals: ''
        }
      ],
      disabled: false
    }
  },
  methods: {
    handleBack () {
      this.$router.push('/index/model')
    },
    getData () {
      this.tableData = []
      const params = { modelId: this.id }
      mylib.modelDetails(params).then((res) => {
        this.tableData = res.data
      })
    },
    add () {
      this.tableData.push({
        paramNameCh: '',
        paramNameEn: '',
        dataCode: '',
        paramType: '',
        dataLen: '',
        dataFieldLen: '',
        dataType: '',
        dataUnit: '',
        decimals: ''
      })
    },
    handleDel (index, row) {
      this.tableData.splice(index, 1)
    },
    save () {
      if (!this.sensorTypeName) {
        return this.$message('模型名称不能为空')
      }
      if (!this.sensorTypeCode) {
        return this.$message('模型编号不能为空')
      }
      if (!this.sensorUnitType) {
        return this.$message('模型型号不能为空')
      }
      if (!this.sensorManufacturer) {
        return this.$message('厂家名称不能为空')
      }
      this.disabled = true
      if (this.id) {
        const param = {
          modeInfo: {
            id: this.id,
            sensorTypeCode: this.sensorTypeCode,
            sensorTypeName: this.sensorTypeName,
            sensorUnitType: this.sensorUnitType,
            sensorManufacturer: this.sensorManufacturer,
            status: this.value,
            listModelDetails: this.tableData
          }
        }
        mylib.axios({
          url: '/model/updateModel',
          type: 'json',
          params: param
        }).then((res) => {
          if (res.code == '200') {
            this.$message.success(res.msg)
            this.$router.push('/index/model')
          } else {
            this.disabled = false
            this.$message.error(res.msg)
          }
        })
      } else {
        const param = {
          modeInfo: {
            sensorTypeCode: this.sensorTypeCode,
            sensorTypeName: this.sensorTypeName,
            sensorUnitType: this.sensorUnitType,
            sensorManufacturer: this.sensorManufacturer,
            status: this.value,
            listModelDetails: this.tableData
          }
        }
        mylib.axios({
          url: '/model/insertModel',
          type: 'json',
          params: param
        }).then((res) => {
          if (res.code == '200') {
            this.$message.success(res.msg)
            this.$router.push('/index/model')
          } else {
            this.disabled = false
            this.$message.error(res.msg)
          }
        })
      }
    }
  },
  created () {
    this.id = this.$route.params.id
    if (this.id) {
      this.title = '修改'
      this.value = this.$route.params.status
      this.sensorManufacturer = this.$route.params.sensorManufacturer
      this.sensorTypeName = this.$route.params.sensorTypeName
      this.sensorTypeCode = this.$route.params.sensorTypeCode
      this.sensorUnitType = this.$route.params.sensorUnitType
      this.getData()
    }
  }
}
</script>

<style scoped>
  .container{
    padding-left:32px;
    box-sizing: border-box;
    position:relative;
  }
  .top{
    font-weight: bold;
    font-size: 14px;
    padding-top:17px;
    margin-bottom: 30px;
  }
  .table {
    font-size: 18px;
    margin-top: 25px;
    width: calc(100% - 20px);
  }
  .change-btn{
    position:absolute;
    top:70px;
    right:20px;
  }
  .foots {
    padding-bottom: 15px;
  }
  .el-icon-remove-outline,.el-icon-circle-plus-outline{
    font-size: 24px;
    color:#0076ff;
    cursor: pointer;
  }
  .header-input{
   width:150px;
    margin-right:20px;
  }
  .footer{
    width:calc(100% - 40px);
    position:absolute;
    bottom:0;
    text-align: center;
    padding-bottom: 0;
  }
</style>
