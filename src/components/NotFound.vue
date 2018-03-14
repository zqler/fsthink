<template>
  <div class="Error">
    <p class="desc">{{$route.params.msg || '正在开发中。。。。'}}</p>
  </div>
</template>
<script>
  export default {
    name: 'Error'
  }
</script>
<style>
  .desc{
    font-size: 18px;
    color: #ff5100;
    margin: 20px 0;
    
  }
</style>
