<template>
  <div>
    find
  </div>
</template>
<style lang="less">
</style>

<script>
import { search, insert } from "../../../api/mongo";

export default {
  name: "find",
  data() {
    return {
      form: {
        name: "",
        family: 1,
        season: "",
        show: false,
        comat: 0,
        birthday: "",
        tiny: null,
        color:null,
        sex: "",
        like: [],
        remark: ""
      },
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
      ],
      insertRes:"insertRes"
    };
  },
  methods: {
    async insertSubmit() {
      let res = await insert(this.form);
      this.insertRes = res;
    }
  },
  async mounted() {}
};
</script>
