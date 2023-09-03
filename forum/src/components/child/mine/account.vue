<script>
import {defineComponent} from 'vue'
import top from "../top.vue";

export default defineComponent({
  name: "account",
  components: {top},
  data(){
    return{
      title:"账户"
    }
  }
})
</script>

<template>
  <top :title="title"></top>

  <div class="main">


  <div class="container">
    <div class="head line">
      <p class="rowHead">头像</p>
      <img src="http://10.218.39.118:3000/public/images/head/12.jpg" alt="">
    </div>
    <div class="line">
      <p class="rowHead">邮箱</p>
      <p>xzx149517@126.com</p>
    </div>
    <div class="line">
      <p class="rowHead">手机号</p>
      <p>19138984361</p>
    </div>
    <div class="line">
      <p class="rowHead">个人签名</p>
      <p>编写网站,逐步实现网站功能</p>
    </div>
  </div>
  <div class="container">
    <div class="line">
      <p class="rowHead">我的地址</p>
      <p></p>
    </div>
  </div>

  <div class="container">
    <div class="nick line">
      <p class="rowHead">二维码名片</p>
      <p></p>
    </div>
  </div>

  </div>
</template>

<style scoped lang="scss">

.main{
  margin-top: 120px;
}
.container {
  width: 100%;
  background-color: white;
  padding: 0 30px;
  margin-bottom: 20px;

  .line {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 120px;
    border-bottom: 2px solid var(--bgColorAsh);

    .rowHead {
      font: {
        size: 26px;
        weight: bold;
      };
    }
  }

  .head {
    height: 150px;

    img {
      width: 120px;
      height: 120px;
      border-radius: 20px;
    }
  }

}
</style>