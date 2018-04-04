<template>
  <div class="home">
   <h3>这是一个首页</h3>
      <el-table
      :data="users"
      :row-class-name="tableRowClassName"
      style="width: 80%">
      <el-table-column
        prop="date"
        label="日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址">
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  name: "home",
  data() {
    return {
      users: []
    };
  },
  created() {
    var $this = this;
    const user = {};
    user.name = "zq";
    this.$http.get("/usersList", user).then(data => {
      if (data.errcode == 0) {
        this.users = data.resultData.list;
        console.log(this.users);
      }
    });
  },
  methods: {
    tableRowClassName({ row, rowIndex }) {
      return rowIndex / 2 === 0 ? "warning-row" : "success-row";
    }
  }
};
</script>
<style lang="scss" scoped>
.home {
  margin: 0 auto;
  h3 {
    color: #666;
  }
}
.el-table .warning-row {
  background: oldlace !important;
}

.el-table .success-row {
  background: #f0f9eb !important;
}
</style>
