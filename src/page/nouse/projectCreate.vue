<template>
    <!-- 创建项目 -->
    <div class='container' :style="{minHeight: height + 'px'}">

        <!-- 步骤条 -->
        <div class='step'>
            <el-steps direction='vertical' :active='active'>
                <el-step title='创建项目'></el-step>
                <el-step title='配置测试项'></el-step>
                <el-step title='确认模型'></el-step>
                <el-step title='完成'></el-step>
            </el-steps>
        </div>
        <div class='form' v-if='active == 1'>
            <el-form :rules="rules" ref='form' :model='form' label-width='120px'>
                <el-form-item label='厂家名称：' prop="manufacturer">
                    <el-input v-model='form.manufacturer'></el-input>
                </el-form-item>
                <el-form-item label='设备类型：' prop="useCasesID">
                    <el-select
                      style="width:100%;"
                        v-model='form.useCasesID'
                        placeholder=''
                        @change='selectGet'
                    >
                        <el-option
                            v-for='(item, index) in region'
                            :key='index.value'
                            :label='item.label'
                            :value='item.value'
                        ></el-option>
                    </el-select></el-form-item
                ><el-form-item label='设备名称：' prop="deviceName">
                    <el-input
                        v-model='form.deviceName'
                    ></el-input> </el-form-item
                ><el-form-item label='设备型号：' prop="deviceModel">
                    <el-input
                        v-model='form.deviceModel'
                    ></el-input> </el-form-item
                ><el-form-item label='设备数量：' prop="deviceNum">
                    <el-input
                        v-model='form.deviceNum'
                    ></el-input> </el-form-item
                ><el-form-item label='设备编号：' prop="deviceCode">
                    <el-input v-model='form.deviceCode'></el-input>
                </el-form-item>

                <el-form-item label='有效时长：' prop="duration">
                    <el-select v-model='form.duration' placeholder='' style="width:100%;">
                        <el-option label='5分钟' value='5'></el-option>
                        <el-option label='10分钟' value='10'></el-option>
                    </el-select>
                </el-form-item>
              <el-form-item>
                <div class="footer">
                  <div class='foots'>
                    <el-button type='warning' class='next' @click="next1('form')">下一步</el-button>

                    <router-link to='/index/project'
                    ><el-button type='warning' plain class='clear'
                    >取消</el-button
                    ></router-link
                    >
                  </div>
                </div>
              </el-form-item>
            </el-form>
        </div>
        <div class='forms' v-if='active == 2'>
            <div class='bindicator'>
                <span class='biceps'> 必测项</span>
                <!-- <span class='add'><i class='el-icon-plus'></i>新增</span> -->
            </div>
            <div class='table'>
                <el-table :data='mustList' style='width: 100%' border stripe>
                    <el-table-column type='index' label='序号' width='80'>
                    </el-table-column>
                    <el-table-column
                        prop='typeName'
                        label='测试分类'
                    >
                    </el-table-column>
                    <el-table-column prop='content' label='内容'>
                    </el-table-column>
                    <el-table-column
                        prop='standard'
                        label='判断标准'
                    >
                    </el-table-column>
                    <el-table-column label='有效响应时间'>
                        <template slot-scope='scope'>
                            <el-select v-model='scope.row.label'>
                                <el-option
                                    v-for='item in options'
                                    :key='item.value'
                                    :label='item.label'
                                    :value='item.value'
                                >
                                </el-option>
                            </el-select>
                        </template>
                    </el-table-column>
                </el-table>
            </div>

            <div class='chooseTest'>
                <span class='biceps'>选测项</span>
                <!-- <span class='add'><i class='el-icon-plus'></i>新增</span> -->
            </div>
            <div class='table'>
                <el-table :data='noMustList' style='width: 100%' border stripe>
                    <el-table-column type='index' label='序号' width='80'>
                    </el-table-column>
                    <el-table-column
                        prop='typeName'
                        label='测试分类'
                    >
                    </el-table-column>
                    <el-table-column prop='content' label='内容'>
                    </el-table-column>
                    <el-table-column
                        prop='standard'
                        label='判断标准'
                    >
                    </el-table-column>
                    <el-table-column label='有效响应时间'>
                        <template slot-scope='scope'>
                            <el-select v-model='scope.row.label'>
                                <el-option
                                    v-for='item in options2'
                                    :key='item.value'
                                    :label='item.label'
                                    :value='item.value'
                                >
                                </el-option>
                            </el-select>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class='footer'>
                <div class='foots'>
                    <el-button type='warning' class='next' @click='next'>下一步</el-button>
                    <el-button
                        type='warning'
                        plain
                        class='clear'
                        @click='before'>上一步</el-button>
                </div>
            </div>
        </div>
        <div class='forms' v-if='active == 3'>
            模型名称：<el-select
                v-model='type'
                placeholder=''
                style='width: 240px; margin-left: 20px'
                @change='selectChange'
            >
                <el-option
                    v-for='item in typeOption'
                    :key='item.value'
                    :label='item.label'
                    :value='item.value'

                />
            </el-select>
            <div class='table'>
                <el-table :data='tableData' style='width: 100%' border stripe>
                    <el-table-column type='index' label='序号' width='80'>
                    </el-table-column>
                    <el-table-column
                        prop='paramNameCh'
                        label='参量名称（中文）'
                    >
                    </el-table-column>
                    <el-table-column
                        prop='paramNameEn'
                        label='参量名称（英文）'
                    >
                    </el-table-column>
                    <el-table-column
                        prop='dataCode'
                        label='参数编号'
                    >
                    </el-table-column>
                    <el-table-column
                        prop='dataType'
                        label='数据类型'
                        width='180'
                    >
                    </el-table-column>
                    <el-table-column
                        prop='dataUnit'
                        label='数据单位'
                    >
                    </el-table-column>
                    <el-table-column
                        prop='decimals'
                        label='小数位数'
                    >
                    </el-table-column>
                    <!-- <el-table-column label='操作'>
                        <template slot-scope='scope'>
                            <el-button
                                @click='handleClick(scope.row)'
                                type='text'
                                size='small'
                            >
                                <router-link
                                    to='/home'
                                    style='
                                        text-decoration: none;
                                        color: #af5a00;
                                        font-size: 16px;
                                    '
                                >
                                    修改
                                </router-link>
                            </el-button>
                            <el-button
                                type='text'
                                size='small'
                                style='
                                    text-decoration: none;
                                    color: #af5a00;
                                    font-size: 16px;
                                '
                                >删除</el-button
                            >
                        </template>
                    </el-table-column> -->
                </el-table>
            </div>
            <div class='footer'>
                <div class='foots'>
                    <el-button type='warning' class='next' @click='finish'
                        >完成</el-button
                    >
                    <el-button
                        type='warning'
                        plain
                        class='clear'
                        @click='before'
                        >上一步</el-button
                    >
                </div>
            </div>
            <el-dialog
                :visible.sync='dialogVisible'
                width='30%'
                top='20%'
                center
            >
                <span class='text' v-if="id == ''"
                    ><i class='el-icon-question'></i>
                    是否确认新建测试项目？</span>
              <span class='text' v-else
              ><i class='el-icon-question'></i>
                    是否确认修改测试项目？</span>
                <span slot='footer' class='dialog-footer'
                    ><el-button type='warning' @click='confirm'
                        >确 定</el-button
                    >
                    <router-link to='/index/project'> </router-link>
                    <el-button
                        @click='dialogVisible = false'
                        type='warning'
                        plain
                        >取 消</el-button
                    >
                </span>
            </el-dialog>
        </div>
      <div style='clear: both;'></div>
    </div>
