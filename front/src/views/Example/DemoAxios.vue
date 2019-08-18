<template>
  <div class="demoaxios">

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-input v-model="qhead" placeholder="head的query"></el-input>
        <el-button @click="testhead">测试head</el-button>
      </div>
      <div>
        <pre>{{headres}}</pre>
      </div>
    </el-card>

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-input v-model="qpost" placeholder="post的query"></el-input>
        <el-input v-model="dpost" placeholder="post的date"></el-input>
        <el-button @click="testpost">测试post</el-button>
      </div>
      <div>
        <pre>{{postres}}</pre>
      </div>
    </el-card>

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-input placeholder="get的query数据" v-model="qget">
          <template slot="append">
            <el-button @click="testget">测试get</el-button>
          </template>
        </el-input>
      </div>
      <div>
        <pre>{{getres}}</pre>
      </div>
    </el-card>


    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-input placeholder="get的query数据" v-model="qget">
          <template slot="append">
            <el-button @click="testdelete">测试delete</el-button>
          </template>
        </el-input>
      </div>
      <div>
        <pre>{{deleteres}}</pre>
      </div>
    </el-card>
  </div>
</template>

<script>
import { getfn,postfn,headfn,deletefn } from "../../api/demofn";

export default {
  name: "demoaxios",
  data() {
    return {
      qget: "",
      getres: "get返回结果",
      dpost: "",
      qpost: "",
      postres: "post返回结果",
      qhead:"",
      headres:"head返回结果",
      deleteres:"delete返回结果"
    };
  },
  methods: {
      async testhead(){
          let res = await headfn({
              qhead:this.qhead
          })
          this.headres = res
      },
    async testpost() {
      let res = await postfn({
        dpost: this.dpost,
        qpost: this.qpost
      });
      this.postres = res
    },
    async testget() {
      let res = await getfn({
        qget: this.qget
      });
      this.getres = res;
    },
    async testdelete(){
      let res = await deletefn();
      this.deleteres = res;
    }
  },
  async mounted() {}
};
</script>
