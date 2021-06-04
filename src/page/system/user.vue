<template>
  <div class="container">
    <div class="form">
      <el-input v-model="name" placeholder="用户名" clearable class="header-input"></el-input>
      <el-button type='warning' @click='search'>搜索</el-button>
      <div class='ad'>
        <div @click="add" style="margin-right:20px;" class="btn">
          <div><img src="../../assets/image/add-icon.svg" alt=""></div>
          <div>新增</div>
        </div>
      </div>
    </div>
    <div class="table">
      <el-table
        :data='tableData'
        stripe
        :max-height="height - 110"
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
          prop='userName'
          label='用户名'
        >
        </el-table-column>
        <el-table-column
          prop='name'
          label='姓名'
        >
        </el-table-column>
        <el-table-column
          prop='phone'
          label='手机号'
        >
        </el-table-column>
        <el-table-column label='状态'>
          <template slot-scope="scope">
            <el-button
              v-if='scope.row.userStatus == 1'
              type='success'
              round
              size='mini'
            >正常</el-button>
            <el-button
              v-if='scope.row.userStatus == 0'
              type='info'
              round
              size='mini'
            >禁用</el-button>
          </template>
        </el-table-column>
        <el-table-column prop='company' label='公司名称'>
        </el-table-column>
        <el-table-column prop='createTime' label='创建时间' width="180">
        </el-table-column>
        <el-table-column label='操作' width='240'>
          <template slot-scope='scope'>
            <el-button
              type='text'
              size='small'
              @click="handleChange(scope.row)"
            >修改</el-button>
            <el-button
              type='text'
              size='small'
              @click="handledel(scope.row)"
            >删除</el-button>
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
      <div class="footer">
        <el-button type="warning" @click="back">返回</el-button>
      </div>
    </div>
    <el-dialog
      :visible.sync='dialogVisible'
      width='30%'
      top='20%'
      center
      :show-close="false"
      class="dialog"
    >
      <div class="dialog-context">
        <img src="../../assets/image/wen-icon.svg" alt="" style="vertical-align: middle;">
        是否确认删除用户“{{userName}}”？
      </div>
      <span slot='footer' class='dialog-footer'
      ><el-button type='warning' @click='confirm'
      >确 定</el-button
      >
                    <el-button
                      @click='dialogVisible = false'
                      type='warning'
                      plain
                    >取 消</el-button
                    >
                </span>
    </el-dialog>
  </div>
</template>

<script>
import mylib from '../../api/index'
export default {
  name: 'user',
  data () {
    return {
      height: mylib.height - 170,
      name: '',
      tableData: [],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      dialogVisible: false,
      userName: ''
    }
  },
  methods: {
    indexMethod (index) {
      return (index + 1) + (this.currentPage - 1) * this.pageSize
    },
    back () {
      this.$router.push('/index/system')
    },
    add () {
      this.$router.push('/index/addUser')
    },
    handleChange (row) {
      this.$router.push({path: '/index/addUser', query: {userName: row.userName}})
    },
    search () {
      this.getData()
    },
    handledel (row) {
      this.userName = row.userName
      this.dialogVisible = true
    },
    confirm () {
      mylib.axios({
        url: '/user/remove',
        params: {
          userName: this.userName
        }
      }).then((res) => {
        if (res.code == 200) {
          this.$message.success(res.msg)
          this.dialogVisible = false
          this.getData()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    handleCurrentChange () {
      this.getData()
    },
    handleSizeChange (val) {
      this.pageSize = val
      this.getData()
    },
    getData () {
      mylib.axios({
        url: '/user/queryList',
        params: {
          start: this.currentPage,
          pageSize: this.pageSize,
          userName: this.name
        }
      }).then((res) => {
        this.tableData = res.data.rows
        this.total = res.data.total
      })
    }
  },
  created () {
    this.getData()
  }
}
</script>

<style scoped>
  .header-input{
    width:180px;
    margin-right:20px;
  }
.ad{
  float:right;
}
  .table{
    padding-top:65px;
    box-sizing: border-box;
  }
  .footer{
    position:absolute;
    bottom:5px;
    left:50%;
    translist: translateX(-50%);
  }
</style>
