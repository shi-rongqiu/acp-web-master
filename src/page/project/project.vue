<template>
<div class="container">
    <div class="form">
            <el-input
                v-model='manufacturer'
                placeholder='厂家名称'
                clearable
                class='header-input'
            />
            <el-select
                v-model='type'
                placeholder='被测类型'
                clearable
                class='header-input'
            >
            <el-option v-for="(item, index) in typeOption" :key=index :label=item.label :value=item.value></el-option>
            </el-select>
            <el-select
                v-model='status'
                placeholder='状态'
                clearable
                class='header-input'
            >
                <el-option
                    v-for='item in options'
                    :key='item.value'
                    :label='item.label'
                    :value='item.value'
                    align='center'
                />
            </el-select>
            <el-input
                v-model='deviceName'
                placeholder='被测名称'
                class='header-input'
                clearable
            />
            <el-input
                v-model='useCasesType'
                placeholder='被测型号'
                class='header-input'
                clearable
            />
            <el-date-picker
              class='header-date'
                v-model='value2'
                type='datetimerange'
                :picker-options='pickerOptions'
                range-separator='→'
                start-placeholder='开始日期'
                end-placeholder='结束日期'
                align='center'
                value-format='yyyy-MM-dd HH:mm:ss'
            >
            </el-date-picker>

            <el-button type='warning' @click='search'>搜索</el-button>
            <el-button type='warning' @click='fromline' plain
                >重置</el-button
            >
    </div>
    <div class="container-content">
        <div class='ad'>
          <div @click="add" style="margin-right:20px;" class="btn">
            <div><img src="../../assets/image/add-icon.svg" alt=""></div>
            <div>新增</div>
          </div>
        </div>

        <el-table
            :data='tableData'
            stripe
            :max-height="height"
            style='
                width: 100%;
                margin-left: 20px;
                width: 98%;
                font-size: 16px;
            '
            border
        >
            <el-table-column type='index' label='序号' width='70' :index="indexMethod">
            </el-table-column>
            <el-table-column
                prop='projectName'
                label='项目名称'
            >
            </el-table-column>
            <el-table-column
                prop='manufacturer'
                label='厂家名称'
            >
            </el-table-column>
            <el-table-column
                prop='useCasesType'
                label='被测类型'
                width="120"
            >
            </el-table-column>
            <el-table-column prop='deviceName' label='被测名称'>
            </el-table-column>
            <el-table-column prop='deviceModel' label='型号' width="120">
            </el-table-column>
            <el-table-column prop='deviceCode' label='编号'>
            </el-table-column>
            <el-table-column prop='createTime' label='时间' width='180'>
            </el-table-column>
            <el-table-column prop='projectStatus' label='状态' width='120'>
                <template slot-scope='scope'>
                    <el-button
                        v-if='scope.row.projectStatus == 1'
                        type='success'
                        round
                        size='mini'
                        >进行中</el-button
                    >
                    <el-button
                        v-else-if='scope.row.projectStatus == 0'
                        type='info'
                        round
                        size='mini'
                        >已关闭</el-button
                    >
                    <el-button
                        v-else-if='scope.row.projectStatus == 2'
                        type='warning'
                        round
                        size='mini'
                        >已完成</el-button
                    >
                  <el-button
                    v-else-if='scope.row.projectStatus == 3'
                    type='warning'
                    round
                    size='mini'
                    style="background:rgba(175, 90, 0, 100)"
                  >已暂停</el-button
                  >
                  <el-button
                    v-else-if='scope.row.projectStatus == 4'
                    type='info'
                    round
                    size='mini'
                  >等待中</el-button
                  >
                </template>
            </el-table-column>
            <el-table-column label='操作' width='240'>
                <template slot-scope='scope'>
                    <el-button
                        v-if="scope.row.projectStatus != 2"
                        @click='handleClick(scope.row)'
                        type='text'
                        size='small'
                    >
                        查看配置
                    </el-button>
                    <el-button
                        type='text'
                        size='small'
                        @click="handleChange(scope.row)"
                        v-if='scope.row.projectStatus == 0'
                        >修改</el-button
                    >
                    <el-button
                      @click="seeTesting(scope.row)"
                        type='text'
                        size='small'
                        v-if='scope.row.projectStatus == 1 || scope.row.projectStatus == 3 || scope.row.projectStatus == 2'
                        >查看进度</el-button
                    >
                    <el-button
                        type='text'
                        size='small'
                        @click="report(scope.row)"
                        v-if='scope.row.projectStatus == 2'
                        >查看报告</el-button
                    >
                </template>
            </el-table-column>
        </el-table>
      <el-pagination
        background
        class="page"
        style="margin-top:20px;margin-left:10px;"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
        :current-page.sync="currentPage"
        :page-size="pageSize"
        layout="sizes, total, prev, pager, next"
        :total="total">
      </el-pagination>
    </div>
