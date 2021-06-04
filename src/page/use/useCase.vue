<template>
  <div class="container">
    <div class='form'>
        <el-input
          v-model='name'
          placeholder='分组名称'
          clearable
          class='header-input'/>
        <el-select
          v-model='status'
          placeholder='状态'
          clearable
          class='header-input'>
          <el-option
            label='已关闭'
            :value='0'/>
          <el-option
            label='已启用'
            :value='1'/>
        </el-select>
        <el-button type='warning' @click='search'>搜索</el-button>
        <el-button type='warning' @click='fromline' plain>重置</el-button>
      <div class='ad'>
        <div @click="addGroup" style="margin-right:20px;" class="btn">
          <div><img src="../../assets/image/add-icon.svg" alt=""></div>
          <div>新增</div>
        </div>
      </div>
    </div>
    <div class="table">
      <el-table
        stripe
        :data="groupArr"
        style="width: 100%; font-size: 16px"
        border
        :max-height="height - 130"
      >
        <el-table-column type='index' label='序号' width='70' :index="indexMethod">
        </el-table-column>
        <el-table-column prop="name" label="分组名称">
        </el-table-column>
        <el-table-column prop="devType" label="设备类型">
          <template slot-scope="scope">
            <span v-if="scope.row.devType == 0">微功率传感器</span>
            <span v-if="scope.row.devType == 1">汇聚节点</span>
            <span v-if="scope.row.devType == 2">低功率传感器</span>
            <span v-if="scope.row.devType == 3">接入节点</span>
          </template>
        </el-table-column>
        <el-table-column prop="descrie" label="描述">
        </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.status == 1"
              type="success"
              round
              size="mini"
            >已启用</el-button
            >
            <el-button
              v-else-if="scope.row.status == 0"
              type="info"
              round
              size="mini"
            >已关闭</el-button
            >
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              @click="handleClick(scope.row)"
              type="text"
              size="small"
            >查看详情
            </el-button>
            <el-button
              type="text"
              size="small"
              @click="change(scope.row)"
            >修改</el-button>
            <el-button
              type="text"
              size="small"
              @click="delGroup(scope.row)"
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
        是否确认删除分组“{{groupName}}”？
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
  name: 'useCase',
  data () {
    return {
      groupArr: [],
      height: mylib.height - 170,
      status: '',
      name: '',
      currentPage: 1,
      pageSize: 10,
      total: 0,
      dialogVisible: false,
      groupName: '',
      id: ''
    }
  },
  created () {
    this.getGroup()
  },
  methods: {
    // 新增分组
    addGroup () {
      this.$router.push('/index/addGroup')
    },
    // 修改分组
    change (row) {
      this.$router.push({path: '/index/editGroup', query: {id: row.id}})
    },
    confirm () {
      mylib.axios({
        url: '/useCasesGroup/remove',
        params: {
          ids: this.id
        }
      }).then((res) => {
        if (res.code == 200) {
          this.$message({
            type: 'success',
            message: res.msg
          })
          this.dialogVisible = false
          this.getGroup()
        } else {
          this.$message({
            type: 'error',
            message: res.msg
          })
        }
      })
    },
    // 删除分组
    delGroup (row) {
      this.id = row.id
      this.groupName = row.name
      this.dialogVisible = true
    },
    handleClick (row) {
      this.$router.push({name: 'seeDetails', query: {id: row.id}})
    },
    search () {
      this.getGroup()
    },
    fromline () {
      this.name = ''
      this.status = ''
    },
    indexMethod (index) {
      return (index + 1) + (this.currentPage - 1) * this.pageSize
    },
    handleCurrentChange () {
      this.getGroup()
    },
    handleSizeChange (val) {
      this.pageSize = val
      this.getGroup()
    },
    getGroup () {
      var params = {
        start: this.currentPage,
        pageSize: this.pageSize,
        name: this.name,
        status: this.status
      }
      mylib.axios({
        url: '/useCasesGroup/list',
        params: params
      }).then((res) => {
        this.groupArr = res.data.rows
        this.total = res.data.total
      })
    }
  }
}
</script>
<style scoped>
.table {
    padding: 65px 15px 0;
    width:100%;
    font-size: 16px;
    box-sizing: border-box;
}
.router-link-active {
    text-decoration: none;
}
.ad{
  float:right;
}
.header-input{
  width:180px;
  margin-right:20px;
}
</style>
