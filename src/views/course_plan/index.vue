<template>
  <div class="app-container">

    <!--搜索表单-->
    <el-form :inline="true" :model="searchCourse" class="demo-form-inline">
      <el-form-item label="课程名称">
        <el-input
          v-model="searchCourse.name"
          placeholder="请输入课程名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="课程序号">
        <el-input
          v-model="searchCourse .serialNumber"
          placeholder="请输入课程序号"
        ></el-input>
      </el-form-item>

      <el-form-item label="上课时间">
        <el-select v-model="searchCourse.week" placeholder="请选择">
          <el-option label="周一" value="1"></el-option>
          <el-option label="周二" value="2"></el-option>
          <el-option label="周三" value="3"></el-option>
          <el-option label="周四" value="4"></el-option>
          <el-option label="周五" value="5"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="开课时间">
        <el-time-picker
          is-range
          v-model="timePeriod"
          range-separator="至"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          placeholder="选择时间范围"
          style="width: 400px; margin-left: 20px"
          format="HH:mm"
          value-format="HH:mm"
        ></el-time-picker>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
        <el-button type="info" @click="clear">清空</el-button>
      </el-form-item>
    </el-form>



    <!--添加数据对话框表单-->
    <el-dialog ref="form" title="编辑课程" :visible.sync="dialogVisible" width="30%">
      <el-form ref="form" :model="course" label-width="80px" size="mini">
        <el-form-item label="课程名称">
          <el-input v-model="course.name"></el-input>
        </el-form-item>

        <el-form-item label="课程序号">
          <el-input v-model="course.serialNumber"></el-input>
        </el-form-item>

        <el-form-item label="开课时间" >
          <el-select v-model="course.week" placeholder="请选择" style="width:100%" >
            <el-option
              v-for="item in weekList"
              :key="item.value"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>


        <el-form-item label="开课时段">
          <el-time-picker
            v-model="course.timePeriod"
            clearable
            format="HH:mm"
            value-format="HH:mm"
            placeholder="选择时间"
            size="small"
            style="width:100%"
          ></el-time-picker>
        </el-form-item>

        <el-form-item label="授课老师">
          <el-select v-model="course.teacherLst" placeholder="请选择" style="width:100%">
            <!--            <el-option label="学工部" value="1"></el-option>-->
            <!--            <el-option label="教研部" value="2"></el-option>-->
            <el-option
              v-for="item in teacherLst"
              :key="item.value"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="授课班级">
          <el-select v-model="course.classId" placeholder="请选择" style="width:100%">
            <!--            <el-option label="学工部" value="1"></el-option>-->
            <!--            <el-option label="教研部" value="2"></el-option>-->
            <el-option
              v-for="item in classList"
              :key="item.value"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="add">提交</el-button>
          <el-button @click="dialogVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <br>
    <!--表格-->
    <template>
      <el-table :data="tableData" style="width: 100%" border @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"  align="center"></el-table-column>
        <el-table-column  prop="name"  label="课程名称"  align="center"></el-table-column>
        <el-table-column  prop="serialNumber"  label="课程序号"  align="center"></el-table-column>
        <el-table-column  prop="name"  label="授课老师"  align="center"></el-table-column>
        <el-table-column  prop="classId"  label="授课班级"  align="center"></el-table-column>
        <el-table-column  prop="week"  label="授课时间"  align="center"></el-table-column>
        <el-table-column  prop="timePeriod"  label="授课时段"  align="center"></el-table-column>
        <el-table-column  prop="location"  label="授课地点"  align="center"></el-table-column>


        <el-table-column align="center" label="最后操作时间">
          <template slot-scope="scope">
            {{scope.row.updateTime ? scope.row.updateTime.replace('T',' '):''}}
          </template>
        </el-table-column>

        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="small" @click="update(scope.row.id)">编辑</el-button>
            <el-button type="danger" size="small" @click="deleteById(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>

    <!--分页工具条-->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :background="background"
      :current-page="currentPage"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="5"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalCount">
    </el-pagination>
  </div>
</template>

<script>
import { page, update,selectById,add} from "@/api/coursePlan.js";
import { findAll } from "@/api/cla.js";
import { getToken } from '@/utils/auth';
import course from '@/views/course/index.vue'

export default {
  computed: {
    course() {
      return course
    }
  },
  data() {
    return {
      background: true,
      // 每页显示的条数
      pageSize: 5,
      // 总记录数
      totalCount: 100,
      // 当前页码
      currentPage: 1,
      // 添加数据对话框是否展示的标记
      dialogVisible: false,
      // 品牌模型数据
      searchCourse: {
        name: "",
        serialNumber: "",
        week: "",
      },
      course: {
        classId: "",
        location: "",
      },
      teacherList: [],
      classList: [],
      weekList: [{ id: 1, name: "周一" }, { id: 2, name: "周二" },{ id: 3, name: "周三" },{ id: 4, name: "周四" },{ id: 5, name: "周五" }],
      beginTime: "",
      endTime: "",
      timePeriod: "",

      // 被选中的id数组
      selectedIds: [],
      // 复选框选中数据集合
      multipleSelection: [],
      // 表格数据
      tableData: [],
      token: { token: getToken() }
    };
  },

  mounted() {
    this.page(); //当页面加载完成后，发送异步请求，获取数据
    findAll().then((result) => {
      this.classList = result.data.data;
      // this.deptList.forEach(function(item) {
      //   item.id = parseInt(item.id);
      // });
    });
  },

  methods: {
    // 查询分页数据
    page() {
      page(
        this.searchCourse.name,
        this.searchCourse.serialNumber,
        this.searchCourse.week,
        this.beginTime,
        this.endTime,
        this.currentPage,
        this.pageSize
      ).then((res) => {
        this.totalCount = res.data.data.total;
        this.tableData = res.data.data.records;
      });
    },

    // 复选框选中后执行的方法
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },

    // 查询方法
    onSubmit() {
      this.currentPage = 1;
      this.page();
    },

    clear() {
      this.searchCourse = { name: "", serialNumber: "" ,week: ""};
      this.beginTime = "";
      this.endTime = "";
      this.page();
    },
    // 添加数据
    add() {
      let operator;

      if (this.course.id) {
        //修改
        operator = update(this.course);
      } else {
        operator = add(this.course);
      }

      operator.then((resp) => {
        if (resp.data.code == "1") {
          this.dialogVisible = false;
          this.page();
          this.$message({ message: "恭喜你，保存成功", type: "success" });
        } else {
          this.$message.error(resp.data.msg);
        }
      });
    },
    update(id) {
      //1. 打开窗口
      this.dialogVisible = true;
      //2. 发送请求

      selectById(id).then((result) => {
        if (result.data.code === 1) {
          this.course = result.data.data;
          this.course;
        }
      });
    },

    //分页
    handleSizeChange(val) {
      // 重新设置每页显示的条数
      this.pageSize = val;
      this.page();
    },

    handleCurrentChange(val) {
      // 重新设置当前页码
      this.currentPage = val;
      this.page();
    },

    watch: {
      entrydate(val) {
        if (val && val.length >= 2) {
          this.beginTime = val[0];
          this.endTime = val[1];
        } else {
          this.beginTime = "";
          this.endTime = "";
        }
      },
    },
  }
}
</script>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
}
.avatar {
  width: 100px;
  height: 100px;
  display: block;
}
</style>
