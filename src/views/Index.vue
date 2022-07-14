<template>
  <div>
    <h3>数据的增删改查</h3>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="date" label="日期" align="center" width="100px">
      </el-table-column>
      <el-table-column prop="name" label="姓名" align="center" width="100px">
      </el-table-column>
      <el-table-column prop="address" label="地址" align="center" width="400px">
        <template slot="header" slot-scope="scope">
          <el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
        </template>
      </el-table-column>
      <el-table-column label="修改" align="right" width="300px">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope)">Edit</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope)"
            >Delete</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div>
        <button @click="addfn">增加新用户</button>
    </div>
    <!-- form -->
    <MyDialog
      :form="form"
      :dialogFormVisible="dialogFormVisible"
      :formLabelWidth="formLabelWidth"
      @confimfn_my="confimfn"
      @cancelfn_my="cancelfn"
    ></MyDialog>
    <!-- <button @click="getkn">kan</button> -->
    <!-- 增加的弹窗 -->
    <AddDialog
    :addform="addform"
    :formLabelWidth="formLabelWidth"
    :incrementform="incrementform"
    @my_addcancel="addcancelfn"
    @my_addconfirm="addconfirmfn">
    </AddDialog>
  </div>
</template>
<script>
import dayjs from "dayjs";
import instance from "../api/api";
import MyDialog from "@/components/MyDialog.vue";
import AddDialog from '@/components/AddDialog.vue'
export default {
  name: "Index",
  data() {
    return {
      search: "",
      tableData: [],
      dialogFormVisible: false, //表单的显示隐藏
      form: {
        index: 0,
        date: null,
        name: "",
        address: "",
      }, //表单的内容
      formLabelWidth: "120px",
      incrementform:false,
      addform:{ //增加表单绑定
        date:null,
        name:"",
        address:""
      }
    };
  },
  components: {
    MyDialog,
    AddDialog
  },
  created() {
    this.getall();
  },

  methods: {
      addcancelfn(){
          this.$emit("my_addcancel")
      },
      addconfirmfn(){
          this.incrementfn()
          .then(()=>{
              this.$message({
                  type:"success",
                  message:"添加成功",
                  duration:3000,
                  onClose:()=>{
                      this.incrementform=false
                      this.getall()
                  }
              })
          })
          .catch(()=>{

          })
      },
    addfn(){
        this.incrementform=true
    },
    handleEdit(scope) {
      console.log(scope.row);
      this.form = scope.row;
      this.form.index = scope.$index;
      this.dialogFormVisible = true;
    },
    handleDelete(scope) {
      this.$confirm("确定删除", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.deletefn(scope.$index).then(() => {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },

    confimfn() {
      this.dialogFormVisible = false;
      this.form.date = dayjs(new Date(this.form.date)).format("YYYY-MM-DD");
      this.updatefn();
    },
    cancelfn(){
        this.dialogFormVisible=false
    },
    // 增加业务
    async incrementfn(){
      let { date, name, address } = this.addform;

        let {data}=await instance.post("/add",{date,name,address})
        console.log(data);
    },
    // 修改业务
    async updatefn() {
      let { date, name, address, index } = this.form;
      console.log(date);
      let { data } = await instance.put("/update", {
        date,
        name,
        address,
        index,
      });
      console.log(data);
    },
    //   删除业务
    async deletefn(index) {
      let { data } = await instance.delete("/delete", { params: { index } });
      console.log(data);
      this.getall();
    },
    //   请求数据业务
    async getall() {
      let { data } = await instance.get("/all");
      console.log(data);
      this.tableData = data.tableData;
    },
  },
};
</script>
<style lang="scss" scoped>
</style>