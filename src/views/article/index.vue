<template>
  <div class="container">Art</div>
</template>

<script>
export default {
  //注意：组件名称不能喝原生标签同名
  name: "app-article",
  created() {
    //发请求测试
    this.$http
      .get("articles")
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style scoped lang='less'></style>