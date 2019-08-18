<template>
  <div class="pdddate">
    <download-excel :data="json_data" :fields="json_fields" name="filename.xls">
      <el-button>导出execl</el-button>
    </download-excel>
    <br>
    <el-input placeholder="请输入内容" v-model="url">
      <template slot="append">
        <el-button @click="craw">爬取</el-button>
      </template>
    </el-input>
    <br><br>
    <el-button v-if="result" @click="downloaddate">下载数据</el-button>
    <div></div>
    <pre>{{goods}}</pre>
  </div>
</template>

<script>
import { getAllData } from "../../api/pdddate";

export default {
  name: "pdddate",
  components: {},
  data() {
    return {
      result: "",
      goods: "",
      mall: "",
      //列出自己需要导出的字段
      json_fields: {
        //生成excel的字段：导出数据的字段
        姓名: "name",
        City: "city",
        Telephone: "phone.mobile",
        "Telephone 2": {
          field: "phone.landline",
          callback: value => {
            return `Landline Phone - ${value}`;
          }
        }
      }, //导出的数据
      json_data: [
        {
          name: "Tony Peña",
          city: "New York",
          country: "United States",
          birthdate: "1978-03-15",
          phone: {
            mobile: "1-541-754-3010",
            landline: "(541) 754-3010"
          }
        },
        {
          name: "Thessaloniki",
          city: "Athens",
          country: "Greece",
          birthdate: "1987-11-23",
          phone: {
            mobile: "+1 855 275 5071",
            landline: "(2741) 2621-244"
          }
        }
      ],
      url:
        "http://mobile.yangkeduo.com/goods.html?goods_id=34987050&gallery_id=8146552109&refer_page_name=search_result&refer_page_id=10015_1560002758727_TmEZAQSYay&refer_page_sn=10015"
    };
  },
  components: {
    // HelloWorld
  },
  methods: {
    async downloaddate() {
      function downloadfile(content, filename) {
        // 创建隐藏的可下载链接
        var eleLink = document.createElement("a");
        eleLink.download = filename;
        eleLink.style.display = "none";
        // 字符内容转变成blob地址
        var blob = new Blob([content]);
        eleLink.href = URL.createObjectURL(blob);
        // 触发点击
        document.body.appendChild(eleLink);
        eleLink.click();
        // 然后移除
        document.body.removeChild(eleLink);
      }
      downloadfile(JSON.stringify(this.result), "pdd.json");
    },
    async fetchData() {},
    startDownload() {
      alert("show loading");
    },
    finishDownload() {
      alert("hide loading");
    },
    async craw() {
      let res = await getAllData({
        url: this.url
      });
      this.result = res.data;
      this.goods =
        this.result &&
        this.result.store &&
        this.result.store.initDataObj &&
        this.result.store.initDataObj.goods;
      this.mall =
        this.result &&
        this.result.store &&
        this.result.store.initDataObj &&
        this.result.store.initDataObj.mall;
    }
  },
  async mounted() {}
};
</script>
