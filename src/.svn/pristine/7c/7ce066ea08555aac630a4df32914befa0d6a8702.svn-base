<!--表格组件 -->
<template>
    <section class="ces-table-page">
        <!-- 表格操作按钮 -->
        <section class="ces-handle" v-if="isHandle">
            <el-button
                v-for="(item, index) in tableHandles"
                :size="item.size || size"
                :type="item.type"
                :icon="item.icon"
                @click="item.handle()"
                :key="index"
                >{{ item.label }}</el-button
            >
        </section>
        <!-- 数据表格 -->
        <section class="ces-table">
            <el-table
                :data="tableData"
                :size="size"
                :border="isBorder"
                @select="select"
                @select-all="selectAll"
                v-loading="loading"
                header-row-class-name="header_row_style"
                :defaultSelections="defaultSelections"
                ref="cesTable"
            >
                <el-table-column
                    v-if="isSelection"
                    type="selection"

                    width="50"
                ></el-table-column>
                <el-table-column
                    v-if="isIndex"
                    type="index"
                    :label="indexLabel"

                    width="50"
                ></el-table-column>
                <!-- 数据栏 -->
                <el-table-column
                    v-for="item in tableCols"
                    :key="item.id"
                    :prop="item.prop"
                    :label="item.label"
                    :width="item.width"
                    :align="item.align"
                    show-overflow-tooltip
                    :render-header="item.require ? renderHeader : null"
                >
                    <template slot-scope="scope">
                        <!-- html -->
                        <span
                            v-if="item.type === 'Html'"
                            v-html="item.html(scope.row)"
                        ></span>
                        <!-- 按钮 -->
                        <span v-if="item.type === 'Button'">
                            <el-button
                                v-for="(btn, index) in item.btnList"
                                :disabled="
                                    btn.isDisabled && btn.isDisabled(scope.row)
                                "
                                :type="btn.type"
                                :size="btn.size || size"
                                :icon="btn.icon"
                                :key="index"
                                @click="btn.handle(scope.row)"
                                >{{ btn.label }}</el-button
                            >
                        </span>
                        <!-- 输入框 -->
                        <el-input
                            v-if="item.type === 'Input'"
                            v-model="scope.row[item.prop]"
                            :size="size"
                            :disabled="
                                btn.isDisabled && btn.isDisabled(scope.row)
                            "
                            @focus="item.focus && item.focus(scope.row)"
                        ></el-input>
                        <!-- 下拉框 -->
                        <el-select
                            v-if="item.type === 'Select'"
                            v-model="scope.row[item.prop]"
                            :size="size"
                            :props="item.props"
                            :disabled="
                                btn.isDisabled && btn.isDisabled(scope.row)
                            "
                            @change="item.change && item.change(scope.row)"
                        >
                            <el-option
                                v-for="op in item.options"
                                :label="op[item.props.label]"
                                :value="op[item.props.value]"
                                :key="op[item.props.value]"
                            ></el-option>
                        </el-select>
                        <!-- 单选 -->
                        <el-radio-group
                            v-if="item.type === 'Radio'"
                            v-model="scope.row[item.prop]"
                            :disabled="
                                btn.isDisabled && btn.isDisabled(scope.row)
                            "
                            @change="item.change && item.change(scope.row)"
                        >
                            <el-radio
                                v-for="(ra, index) in item.radios"
                                :label="ra.value"
                                :key="index"
                                >{{ ra.label }}</el-radio
                            >
                        </el-radio-group>
                        <!-- 复选框 -->
                        <el-checkbox-group
                            v-if="item.type === 'Checkbox'"
                            v-model="scope.row[item.prop]"
                            :disabled="
                                btn.isDisabled && btn.isDisabled(scope.row)
                            "
                            @change="item.change && item.change(scope.row)"
                        >
                            <el-checkbox
                                v-for="(ra, index) in item.checkboxs"
                                :label="ra.value"
                                :key="index"
                                >{{ ra.label }}</el-checkbox
                            >
                        </el-checkbox-group>
                        <!-- 评价 -->
                        <el-rate
                            v-if="item.type === 'Rate'"
                            v-model="scope.row[item.prop]"
                            :disabled="
                                btn.isDisabled && btn.isDisabled(scope.row)
                            "
                            @change="item.change && item.change(scope.row)"
                        ></el-rate>
                        <!-- 开关 -->
                        <el-switch
                            v-if="item.type === 'Switch'"
                            v-model="scope.row[item.prop]"
                            :disabled="
                                btn.isDisabled && btn.isDisabled(scope.row)
                            "
                            @change="item.change && item.change(scope.row)"
                        ></el-switch>
                        <!-- 图像 -->
                        <img
                            v-if="item.type === 'Image'"
                            :src="scope.row[item.prop]"
                            @click="item.handle && item.handle(scope.row)"
                        />
                        <!-- 滑块 -->
                        <el-slider
                            v-if="item.type === 'Slider'"
                            v-model="scope.row[item.prop]"
                            :disabled="
                                btn.isDisabled && btn.isDisabled(scope.row)
                            "
                            @change="item.change && item.change(scope.row)"
                        ></el-slider>
                        <!-- 默认 -->
                        <span
                            v-if="!item.type"
                            :style="item.itemStyle && item.itemStyle(scope.row)"
                            :class="
                                item.itemClass && item.item.itemClass(scope.row)
                            "
                            >{{
                                (item.formatter && item.formatter(scope.row)) ||
                                scope.row[item.prop]
                            }}</span
                        >
                    </template>
                </el-table-column>
            </el-table>
        </section>
        <!-- 分页 -->
        <section class="ces-pagination" v-if="isPagination">
            <el-pagination
                style="
                    display: flex;
                    justify-content: center;
                    height: 100%;
                    align-items: center;
                "
                @current-change="handleCurrentChange"
                @size-change="handleSizeChange"
                layout="total,sizes ,prev, pager, next,jumper"
                :page-size="pagination.pageSize"
                :current-page="pagination.pageNum"
                :total="pagination.total"
            ></el-pagination>
        </section>
    </section>