</template>

<script>
import {
  getTableData,
  useCasesDetails,
  model,
  modelDetails,
  insertProject,
  seeDeploy,
  updateProject
} from '@/api/index'
import mylib from '../../api/index'
export default {
  name: 'projectCreate',
  data () {
    return {
      id: '',
      dialogVisible: false,
      active: 1,
      type: '',
      label: '',
      // 被测类型
      typeOption: [],
      tableData: [],
      typeOptions: [],
      optionData: [],
      mustList: [],
      noMustList: [],
      settingList: [],
      options: [
        { label: '10分钟', value: '10' },
        { label: '20分钟', value: '20' },
        { label: '30分钟', value: '30' },
      ],
      options2: [
        { label: '10分钟', value: '10' },
        { label: '20分钟', value: '20' },
        { label: '30分钟', value: '30' },
      ],
      usecasesDetailsId: [],
      usecasesDetailsIdA: [],
      usecasesDetailsIdB: [],
      usecasesDetailsIdC: [],
      region: [],
      rules: {
        manufacturer: [
          {required: true, message: '请输入厂家名称', trigger: 'blur'}
        ],
        useCasesID: [
          {required: true, message: '请选择设备类型', trigger: 'change'}
        ],
        deviceName: [
          {required: true, message: '请输入设备名称', trigger: 'blur'}
        ],
        deviceModel: [
          {required: true, message: '请输入设备型号', trigger: 'blur'}
        ],
        deviceNum: [
          {required: true, message: '请输入设备数量', trigger: 'blur'}
        ],
        deviceCode: [
          {required: true, message: '请输入设备编号', trigger: 'blur'}
        ],
        duration: [
          {required: true, message: '请选择时长', trigger: 'change'}
        ]
      },
      form: {
        manufacturer: '',
        deviceName: '',
        deviceNum: '',
        deviceModel: '',
        deviceCode: '',
        useCasesID: '',
        duration: '',
        useCasesType: '',
        projectCode: ''
      }
    }
  },
  created () {
    if (this.$route.query.id) {
      this.id = this.$route.query.id
      const params = {id: this.$route.query.id}
      seeDeploy(params).then((res) => {
        res.data.projectConfig.forEach((el) => {
          if (el.isRequired == 1) {
            this.mustList.push(el)
          }
          if (el.isRequired == 0) {
            this.noMustList.push(el)
          }
        })
        this.form = res.data.project
        this.type = res.data.model.id
        this.tableData = res.data.model.listModelDetails
      })
    }
    mylib.getTableData().then((res) => {
      this.optionData = res
      for (var i = 0; i < this.optionData.length; i++) {
        var temp = {}
        temp.value = this.optionData[i].id
        temp.label = this.optionData[i].type
        this.region.push(temp)
      }
    })
    model().then((res) => {
      this.typeOptions = res
      for (var i = 0; i < this.typeOptions.length; i++) {
        var temp = {}
        temp.value = this.typeOptions[i].id
        temp.label = this.typeOptions[i].sensorTypeName
        this.typeOption.push(temp)
        if (!this.type) {
          this.type = this.typeOption[0].value
        }
      }
      this.click()
    })
  },
  mounted () {},
  methods: {
    selectGet (vId) {
      // 这个vId也就是value值
      //   console.log(ha);
      let obj = {}
      obj = this.region.find((item) => {
        // 这里的userList就是上面遍历的数据源
        return item.value === vId // 筛选出匹配数据
      })
      //   console.log(obj.value);
      this.label = obj.label
      //   console.log(obj.label);//我这边的name就是对应label的
    },

    next1 (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (!this.id) {
            const params = { useCasesId: this.form.useCasesID }
            // console.log(params);
            mylib.axios({
              url: '/useCases/queryById',
              params: params
            }).then((res) => {
              this.mustList = res.data.mustList
              this.noMustList = res.data.noMustList
              this.settingList = res.listUseCasesDetails
              this.active++
            })
          } else {
            this.active++
          }
        } else {
          return false
        }
      })
    },
    next () {
      this.active++
    },
    selectChange () {
      this.click()
    },
    click () {
      const params = { modelId: this.type }
      mylib.modelDetails(params).then((res) => {
        this.tableData = res.data
      })
    },
    before () {
      this.active--
    },
    finish () {
      this.dialogVisible = true
    },
    confirm () {
      // console.log(this.noMustList.concat(this.mustList));
      for (var i = 0; i < this.noMustList.length; i++) {
        var temp = {}
        temp.usecasesDetailsId = this.noMustList[i].id
        temp.duration = this.noMustList[i].label
        this.usecasesDetailsIdA.push(temp)
      }
      for (var i = 0; i < this.mustList.length; i++) {
        var temp = {}
        temp.usecasesDetailsId = this.mustList[i].id
        temp.duration = this.mustList[i].label
        this.usecasesDetailsIdB.push(temp)
      }
      this.usecasesDetailsIdC = this.usecasesDetailsIdA.concat(
        this.usecasesDetailsIdB
      )
      if (this.id) {
        const projectInfo = {
          projectInfo: {
            id: this.id,
            projectCode: this.form.projectCode,
            manufacturer: this.form.manufacturer,
            useCasesId: this.form.useCasesID,
            useCasesType: this.form.useCasesType,
            deviceName: this.form.deviceName,
            deviceNum: this.form.deviceNum,
            deviceCode: this.form.deviceCode,
            duration: this.form.duration,
            modelId: this.type,
            listProConfig: this.usecasesDetailsIdC,
            deviceModel: this.form.deviceModel
          }
        }
        updateProject(projectInfo).then((res) => {
          // this.dialogVisible = false;
          if (res.code == '200') {
            this.$message.success(res.msg)
            this.$router.push({
              path: '/index/project'
            })
          } else {
            this.$message.error(res.msg)
          }
        })
      } else {
        const projectInfo = {
          projectInfo: {
            manufacturer: this.form.manufacturer,
            useCasesId: this.form.useCasesID,
            useCasesType: this.label,
            deviceName: this.form.deviceName,
            deviceNum: this.form.deviceNum,
            deviceCode: this.form.deviceCode,
            duration: this.form.duration,
            modelId: this.type,
            listProConfig: this.usecasesDetailsIdC,
            deviceModel: this.form.deviceModel
          }
        }
        insertProject(projectInfo).then((res) => {
          // this.dialogVisible = false;
          if (res.code == '200') {
            this.$message.success(res.msg)
            this.$router.push({
              path: '/index/project'
            })
          } else {
            this.$message.error(res.msg)
          }
        })
      }
    }
  }
}
</script>
<style scoped>
.step {
    /* width: 740px; */
    height: 440px;
    /*padding-bottom: 30px;*/
    /* display: inline-block; */
    margin-left: 106px;
    margin-top: 67px;
    float: left;
    box-sizing: border-box;
}
.form {
    /* display: inline-block; */
    float: left;
    margin-left: 510px;
    padding-top: 67px;
  box-sizing: border-box;
    /* width: 500px; */
}
.forms {
    /* display: inline-block; */
    float: left;
    margin-left: 165px;
    /*height: 700px;*/
    margin-top: 67px;
     width: 60%;
}

.footer {
    margin-top: 20px;
    text-align: center;
    /*padding-bottom: 30px;*/
}
.foots {
    /*padding-bottom: 30px;*/
}
.next {
    margin-left: 80px;
}
.clear {
    margin-left: 20px;
}
.text {
    font-weight: bold;
    opacity: 0.85;
    color: rgba(0, 0, 0, 1);
}
.el-icon-question {
    color: #ff8400;
}
.table{
  margin-top:10px;
}
.chooseTest{
  margin-top:20px;
}
.biceps{
  font-size:14px;
  font-weight: bold;
  color:#000;
}
@media screen and (max-width: 1440px) {
  .form{
    margin-left:300px;
  }
}
</style>
