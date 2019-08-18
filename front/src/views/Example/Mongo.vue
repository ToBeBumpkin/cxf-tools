<template>
  <div class="demoaxios">
    <el-tabs :stretch="true" tab-position="left">
      <el-tab-pane label="查询">
        <el-card>
          <el-tabs type="card">
            <el-tab-pane label="count">
              <el-button @click="findCount">findCount</el-button>
              <pre>{{countres}}</pre>
            </el-tab-pane>
            <el-tab-pane label="find">
              <el-button @click="find">find</el-button>
              <el-table :data="findres" border style="width: 100%">
                <el-table-column prop="name" label="姓名"></el-table-column>
                <el-table-column prop="family" label="人数"></el-table-column>
                <el-table-column prop="season" label="季节"></el-table-column>
                <el-table-column prop="show" label="显示"></el-table-column>
                <el-table-column prop="comat" label="comat"></el-table-column>
                <el-table-column prop="tiny" label="tiny"></el-table-column>
                <el-table-column prop="color" label="color"></el-table-column>
                <el-table-column prop="sex" label="sex"></el-table-column>
                <el-table-column prop="birthday" label="生日"></el-table-column>
                <el-table-column prop="like" label="like"></el-table-column>
                <el-table-column prop="remark" label="remark"></el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button
                      size="mini"
                      @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button
                      size="mini"
                      type="danger"
                      @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <el-pagination
                background
                layout="prev, pager, next"
                :page-count="page.pages"
                @current-change="currentChange"
                :current-page="page.pageNo"
                :page-size="page.pageSize"
                :total="page.allCount"
              ></el-pagination>
              <pre>{{removeres}}</pre>
              <pre>{{findres}}</pre>
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-tab-pane>

      <el-tab-pane label="增加">
        <el-card>
          <el-tabs type="card">
            <el-tab-pane label="insert">
              <UserForm :form.sync="form"></UserForm>
              <el-button type="primary" @click="insertSubmit">insert</el-button>
              <pre>{{insertres}}</pre>
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-tab-pane>
    </el-tabs>

    <el-dialog
      title="提示"
      :visible.sync="formVisible"
      width="30%">
      <UserForm :form.sync="form"></UserForm>
      <span slot="footer" class="dialog-footer">
        <el-button @click="formVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitEdit">确 定</el-button>
      </span>
      <pre>{{updateres}}</pre>
    </el-dialog>
  </div>
</template>
<style lang="less">
.el-tabs--left,
.el-tabs--right {
  overflow: inherit;
}
</style>

<script>
import UserForm from "../../components/mongo/UserForm.vue";
import { find, insert, count,remove,update } from "../../api/mongo";

export default {
  name: "mongo",
  data() {
    return {
      insertres: null,
      countres: null,
      findres: null,
      updateres:null,
      removeres:null,
      formVisible:false,
      form: {
        name: "",
        family: 1,
        season: "",
        show: false,
        comat: 0,
        birthday: "",
        tiny: null,
        color: null,
        sex: "",
        like: [],
        remark: ""
      },
      page: {
        allCount: 0,
        index: null,
        pageNo: 1,
        pageSize: 3,
        pages: 0
      }
    };
  },
  components: {
    UserForm
  },
  methods: {
    async find() {
      let res = await find({
        skip: (this.page.pageNo - 1) * this.page.pageSize,
        limit: this.page.pageSize,
        name: this.form.name.trim()
      });

      let allCount = res.headers["x-total"];
      this.pageChange(allCount);
      this.findres = res.data;
    },
    async findCount() {
      let res = await count();
      this.countres = res;
    },
    async insertSubmit() {
      let res = await insert(this.form);
      this.insertres = res;
      this.initform();
    },
    async currentChange(val) {
      this.page.pageNo = val;
      this.find();
    },
    async handleDelete(index,row){
      let res = await remove({
        "_id":row._id
      })
      this.removeres = res
      await this.find()
    },
    async handleEdit(index,row){
      console.log(index,row)
      this.formVisible = true
      this.form = row
    },
    async submitEdit(){
      let res = await update(this.form)
      this.updateres = res
      // this.formVisible = false
    },
    async formClose(){

    },
    initform() {
      this.form = {
        name: "",
        family: 1,
        season: "",
        show: false,
        comat: 0,
        birthday: "",
        tiny: null,
        color: null,
        sex: "",
        like: [],
        remark: ""
      };
    },
    pageChange(total) {
      let allCount = parseInt(total);
      this.page.allCount = allCount;
      this.page.pages = Math.ceil(allCount / this.page.pageSize);
    }
  },
  async mounted() {}
};
</script>
