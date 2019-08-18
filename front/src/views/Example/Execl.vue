<template>
  <div class="execl">
    <el-tabs :stretch="true" tab-position="left">
      <el-tab-pane label="导入">
        <el-card>
          <input type="file" ref="upload" accept=".xls, .xlsx" class="outputlist_upload">
          <pre>{{allExeclData}}</pre>
        </el-card>
      </el-tab-pane>
      <el-tab-pane label="table导出execl">
        <el-card>
          <button @click="downtable">table转execl</button>
          <table id="table1" ref="table" border="1" cellspacing="0" cellpadding="0">
            <thead>
              <tr>
                <td>序号</td>
                <td>姓名</td>
                <td>年龄</td>
                <td>兴趣</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>张三</td>
                <td>18</td>
                <td>打游戏</td>
              </tr>
              <tr>
                <td>2</td>
                <td>李四</td>
                <td>88</td>
                <td>看电影</td>
              </tr>
              <tr>
                <td>3</td>
                <td>王五</td>
                <td>81</td>
                <td>睡觉</td>
              </tr>
              <tr>
                <td colspan="4">合并单元格</td>
              </tr>
            </tbody>
          </table>
        </el-card>
      </el-tab-pane>
      <el-tab-pane label="json导出execl">
        <el-card>
          <button @click="downjson">json转execl</button>
          <pre>{{jts}}</pre>
        </el-card>
      </el-tab-pane>
      <el-tab-pane label="execl格式">
        <el-card>
          <button @click="down">下载execl格式</button>
        </el-card>
      </el-tab-pane>
    </el-tabs>

    
  </div>
</template>