</div>
</template>

<script>
import mylib from '../../api/index'
export default {
  name: 'project',
  data () {
    return {
      height: mylib.height - 290,
      currentPage: 1,
      pageSize: 10,
      total: 0,
      pickerOptions: {
        shortcuts: [
          {
            text: '最近一周',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(
                start.getTime() - 3600 * 1000 * 24 * 7
              )
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近一个月',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(
                start.getTime() - 3600 * 1000 * 24 * 30
              )
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近三个月',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(
                start.getTime() - 3600 * 1000 * 24 * 90
              )
              picker.$emit('pick', [start, end])
            }
          }
        ]
      },
      value2: '',
      manufacturer: '',
      useCasesType: '',
      status: '',
      optionData: '',
      deviceName: '',
      type: '',
      // 被测类型
      typeOption: [],
      options: [
        {
          value: '1',
          label: '进行中  '
        },
        {
          value: '0',
          label: '已关闭'
        },
        {
          value: '2',
          label: '已完成'
        }
      ],
      tableData: []
    }
  },
  created () {
    mylib.projectList({start: this.currentPage, pageSize: this.pageSize}).then((res) => {
      this.tableData = res.data.rows
      this.total = res.data.total
    })
    mylib.axios({url: '/useCasesGroup/list'}).then((res) => {
      res.data.rows.forEach((el) => {
        this.typeOption.push({
          value: el.id,
          label: el.name
        })
      })
    })
  },
  methods: {
    // 序号处理
    indexMethod (index) {
      return (index + 1) + (this.currentPage - 1) * this.pageSize
    },
    handleCurrentChange () {
      this.search()
    },
    handleSizeChange (val) {
      this.pageSize = val
      this.search()
    },
    handleClick (row) {
      this.$router.push({
        name: 'seeDeploy',
        query: { id: row.id }
      })
    },
    handleChange (row) {
      this.$router.push({
        name: 'projectCreate',
        query: { id: row.id }
      })
    },
    seeTesting (row) {
      this.$router.push({
        name: 'testing',
        query: { projectCode: row.projectCode, userName: row.userName }
      })
    },
    report (row) {
      this.$router.push({
        name: 'report',
        query: { id: row.id }
      })
    },
    search () {
      const params = {
        manufacturer: this.manufacturer,
        deviceName: this.deviceName,
        useCasesID: this.type,
        projectStatus: this.status,
        deviceModel: this.useCasesType,
        startTime: this.value2[0],
        endTime: this.value2[1],
        start: this.currentPage,
        pageSize: this.pageSize
      }

      // console.log(params);
      mylib.projectList(params).then((res) => {
        this.tableData = res.data.rows
        this.total = res.data.total
        // console.log(res);
      })
    },
    fromline () {
      this.manufacturer = ''
      this.deviceName = ''
      this.status = ''
      this.type = ''
      this.useCasesType = ''
      this.value2 = ''
    },
    add () {
      this.$router.push({
        name: 'projectCreate'
        // params: { id: row.id, status: row.status },
      })
    }
  }
}
</script>

<style scoped>
/*.container-content{*/
/*  margin-top:55px;*/
/*}*/
.ad {
/* display: inline-block; */
width: 100%;
/*height: 85px;*/
}
.btn{
  margin: 10px 0;
}
.header-input{
  width:180px;
  margin-right:20px;
}
.header-date{
  margin-right:20px;
}
@media screen and (max-width: 1440px) {
  .header-input{
    width:140px;
  }
}
</style>