</template>

<script>
export default {
    props: {
        // 表格型号：mini,medium,small
        size: { type: String, default: "medium" },
        isBorder: { type: Boolean, default: true },
        loading: { type: Boolean, default: false },
        // 表格操作
        isHandle: { type: Boolean, default: false },
        tableHandles: { type: Array, default: () => [] },
        // 表格数据
        tableData: { type: Array, default: () => [] },
        // 表格列配置
        tableCols: { type: Array, default: () => [] },
        // 是否显示表格复选框
        isSelection: { type: Boolean, default: false },
        defaultSelections: { type: [Array, Object], default: () => null },
        // 是否显示表格索引
        isIndex: { type: Boolean, default: false },
        indexLabel: { type: String, default: "序号" },
        // 是否显示分页
        isPagination: { type: Boolean, default: true },
        // 分页数据
        pagination: {
            type: Object,
            default: () => ({ pageSize: 10, pageNum: 1, total: 0 }),
        },
    },
    data() {
        return {};
    },
    watch: {
        defaultSelections(val) {
            this.$nextTick(function () {
                if (Array.isArray(val)) {
                    val.forEach((row) => {
                        this.$refs.cesTable.toggleRowSelection(row);
                    });
                } else {
                    this.$refs.cesTable.toggleRowSelection(val);
                }
            });
        },
    },
    methods: {
        // 表格勾选
        select(rows, row) {
            this.$emit("select", rows, row);
        },
        // 全选
        selectAll(rows) {
            this.$emit("select", rows);
        },
        //
        handleCurrentChange(val) {
            this.pagination.pageNum = val;
            this.$emit("refresh");
        },
        handleSizeChange(val) {
            this.pagination.pageSize = val;
            this.$emit("refresh");
        },

        // tableRowClassName({rowIndex}) {
        //     if (rowIndex % 2 === 0) {
        //         return "stripe-row";
        //     }
        //     return "";
        // }
        renderHeader(h, obj) {
            return h("span", { class: "ces-table-require" }, obj.column.label);
        },
    },
};
</script>
<style>
.ces-table-require::before {
    content: "*";
    color: red;
}
.el-pagination {
    float: right;
    margin-right: 10px;
    margin-top: 5px;
}
</style>
