<template>
  <div>
    <el-form ref="form" :model="formLocal" label-width="80px">
      <el-form-item label="name">
        <el-input v-model="formLocal.name"></el-input>
      </el-form-item>
      <el-form-item label="family">
        <el-input-number v-model="formLocal.family" :min="1" :max="10"></el-input-number>
      </el-form-item>
      <el-form-item label="season">
        <el-select v-model="formLocal.season" placeholder="请选择">
          <el-option
            v-for="item in season"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="show">
        <el-switch v-model="formLocal.show" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
      </el-form-item>
      <el-form-item label="comat">
        <el-slider v-model="formLocal.comat"></el-slider>
      </el-form-item>
      <el-form-item label="birthday">
        <el-date-picker v-model="formLocal.birthday" type="datetime" placeholder="选择日期时间"></el-date-picker>
      </el-form-item>
      <el-form-item label="tiny">
        <div class="block">
          <el-rate v-model="formLocal.tiny"></el-rate>
        </div>
      </el-form-item>
      <el-form-item label="color">
        <el-color-picker v-model="formLocal.color"></el-color-picker>
      </el-form-item>
      <el-form-item label="like">
        <el-checkbox-group v-model="formLocal.like">
          <el-checkbox label="1" name="like">猪1</el-checkbox>
          <el-checkbox label="2" name="like">牛2</el-checkbox>
          <el-checkbox label="3" name="like">狗3</el-checkbox>
          <el-checkbox label="4" name="like">猫4</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="sex">
        <el-radio-group v-model="formLocal.sex">
          <el-radio label="1">男1</el-radio>
          <el-radio label="2">女2</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="remark">
        <el-input type="textarea" v-model="formLocal.remark"></el-input>
      </el-form-item>
      <!-- <el-form-item>
        <el-button type="primary" v-if="!visibleLocal" @click="insertSubmit">insert</el-button>
        <el-button type="primary" v-if="visibleLocal" @click="updateSubmit">update</el-button>
      </el-form-item>-->
    </el-form>
  </div>
</template>
<style lang="less">
</style>

<script>
export default {
  name: "userform",
  data() {
    return {
      formLocal: this.form,
      season: [
        {
          value: "1",
          label: "春"
        },
        {
          value: "2",
          label: "夏"
        },
        {
          value: "3",
          label: "秋"
        },
        {
          value: "4",
          label: "冬"
        }
      ]
    };
  },
  props: {
    form: {
      type: Object
    }
  },
  methods: {},
  async mounted() {},
  watch: {
    form: {
      handler: function(val, oldVal) {
        this.formLocal = val;
      },
      immediate: true
    }
  }
};
</script>
