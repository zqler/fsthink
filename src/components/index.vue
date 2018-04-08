<template>
  <div class="home">
   <h3>这是一个首页</h3>
       <el-table
    :data="users"
    style="width: 100%"
    :row-class-name="tableRowClassName">
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
    <el-table-column
      fixed="right"
      label="操作"
      width="150">
      <template slot-scope="scope">
        <el-button  @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
        <el-button  @click="edit(scope.row)" type="text" size="small">编辑</el-button>
        <el-button @click="del(scope.$index,users)" type="text" size="small" >删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  </div>
</template>
<script>
export default {
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
      if (rowIndex === 1) {
        return "warning-row";
      } else if (rowIndex === 3) {
        return "success-row";
      }
      return "";
    },
    handleClick(row) {
      console.log(row.date);
    },
    edit(row) {
      console.log(row);
    },
    del(index, rows) {
      rows.splice(index, 1);
    }
  }
};
</script>
<style lang="scss" scoped>
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
</style>
