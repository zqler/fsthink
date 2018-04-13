<template>
  <div class="list">
      <ul>
        <li>这是第二页</li>
        
      </ul>
       <button @click="show = !show">
    Toggle render
  </button>
  
    <button @click.once="updateMessage">点击更新</button>
    <input v-model.lazy="message" placeholder="默认值">
      <p>{{   message }}</p>
    <span>{{firstName+lastName}}</span>
  <transition name="slide-fade">
    <p v-if="show">hello</p>
   
  </transition>
  </div>
</template>
<script>
export default {
  name: "list",
  data(){
    return{
      show: true,
      message: "没有更新",
      firstName:" ",
      lastName:" "
    }
  },
  computed:{  //计算属性
    funllName:{
      //getter
      get:function(){
        return this.firstName +' '+ this.lastName;
      },
      //setter
      set:function(newValue){
       var names = newValue.split(' ');//根据空格把字符串分割成数组
        this.firstName = names[0];
        this.lastName = names[names.length - 1];
      }
    }
  },
  methods:{
    updateMessage(){
      this.message="更新完成";
      console.log(this.$el.textContent);
      this.$nextTick(function () {  //$nextTick dom发生变化后才执行的函数
        console.log(this.$el.textContent);
        this.funllName = "zhang quan";
      })
    }
  }

};
</script>
<style>
/* 可以设置不同的进入和离开动画 */
/* 设置持续时间和动画函数 */
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>
