<template>
  <div class="home">
   <h3>这是一个首页</h3>

  </div>
</template>
<script>
export default {
  name: "home",
  data() {
    return {};
  },
  created() {
    var $this = this;
    const user = {};
    user.name = "zq";
    this.$http.get("/usersList", user).then(data => {
      console.log(data);
    });
  },
  methods: {}
};
</script>
<style lang="scss" scoped>
.home {
  margin: 0 auto;
  h3 {
    color: #666;
  }
}
</style>
