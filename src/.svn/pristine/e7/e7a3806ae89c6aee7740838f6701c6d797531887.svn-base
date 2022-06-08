<template>
  <div class="container">
    <div class='list'>
      <el-form :rules="rules" ref='form' :model='form' label-width='120px' autocomplete="off">
        <el-form-item label='用户名：' prop="userName">
          <el-input v-model='form.userName' class="header-input" :disabled="disable" clearable></el-input>
        </el-form-item>
        <el-form-item label='密码：' prop="password">
          <el-input v-model='password' class="header-input no-autofill-pwd" v-if="!form.id" disabled></el-input>
          <el-button type="warning" @click="reset" v-if="form.id">重置</el-button>
        </el-form-item>
        <el-form-item label='姓名：' prop="name">
          <el-input v-model='form.name' class="header-input"></el-input>
        </el-form-item>
        <el-form-item label='手机号：' prop="phone">
          <el-input v-model='form.phone' class="header-input"></el-input>
        </el-form-item>
        <el-form-item label='公司名称：' prop="company">
          <el-input v-model='form.company' class="header-input"></el-input>
        </el-form-item>
        <el-form-item label='角色：' prop="role">
          <el-select v-model="form.role" class="header-input">
            <el-option value="1" label="管理员"></el-option>
            <el-option value="2" label="普通用户"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label='状态：' prop="userStatus">
          <el-switch
            v-model="form.userStatus"
            :width="70"
            :active-value="1"
            :inactive-value="0"
            active-text="正常"
            inactive-text="禁用">
          </el-switch>
        </el-form-item>
        <el-form-item>
          <div class="footer">
            <div class='foots'>
              <el-button type='warning' class='next' @click="save('form')" :disabled="isSave">保存</el-button>

              <router-link to='/index/userManage'
              ><el-button type='warning' plain class='clear'
              >取消</el-button
              ></router-link
              >
            </div>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import mylib from '../../api/index'
export default{
  name: 'addUser',
  data () {
    var checkPhone = (rule, value, callback) => {
      var reg = /^1[3|4|5|6|7|8|9][0-9]{9}$/
      if (value && !reg.test(value)) {
        callback(new Error('请输入正确手机号'))
      } else {
        callback()
      }
    }
    return {
      password: '123456',
      rules: {
        userName: [
          {required: true, message: '请输入用户名', trigger: 'blur'}
        ],
        name: [
          {required: true, message: '请输入姓名', trigger: 'blur'}
        ],
        phone: [
          { validator: checkPhone, trigger: 'blur' }
        ],
        role: [
          {required: true, message: '请选择角色', trigger: 'change'}
        ]
      },
      form: {
        userName: '',
        name: '',
        phone: '',
        company: '',
        role: '',
        userStatus: 0
      },
      disable: false,
      isSave: false
    }
  },
  methods: {
    reset () {
      this.password = '123456'
      this.$message.success('密码已重置，保存后生效')
    },
    save (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          var url = ''
          var obj = null
          if (this.password) {
            obj = {
              userName: this.form.userName,
              password: this.password,
              name: this.form.name,
              phone: this.form.phone,
              company: this.form.company,
              role: this.form.role,
              userStatus: this.form.userStatus
            }
          } else {
            obj = {
              userName: this.form.userName,
              name: this.form.name,
              phone: this.form.phone,
              company: this.form.company,
              role: this.form.role,
              userStatus: this.form.userStatus
            }
          }
          if (this.form.id) {
            url = '/user/update'
          } else {
            url = '/user/insert'
          }
          this.isSave = true
          mylib.axios({
            url: url,
            type: 'json',
            params: obj
          }).then((res) => {
            if (res.code == '200') {
              this.$message.success(res.msg)
              this.$router.push('/index/userManage')
            } else {
              this.isSave = false
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
    if (this.$route.query.userName) {
      mylib.axios({
        url: '/user/queryUser',
        params: {
          userName: this.$route.query.userName
        }
      }).then((res) => {
        if (res.code == 200) {
          this.form = res.data
          this.password = ''
          this.disable = true
        }
      })
    }
  }
}
</script>

<style scoped>
  .list {
    margin: auto;
    padding-top: 67px;
    box-sizing: border-box;
    width: 460px;
  }
  .footer {
    margin-top: 20px;
    text-align: center;
    /*padding-bottom: 30px;*/
  }
  .header-input{
    width:250px;
  }

</style>
