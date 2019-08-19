<template>
  <div class="beef">
    <el-tabs :stretch="true" tab-position="left">
      <el-tab-pane label="基础设置">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>牛肉</span>
          </div>
          <el-form :inline="true">
            <el-form-item v-for="i in beefbase">
              <el-input placeholder="请输入内容" v-model="i.v">
                <template slot="prepend">{{i.d}}</template>
              </el-input>
            </el-form-item>
          </el-form>
        </el-card>

        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>盒子</span>
          </div>
          <el-form :inline="true">
            <el-form-item v-for="i in box">
              <el-input placeholder="请输入内容" v-model="i.v">
                <template slot="prepend">{{i.d}}</template>
              </el-input>
            </el-form-item>
          </el-form>
        </el-card>

        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>快递</span>
          </div>
          <el-form :inline="true">
            <el-form-item v-for="i in delivery">
              <el-input placeholder="请输入内容" v-model="i.v">
                <template slot="prepend">{{i.d}}</template>
              </el-input>
            </el-form-item>
          </el-form>
        </el-card>
      </el-tab-pane>
      <el-tab-pane label="录入数据">
        <el-form :inline="true">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>日期</span>
            </div>
            <el-form-item>
              <el-date-picker
                v-model="beef.time"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-card>
        </el-form>
        <el-form :inline="true">
          <el-card class="box-card" v-for="item in beef.specs">
            <div slot="header" class="clearfix">
              <span>{{item.d}}</span>
            </div>
            <!-- <div v-for="o in 4" :key="o" class="text item">
              {{'列表内容 ' + o }}
            </div> -->
            <el-form-item v-for="i in item.v" :label="i.d">
              <el-input-number v-model="i.v" :min="0" label="描述文字"></el-input-number>
              <!-- <el-input placeholder="请输入内容" v-model="i.v"></el-input> -->
            </el-form-item>
          </el-card>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: "beef",
  components: {},
  data() {
    return {
      beef: {
        time: new Date(),
        specs: [
          {
            k: "jiang",
            d: "酱香",
            v: [
              {
                k: "one",
                v: 0,
                d: "1袋装"
              },
              {
                k: "two",
                v: 0,
                d: "2袋装"
              },
              {
                k: "five",
                v: 0,
                d: "5袋装"
              },
              {
                k: "six",
                v: 0,
                d: "6袋装"
              }
            ]
          },
          {
            k: "qing",
            d: "清香",
            v: [
              {
                k: "one",
                v: 0,
                d: "1袋装"
              },
              {
                k: "two",
                v: 0,
                d: "2袋装"
              },
              {
                k: "five",
                v: 0,
                d: "5袋装"
              },
              {
                k: "six",
                v: 0,
                d: "6袋装"
              }
            ]
          }
        ]
      },
      beefbase: [
        {
          k: "jiang",
          d: "酱牛肉价格(元)",
          v: 14.5
        },
        {
          k: "qing",
          d: "清香牛腱价格(元)",
          v: 16
        }
      ],
      box: [
        {
          k: "one",
          v: 0.53,
          d: "1袋"
        },
        {
          k: "two",
          v: 0.53,
          d: "2袋"
        },
        {
          k: "five",
          v: 0.8,
          d: "5袋"
        },
        {
          k: "six",
          v: 1.64,
          d: "6袋"
        }
      ],
      delivery: [
        {
          k: "onelev",
          d: "1公斤内",
          v: 2.8
        },
        {
          k: "twolev",
          d: "2公斤内",
          v: 3.3
        },
        {
          k: "threelev",
          d: "3公斤内",
          v: 4
        }
      ],
      test: ""
    };
  },
  components: {},
  methods: {},
  async mounted() {}
};
</script>
