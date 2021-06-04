<template>
  <div class="container">
    <div class="title">修改密码</div>
    <el-form :rules="rules" ref='form' :model='form' label-width='120px' class="pass-content">
      <el-form-item label='旧密码：' prop="pass">
        <el-input v-model='form.pass'></el-input>
      </el-form-item>
      <el-form-item label='新密码：' prop="newPass">
        <el-input v-model='form.newPass'></el-input>
      </el-form-item>
      <el-form-item>
        <div class="footer">
          <el-button type="warning" @click="save('form')">保存</el-button>
          <el-button type="warning" plain @click="cancel">取消</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import mylib from '../api/index'
export default {
  name: 'changePass',
  data () {
    var checkPass = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入旧密码'))
      }
      if (value != sessionStorage.getItem('password')) {
        return callback(new Error('旧密码错误'))
      }
      callback()
    }
    return {
      rules: {
        pass: [
          {required: true, validator: checkPass, trigger: 'blur'}
        ],
        newPass: [
          {required: true, message: '请输入新密码', trigger: 'blur'}
        ]
      },
      form: {
        pass: '',
        newPass: ''
      }
    }
  },
  methods: {
    save (formName) {
      this.$refs[formName].validate((val) => {
        if (val) {
          mylib.axios({
            url: '/user/updatePassword',
            type: 'json',
            params: {
              userName: sessionStorage.getItem('userName'),
              password: this.form.newPass
            }
          }).then((res) => {
            if (res.code == 200) {
              this.$message.success(res.msg)
              this.$router.push('/')
            } else {
              this.$message.error(res.msg)
            }
          })
        }
      })
    },
    cancel () {
      history.back()
    }
  }
}
</script>

<style scoped>
.title{
  color:#000;
  font-size:14px;
  font-weight: bold;
  height:22px;
  line-height:22px;
  padding-left:32px;
  padding-top:23px;
  box-sizing: border-box;
}
.pass-content{
  margin:25px auto;
  width:350px;
}
</style>
