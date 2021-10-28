<template>
    <!-- 登录页面 -->
    <div class="all">
        <div class="bg">
            <div class="font">
                <img src="../assets/image/logo1.png" alt="" class="img" />
            </div>
            <div class="login">
                <el-form
                    :model="ruleForm"
                    :rules="rules"
                    ref="ruleForm"
                >
                    <el-form-item label="" prop="pass">
                      <el-input placeholder="输入账号" class="card-width" v-model="ruleForm.pass" clearable>
                        <template slot="prepend">
                          <img src="../assets/image/admin.svg" alt="" class="img-icon">
                        </template>
                      </el-input>
                    </el-form-item>
                    <el-form-item label="" prop="checkPass">
                      <el-input placeholder="输入密码" show-password @keyup.enter.native="handleEnter('ruleForm')" class="card-width" clearable v-model="ruleForm.checkPass">
                        <template slot="prepend">
                          <img src="../assets/image/key.svg" alt="" class="img-icon">
                        </template>
                      </el-input>
                    </el-form-item>
                    <el-form-item>
                      <div class="card-width">
                        <el-checkbox v-model="checked">记住密码</el-checkbox>
                      </div>
                    </el-form-item>
                    <el-form-item>
                          <el-button
                            class="btn-log"
                              type="primary"
                              @click="submitForm('ruleForm')"
                              >登录</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
import mylib from '../api/index'
export default {
  name: 'log',
  data () {
    return {
      checked: false,
      ruleForm: {
        pass: '',
        checkPass: ''
      },
      rules: {
        pass: [
          {required: true, message: '请输入账号', trigger: 'blur'}
        ],
        checkPass: [
          {required: true, message: '请输入密码', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.checked) {
            localStorage.setItem('checked', '1')
            localStorage.setItem('password', this.ruleForm.checkPass)
            localStorage.setItem('user', this.ruleForm.pass)
          } else {
            localStorage.setItem('checked', '')
            localStorage.setItem('password', '')
            localStorage.setItem('user', '')
          }
          mylib.axios({
            url: '/sys/login',
            params: {
              userName: this.ruleForm.pass,
              password: this.ruleForm.checkPass
            }
          }).then((res) => {
            if (res.code == 200) {
              sessionStorage.setItem('token', res.data.token)
              sessionStorage.setItem('userName', this.ruleForm.pass)
              sessionStorage.setItem('password', this.ruleForm.checkPass)
              this.$message.success(res.msg)
              this.$router.push('/home')
            } else {
              this.$message.error(res.msg)
            }
          })
        } else {
          return false
        }
      })
    },
    handleEnter (formName) {
      this.submitForm(formName)
    }
  },
  created () {
    sessionStorage.setItem('active', '1')
    sessionStorage.setItem('activeIndex', '1')
    if (localStorage.getItem('checked') == 1) {
      this.checked = true
      this.ruleForm.checkPass = localStorage.getItem('password')
      this.ruleForm.pass = localStorage.getItem('user')
    }
  }
}
</script>
<style scoped>

.all {
    width: 100%;
    height: 100%;
    background-image: url(../assets/image/bg.png);
    background-repeat: no-repeat;
    background-size: 100% 100%;
    overflow: hidden;
}
.bg {
    width: 912px;
    height: 492px;
    background-image: url(../assets/image/login.png);
    background-repeat: no-repeat;
    background-size: 100% 100%;
    overflow: hidden;
    position:absolute;
    top:50%;
    left:50%;
    transform:translate(-50%,-50%);
}
.img {
    width: 286px;
    height: 62px;
    float: left;
    margin-left: 125px;
    margin-top: 200px;
}
.login {
    float: left;
    margin-left: 100px;
    margin-top: 125px;
}

.btn-log{
  width:315px;
  height:45px;
  background:#fff;
  color: #4f4178;
  text-align:center;
  font-size: 14px;
}
.card-width{
  width:315px;

}
.img-icon{
  width:24px;
  height:25px;
}
</style>
