<template>
    <div class="container">
        <div class='form'>
                <el-input
                    v-model='sensorTypeName'
                    placeholder='模型名称'
                    style='width: 180px;margin-right:20px;'
                    clearable
                />
                <el-input
                    v-model='sensorManufacturer'
                    placeholder='厂家名称'
                    style='width: 180px;margin-right:20px;'
                    clearable
                />
                <el-select
                    v-model='status'
                    placeholder='状态'
                    clearable
                    style='width: 180px;margin-right:20px;'
                >
                    <el-option
                        v-for='item in options'
                        :key='item.value'
                        :label='item.label'
                        :value='item.value'

                    />
                </el-select>

                <el-button type='warning' @click='search'>搜索</el-button>
                <el-button type='warning' @click='fromline' plain
                    >重置</el-button
                >
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
                :max-height="height - 120"
            >
                <el-table-column type='index' label='序号' width='80'>
                </el-table-column>
                <el-table-column
                    prop='sensorTypeName'
                    label='模型名称'
                >
                </el-table-column>
                <el-table-column
                    prop='sensorTypeCode'
                    label='模型编号'
                >
                </el-table-column>
                <el-table-column
                    prop='sensorUnitType'
                    label='模型型号'
                >
                </el-table-column>
                <el-table-column
                    prop='sensorManufacturer'
                    label='厂家名称'

                >
                </el-table-column>
                <el-table-column prop='status' label='状态'>
                    <template slot-scope='scope'>
                        <el-button
                            v-if='scope.row.status == 1'
                            type='success'
                            round
                            size='mini'
                            >已启用</el-button
                        >
                        <el-button
                            v-else-if='scope.row.status == 0'
                            type='info'
                            round
                            size='mini'
                            >已关闭</el-button
                        >
                    </template>
                </el-table-column>
                <el-table-column label='操作'>
                    <template slot-scope='scope'>
                        <el-button
                            @click='handleClick(scope.row)'
                            type='text'
                            size='small'
                        >
                            查看详情
                        </el-button>
                        <el-button
                          @click="change(scope.row)"
                            type='text'
                            size='small'
                            >修改</el-button
                        >
                      <el-button
                        type='text'
                        @click="handleDel(scope.row)"
                        size='small'
                      >删除</el-button
                      >
                    </template>
                </el-table-column>
            </el-table>
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
  name: 'model',
  data () {
    return {
      height: mylib.height - 170,
      currentPage: 1,
      pageSize: 10,
      total: 0,
      sensorTypeName: '',
      sensorManufacturer: '',
      status: '',
      options: [
        {
          value: '1',
          label: '已启用'
        },
        {
          value: '0',
          label: '已关闭'
        }
      ],
      tableData: [],
      dialogVisible: false,
      id: '',
      name: '',
      facturer: ''
    }
  },
  created () {
    mylib.model().then((res) => {
      this.tableData = res
      // console.log(res);
    })
  },
  methods: {
    add () {
      this.$router.push('/index/addModel')
    },
    handleDel (row) {
      this.dialogVisible = true
      this.id = row.id
      this.name = row.sensorTypeName
      this.facturer = row.sensorManufacturer
    },
    confirm () {
      mylib.axios({
        url: '/model/remove',
        params: {
          ids: this.id
        }
      }).then((res) => {
        if (res.code == '200') {
          this.$message.success(res.msg)
          this.dialogVisible = false
          mylib.model().then((res) => {
            this.tableData = res
          })
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    handleClick (row) {
      this.$router.push({
        name: 'modelDetails',
        params: {id: row.id, status: row.status, sensorTypeName: row.sensorTypeName, sensorManufacturer: row.sensorManufacturer, sensorTypeCode: row.sensorTypeCode, sensorUnitType: row.sensorUnitType}
      })
    },
    change (row) {
      this.$router.push({
        name: 'addModel',
        params: {id: row.id, status: row.status, sensorTypeName: row.sensorTypeName, sensorManufacturer: row.sensorManufacturer, sensorTypeCode: row.sensorTypeCode, sensorUnitType: row.sensorUnitType}
      })
    },
    search () {
      const params = {
        sensorTypeName: this.sensorTypeName,
        sensorManufacturer: this.sensorManufacturer,
        status: this.status
      }

      mylib.model(params).then((res) => {
        this.tableData = res
        // console.log(res);
      })
    },
    fromline () {
      this.sensorTypeName = ''
      this.sensorManufacturer = ''
      this.status = ''
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