<script>
import XLSX from "xlsx";
import { type } from "os";
export default {
  name: "execl",
  data() {
    return {
      execlarray: "",
      allExeclData: [],
      hr: "",
      jsono: [
        {
          "保质期临期预警(天)": "adventLifecycle",
          "高(cm)": "height",
          "保质期禁售(天)": "lockupLifecycle",
          "宽(cm)": "width",
          "保质期(天)": "expDate"
        }
      ],
      jts: [
        { 序号: 1, 姓名: "张三", 年龄: 18, 兴趣: "打游戏", __rowNum__: 1 },
        { 序号: "合并单元格", __rowNum__: 4 }
      ],
      person: [
        { 姓名: "张三", 城市: "Seattle", age: "12" },
        { 姓名: "Mike", 城市: "Los Angeles", age: "22" },
        { 姓名: "Zach", 城市: "New York", age: "33" }
      ]
    };
  },
  components: {},
  mounted() {
    this.$refs.upload.addEventListener("change", e => {
      this.readExcel(e);
    });
  },
  methods: {
    down() {
      var _headers = ["id", "name", "age", "country", "remark"];
      var _data = [
        {
          id: "1",
          name: "test1",
          age: "30",
          country: "China",
          remark: "hello"
        },
        {
          id: "2",
          name: "test2",
          age: "20",
          country: "America",
          remark: "world"
        },
        { id: "3", name: "test3", age: "18", country: "Unkonw", remark: "???" }
      ];

      var headers = _headers
        // 为 _headers 添加对应的单元格位置
        // [ { v: 'id', position: 'A1' },
        // { v: 'name', position: 'B1' },
        // { v: 'age', position: 'C1' },
        // { v: 'country', position: 'D1' },
        // { v: 'remark', position: 'E1' } ]
        .map((v, i) =>
          Object.assign({}, { v: v, position: String.fromCharCode(65 + i) + 1 })
        )
        // 转换成 worksheet 需要的结构
        // { A1: { v: 'id' },
        // B1: { v: 'name' },
        // C1: { v: 'age' },
        // D1: { v: 'country' },
        // E1: { v: 'remark' } }
        .reduce(
          (prev, next) =>
            Object.assign({}, prev, { [next.position]: { v: next.v } }),
          {}
        );
      var data = _data
        // 匹配 headers 的位置，生成对应的单元格数据
        // [ [ { v: '1', position: 'A2' },
        //  { v: 'test1', position: 'B2' },
        //  { v: '30', position: 'C2' },
        //  { v: 'China', position: 'D2' },
        //  { v: 'hello', position: 'E2' } ],
        // [ { v: '2', position: 'A3' },
        //  { v: 'test2', position: 'B3' },
        //  { v: '20', position: 'C3' },
        //  { v: 'America', position: 'D3' },
        //  { v: 'world', position: 'E3' } ],
        // [ { v: '3', position: 'A4' },
        //  { v: 'test3', position: 'B4' },
        //  { v: '18', position: 'C4' },
        //  { v: 'Unkonw', position: 'D4' },
        //  { v: '???', position: 'E4' } ] ]
        .map((v, i) =>
          _headers.map((k, j) =>
            Object.assign(
              {},
              { v: v[k], position: String.fromCharCode(65 + j) + (i + 2) }
            )
          )
        )
        // 对刚才的结果进行降维处理（二维数组变成一维数组）
        // [ { v: '1', position: 'A2' },
        // { v: 'test1', position: 'B2' },
        // { v: '30', position: 'C2' },
        // { v: 'China', position: 'D2' },
        // { v: 'hello', position: 'E2' },
        // { v: '2', position: 'A3' },
        // { v: 'test2', position: 'B3' },
        // { v: '20', position: 'C3' },
        // { v: 'America', position: 'D3' },
        // { v: 'world', position: 'E3' },
        // { v: '3', position: 'A4' },
        // { v: 'test3', position: 'B4' },
        // { v: '18', position: 'C4' },
        // { v: 'Unkonw', position: 'D4' },
        // { v: '???', position: 'E4' } ]
        .reduce((prev, next) => prev.concat(next))
        // 转换成 worksheet 需要的结构
        // { A2: { v: '1' },
        //  B2: { v: 'test1' },
        //  C2: { v: '30' },
        //  D2: { v: 'China' },
        //  E2: { v: 'hello' },
        //  A3: { v: '2' },
        //  B3: { v: 'test2' },
        //  C3: { v: '20' },
        //  D3: { v: 'America' },
        //  E3: { v: 'world' },
        //  A4: { v: '3' },
        //  B4: { v: 'test3' },
        //  C4: { v: '18' },
        //  D4: { v: 'Unkonw' },
        //  E4: { v: '???' } }
        .reduce(
          (prev, next) =>
            Object.assign({}, prev, { [next.position]: { v: next.v } }),
          {}
        );

      // 合并 headers 和 data
      var output = Object.assign({}, headers, data);
      // 获取所有单元格的位置
      var outputPos = Object.keys(output);
      // 计算出范围
      var ref = outputPos[0] + ":" + outputPos[outputPos.length - 1];

      // 构建 workbook 对象
      var wb = {
        SheetNames: ["mySheet"],
        Sheets: {
          mySheet: Object.assign({}, output, { "!ref": ref })
        }
      };

      // 导出 Excel
      XLSX.writeFile(wb, "output.xlsx");
    },
    sheet2blob(sheet, sheetName) {
      sheetName = sheetName || "sheet1";
      var workbook = {
        SheetNames: [sheetName],
        Sheets: {}
      };
      workbook.Sheets[sheetName] = sheet; // 生成excel的配置项

      var wopts = {
        bookType: "xlsx", // 要生成的文件类型
        bookSST: false, // 是否生成Shared String Table，官方解释是，如果开启生成速度会下降，但在低版本IOS设备上有更好的兼容性
        type: "binary"
      };
      var wbout = XLSX.write(workbook, wopts);
      var blob = new Blob([s2ab(wbout)], {
        type: "application/octet-stream"
      }); // 字符串转ArrayBuffer
      function s2ab(s) {
        var buf = new ArrayBuffer(s.length);
        var view = new Uint8Array(buf);
        for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xff;
        return buf;
      }

      return blob;
    },
    openDownloadDialog(url, saveName) {
      if (typeof url == "object" && url instanceof Blob) {
        url = URL.createObjectURL(url); // 创建blob地址
      }
      var aLink = document.createElement("a");
      aLink.href = url;
      aLink.download = saveName || ""; // HTML5新增的属性，指定保存文件名，可以不要后缀，注意，file:///模式下不会生效
      var event;
      if (window.MouseEvent) event = new MouseEvent("click");
      else {
        event = document.createEvent("MouseEvents");
        event.initMouseEvent(
          "click",
          true,
          false,
          window,
          0,
          0,
          0,
          0,
          0,
          false,
          false,
          false,
          false,
          0,
          null
        );
      }
      aLink.dispatchEvent(event);
    },
    downjson() {
      var ws = XLSX.utils.json_to_sheet(
        this.jts
      ); /* 新建空workbook，然后加入worksheet */
      var wb = XLSX.utils.book_new(); /*新建book*/
      XLSX.utils.book_append_sheet(
        wb,
        ws,
        "People"
      ); /* 生成xlsx文件(book,sheet数据,sheet命名) */
      XLSX.writeFile(wb, "sheetjs.xlsx"); /*写文件(book,xlsx文件名称)*/
    },
    downtable() {
      let t = this.$refs.table;
      var sheet = XLSX.utils.table_to_sheet(t); //将一个table对象转换成一个sheet对象
      this.openDownloadDialog(this.sheet2blob(sheet), "下载.xlsx");
    },
    readExcel(e) {
      //导入execl
      let wb;
      let rABS = true;
      let _this = this;
      const files = e.target.files;
      const f = files[0];

      if (files.length <= 0) {
        return false;
      } else if (!/\.(xls|xlsx)$/.test(files[0].name.toLowerCase())) {
        console.log("上传格式不正确，请上传xls或者xlsx格式");
        return false;
      }

      let reader = new FileReader();
      reader.onload = ev => {
        let data = ev.target.result;
        if (rABS) {
          wb = XLSX.read(btoa(this.fixdata(data)), {
            //手动转化
            type: "base64"
          });
        } else {
          wb = XLSX.read(data, {
            type: "binary"
          });
        }

        let fromTo = "";
        // 遍历每张表读取
        for (var sheet in wb.Sheets) {
          if (wb.Sheets.hasOwnProperty(sheet)) {
            fromTo = wb.Sheets[sheet]["!ref"];
            console.log(fromTo);
            this.allExeclData = this.allExeclData.concat(
              XLSX.utils.sheet_to_json(wb.Sheets[sheet])
            );

            console.log(XLSX.utils.sheet_to_json(wb.Sheets[sheet]));
            // break; // 如果只取第一张表，就取消注释这行
          }
        }
      };

      if (rABS) {
        reader.readAsArrayBuffer(f);
      } else {
        reader.readAsBinaryString(f);
      }
    },
    fixdata(data) {
      //文件流转BinaryString
      var o = "",
        l = 0,
        w = 10240;
      for (; l < data.byteLength / w; ++l)
        o += String.fromCharCode.apply(
          null,
          new Uint8Array(data.slice(l * w, l * w + w))
        );
      o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)));
      return o;
    }
  }
};
</script>