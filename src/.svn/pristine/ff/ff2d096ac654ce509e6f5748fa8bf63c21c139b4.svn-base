<template>
  <div class="container">
    <div class='form'>
      <el-input
        v-model='deviceCode'
        placeholder='设备编号'
        style='width: 250px;margin-right:20px;'
        clearable />
      <el-input
        v-model='type'
        placeholder='设备类型'
        style='width: 250px;margin-right:20px;'
        clearable />

      <el-button type='warning' @click='search'>搜索</el-button>
      <el-button type='warning' @click='fromline' plain>重置</el-button>
    </div>
    <div class='container-content'>
      <div class='ad'>
        <div @click='add' style='margin-right:20px;' class='btn'>
          <div><img src='../../assets/image/add-icon.svg' alt=''></div>
          <div>新增</div>
        </div>
      </div>

      <el-table
        :data='tableData'
        stripe
        style='
                    width: 100%;
                    margin-left: 20px;
                    width: 98%;
                    font-size: 16px;
                '
        border
        :max-height="height - 120">
        <el-table-column type='index' label='序号' width='80'>
        </el-table-column>
        <el-table-column
          prop='deviceCode'
          label='设备编号'
          min-width="146"
        >
        </el-table-column>
        <el-table-column
          prop='deviceTypeName'
          label='设备名称'
        >
        </el-table-column>
        <el-table-column
          prop='type'
          label='设备类型'
        >
        </el-table-column>
        <el-table-column
          prop='deviceModel'
          label='设备型号'
        >
        </el-table-column>
        <el-table-column
          prop='devType'
          label='被测类型'
        >
          <template slot-scope="scope">
            <span v-if="scope.row.devType == 0">微功率传感器</span>
            <span v-if="scope.row.devType == 1">汇聚节点</span>
            <span v-if="scope.row.devType == 2">低功率传感器</span>
            <span v-if="scope.row.devType == 3">接入节点</span>
          </template>
        </el-table-column>
        <el-table-column
          prop='manufacturer'
          label='厂家名称'
        >
        </el-table-column>
        <el-table-column
          prop='createTime'
          label='创建时间'
        >
        </el-table-column>
        <el-table-column label='操作'>
          <template slot-scope='scope'>
            <el-button
              @click='handleClick(scope.row)'
              type='text'
              size='small'
            >
              设备测试
            </el-button>
            <el-button
              @click="change(scope.row)"
              type='text'
              size='small'
            >修改</el-button>
            <el-button
              type='text'
              @click="handleDel(scope.row)"
              size='small'
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
        是否确认删除“{{name}}-{{facturer}}”？
      </div>
      <span slot='footer' class='dialog-footer'>
        <el-button type='warning' @click='confirm'>确 定</el-button>
        <el-button
          @click='dialogVisible = false'
          type='warning'
          plain
        >取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import mylib from '../../api/index'
export default {
  name: 'device',
  data () {
    return {
      height: mylib.height - 170,
      currentPage: 1,
      pageSize: 10,
      total: 0,
      deviceCode: '',
      type: '',
      tableData: [],
      dialogVisible: false,
      id: '',
      name: '',
      facturer: ''
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      mylib.axios({
        url: '/device/list',
        params: {
          start: this.currentPage,
          pageSize: this.pageSize,
          type: this.type,
          deviceCode: this.deviceCode
        }
      }).then((res) => {
        this.tableData = res.data.rows
        this.total = res.data.total
      })
    },
    add () {
      this.$router.push('/index/addDevice')
    },
    handleCurrentChange () {
      this.getData()
    },
    handleSizeChange (val) {
      this.pageSize = val
      this.getData()
    },
    handleDel (row) {
      this.dialogVisible = true
      this.id = row.id
      this.name = row.deviceTypeName
      this.facturer = row.type
    },
    confirm () {
      mylib.axios({
        url: '/device/remove',
        params: {
          ids: this.id
        }
      }).then((res) => {
        if (res.code == '200') {
          this.$message.success(res.msg)
          this.dialogVisible = false
          this.getData()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    handleClick (row) {
      this.$router.push({name: 'projectCreate', query: {deviceId: row.id}})
    },
    change (row) {
      this.$router.push({name: 'addDevice', query: {id: row.id}})
    },
    search () {
      this.getData()
    },
    fromline () {
      this.deviceCode = ''
      this.type = ''
    }
  }
}
</script>

<style scoped>
  .ad {
    /* display: inline-block; */
    width: 100%;
  }
  .btn{
    margin: 10px 0;
  }
  .add {
    float: right;
    margin: 20px;
  }
  .text {
    font-weight: bold;
    opacity: 0.85;
    color: rgba(0, 0, 0, 1);
  }
</style>
