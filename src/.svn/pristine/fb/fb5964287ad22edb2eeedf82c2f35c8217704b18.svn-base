<template>
  <div class="container">
    <div class="list">
      <el-form :rules="rules" ref='form' :model='form' label-width='120px'>
        <el-form-item label='厂家名称：' prop="manufacturer">
          <el-input v-model='form.manufacturer'></el-input>
        </el-form-item>
        <el-form-item label='被测类型：' prop="devType">
          <el-select v-model="form.devType" placeholder="" style="width:100%;">
            <el-option label="微功率传感器" :value="0"></el-option>
            <el-option label="汇聚节点" :value="1"></el-option>
            <el-option label="低功率传感器" :value="2"></el-option>
            <el-option label="接入节点" :value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label='设备编号：' prop="deviceCode">
          <el-input v-model='form.deviceCode'></el-input>
        </el-form-item>
        <el-form-item label='设备名称：' prop="deviceTypeName">
          <el-input v-model='form.deviceTypeName'></el-input>
        </el-form-item>
        <el-form-item label='设备类型：' prop="type">
          <el-input v-model='form.type'></el-input>
        </el-form-item>
        <el-form-item label='设备型号：' prop="deviceModel">
          <el-input v-model='form.deviceModel'></el-input>
        </el-form-item>
        <el-form-item>
          <div class="footer">
            <div class='foots'>
              <el-button type='warning' class='next' @click="save('form')">保存</el-button>
              <router-link to='/index/device'>
                <el-button type='warning' plain class='clear'>取消</el-button>
              </router-link>
            </div>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import mylib from '../../api/index'
export default {
  name: 'addDevice',
  data () {
    return {
      rules: {
        manufacturer: [
          {required: true, message: '请输入厂家名称', trigger: 'blur'}
        ],
        devType: [
          {required: true, message: '请选择被测类型', trigger: 'change'}
        ],
        deviceCode: [
          {required: true, message: '请输入设备编号', trigger: 'blur'}
        ],
        deviceTypeName: [
          {required: true, message: '请输入设备名称', trigger: 'blur'}
        ],
        type: [
          {required: true, message: '请输入设备类型', trigger: 'blur'}
        ],
        deviceModel: [
          {required: true, message: '请输入设备型号', trigger: 'blur'}
        ]
      },
      form: {
        manufacturer: '',
        devType: '',
        deviceTypeName: '',
        type: '',
        deviceModel: '',
        deviceCode: '',
        id: ''
      }
    }
  },
  methods: {
    save (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          var url = ''
          var params = {}
          if (this.form.id) {
            url = '/device/edit'
            params = {
              id: this.form.id,
              deviceCode: this.form.deviceCode,
              type: this.form.type,
              deviceTypeName: this.form.deviceTypeName,
              deviceModel: this.form.deviceModel,
              manufacturer: this.form.manufacturer,
              devType: this.form.devType
            }
          } else {
            url = '/device/add'
            params = {
              deviceCode: this.form.deviceCode,
              type: this.form.type,
              deviceTypeName: this.form.deviceTypeName,
              deviceModel: this.form.deviceModel,
              manufacturer: this.form.manufacturer,
              devType: this.form.devType
            }
          }
          mylib.axios({
            url: url,
            type: 'json',
            params: params
          }).then((res) => {
            if (res.code == 200) {
              this.$message.success(res.msg)
              this.$router.push('/index/device')
            } else {
              this.$message.error(res.msg)
            }
          })
        } else {
          return false
        }
      })
    }
  },
  created () {
    if (this.$route.query.id) {
      mylib.axios({
        url: '/device/queryById',
        params: {
          id: this.$route.query.id
        }
      }).then((res) => {
        if (res.code == 200) {
          this.form = res.data
        } else {
          this.$message.error(res.msg)
        }
      })
    }
  }
}
</script>

<style scoped>
.list{width:400px;padding-top:80px;margin:auto;}
</style>
