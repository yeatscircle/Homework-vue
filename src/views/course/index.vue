<template>
  <div style="margin-top: 20px; margin: 50px; margin-right: 100px">
    <!-- 按钮 -->

    <el-row>
      <el-button
        style="float: right"
        type="primary"
        @click="dialogFormVisible = true; course={}"
      >+ 新增课程
      </el-button
      >
    </el-row>
    <br>
    <!-- 数据表格 -->
    <template>
      <el-table
        highlight-current-row
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        border
      >
        <el-table-column type="index" width="100" label="序号" header-align="center" align="center"></el-table-column>
        <el-table-column prop="name" label="课程名称" header-align="center" align="center"></el-table-column>
        <el-table-column prop="serialNumber" label="课程序列号" header-align="center" align="center"></el-table-column>
        <el-table-column prop="location" label="上课教室" header-align="center" align="center"></el-table-column>
        <el-table-column label="最后操作时间" header-align="center" align="center">
          <template slot-scope="scope">
            {{ scope.row.updateTime ? scope.row.updateTime.replace('T', ' ') : '' }}
          </template>
        </el-table-column>

        <el-table-column label="操作" width="420" header-align="center" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              plain
              @click="selectById(scope.row.id)"
            >编辑
            </el-button
            >

            <el-button
              size="mini"
              type="danger"
              plain
              @click="deleteById(scope.row.id)"
            >删除
            </el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </template>

    <!-- 新建对话框 -->

    <el-dialog title="保存课程" :visible.sync="dialogFormVisible">
      <el-form :model="course" ref="courseForm">
        <el-form-item label="课程名称" :label-width="formLabelWidth">
          <el-input v-model="course.name" placeholder="请输入课程名称" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="课程序号" :label-width="formLabelWidth" prop="serialNumber" :rules="serialNumberRules">
          <el-input v-model="course.serialNumber" placeholder="请输入课程序号" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="课程教室" :label-width="formLabelWidth">
          <el-input v-model="course.location" placeholder="请输入课程教室" autocomplete="off"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { findAll, add, update, deleteById, selectById } from '@/api/course.js'

export default {
  data() {
    // 自定义课程序号验证规则
    // 自定义课程序号验证规则
    const validateSerialNumber = (rule, value, callback) => {
      const serialNumberPattern = /^[A-Za-z]{2}\d{7}$/;
      if (value === '') {
        callback(new Error('请输入课程序号'));
      } else if (!serialNumberPattern.test(value)) {
        callback(new Error('课程序号必须是9位,前两位是字母,后7位是数字'));
      } else {
        callback();
      }
    };

    return {
      formLabelWidth: '120px',
      dialogFormVisible: false, // 控制对话框是否可见
      course: {
        name: '',
        serialNumber: '',
        location: ''
      },
      tableData: [],
      serialNumberRules: [
        { validator: validateSerialNumber, trigger: 'blur', required: true }
      ],
    }
  },

  methods: {

    //删除部门
    deleteById(id) {
      this.$confirm('确认删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteById(id).then((result) => {
          if (result.data.code == 1) {
            this.$message({
              message: '恭喜你，删除成功',
              type: 'success'
            })
          } else {
            this.$message.error(result.data.msg)
          }
          //重新查询数据
          this.init()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },

    submitForm() {
      this.$refs.courseForm.validate((valid) => {
        if (valid) {
          this.add();
        } else {
          console.log('表单验证失败,无法提交!');
          return false;
        }
      });
    },

    //根据ID查询部门 -- 回显
    selectById(id) {
      this.dialogFormVisible = true
      selectById(id).then((result) => {
        this.course = result.data.data
      })
    },

    //保存方法
    add() {
      let method// 添加
      if (this.course.id) {
        method = update(this.course) // 修改
      } else {
        method = add(this.course) //添加
      }
      method.then((result) => {
        if (result.data.code === 1) {
          //修改成功
          this.$message.success('恭喜你，保存成功')
          //重新查询数据
          this.init()
        } else {
          this.$message.error(result.data.msg)
        }
      })
      // 关闭新建窗口
      this.dialogFormVisible = false

      // 清空模型数据
      this.course = {}
    },

    //初始化 - 查询全部
    init() {
      findAll().then((result) => {
        console.log(result)
        if (result.data.code == 1) {
          this.tableData = result.data.data
        }
      })
    }
  },
  mounted() {
    //当页面加载完成后自动执行。
    this.init()
  }
}
</script>
<style>

</style>
